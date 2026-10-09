#! /usr/bin/env -S node --test

import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { test } from "node:test";

const randInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const compressWhitespace = (s) => {
  s.replaceAll(/(\s)\s+/g, "$1");
};

const delay = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const caddy = process.env.CADDY || "caddy";
const port = 8000 + randInt(0, 101);
const url = `http://localhost:${port}`;
const adminPort = 22000 + randInt(0, 101);
const adminAddr = `localhost:${adminPort}`;

let config = await readFile("Caddyfile", "utf8");
config = `{\n\tadmin ${adminAddr}\n}\n\n` +
  config.replace(":8080", `:${port}`);
await writeFile("Caddyfile.test", config);

const caddyProcess = spawn(
  caddy,
  ["run", "--config", "Caddyfile.test"],
  {
    stderr: "inherit",
    stdout: "inherit",
  },
);

await delay(2000);

const get = async (path = "") => await (await fetch(`${url}${path}`)).text();

test("index 1", async () => {
  const html = await get();
  assert.ok(html.includes("<title>Welcome"));
});

test("index 2", async () => {
  const html = await get("/index-html/");
  assert.ok(html.includes("axist.css"));
  assert.ok(html.includes("<h1>This is an HTML index.</h1>"));
});

test("index 3", async () => {
  const html = await get("/index-txt/");
  assert.ok(html.includes("text file index"));
});

test("index 4", async () => {
  const html = await get("/index-md");
  assert.ok(html.includes("index of a subdirectory"));
});

test("index 5", async () => {
  const req = await fetch(`${url}/index-md`);
  await req.text();
  assert.equal(req.status, 200);
});

test("extension", async () => {
  const a = await get("/index");
  const b = await get("/index.md");
  assert.equal(compressWhitespace(a), compressWhitespace(b));
});

test("front matter vars", async () => {
  const html = await get();
  assert.ok(html.includes(`dir="ltr" lang="en"`));
});

test("template CSS", async () => {
  const css = await get("/templates/axist.css");
  assert.ok(css.includes("font-size:"));
});

test("server shutdown", async () => {
  const req = await fetch(`http://${adminAddr}/stop`, {
    method: "POST",
  });
  await req.text();
  caddyProcess.kill();
});
