#! /usr/bin/env -S deno test --allow-env --allow-net --allow-read=Caddyfile --allow-run --allow-write=Caddyfile.test --check

import {
  assertEquals,
  assertStringIncludes,
} from "https://deno.land/std@0.100.0/testing/asserts.ts";
import { delay } from "https://deno.land/std@0.100.0/async/delay.ts";

const randInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const compressWhitespace = (s: string) => {
  s.replaceAll(/(\s)\s+/g, "$1");
};

const caddy = Deno.env.get("CADDY") || "caddy";
const port = 8000 + randInt(0, 101);
const url = `http://localhost:${port}`;
const adminPort = 22000 + randInt(0, 101);
const adminAddr = `localhost:${adminPort}`;

let config = await Deno.readTextFile("Caddyfile");
config = `{\n\tadmin ${adminAddr}\n}\n\n` +
  config.replace(":8080", `:${port}`);
await Deno.writeTextFile("Caddyfile.test", config);

const caddyProcess = (new Deno.Command(
  caddy,
  {
    args: ["run", "--config", "Caddyfile.test"],
    stderr: "inherit",
    stdout: "inherit",
  },
)).spawn();

await delay(2000);

const get = async (path = "") => await (await fetch(`${url}${path}`)).text();

Deno.test("index 1", async () => {
  const html = await get();
  assertStringIncludes(html, "<title>Welcome");
});

Deno.test("index 2", async () => {
  const html = await get("/index-html/");
  assertStringIncludes(html, "axist.css");
  assertStringIncludes(html, "<h1>This is an HTML index.</h1>");
});

Deno.test("index 3", async () => {
  const html = await get("/index-txt/");
  assertStringIncludes(html, "text file index");
});

Deno.test("index 4", async () => {
  const html = await get("/index-md");
  assertStringIncludes(html, "index of a subdirectory");
});

Deno.test("index 5", async () => {
  const req = await fetch(`${url}/index-md`);
  await req.text();
  assertEquals(req.status, 200);
});

Deno.test("extension", async () => {
  const a = await get("/index");
  const b = await get("/index.md");
  assertEquals(compressWhitespace(a), compressWhitespace(b));
});

Deno.test("template CSS", async () => {
  const css = await get("/templates/axist.css");
  assertStringIncludes(css, "font-size:");
});

Deno.test("server shutdown", async () => {
  const req = await fetch(`http://${adminAddr}/stop`, {
    method: "POST",
  });
  await req.text();
});
