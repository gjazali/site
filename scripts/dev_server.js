import { spawn } from "child_process";
import { createRequire } from "module";
import { config } from "./config.js";

const require = createRequire(import.meta.url);
const httpServerBin = require.resolve("http-server/bin/http-server");

const { port, cache_seconds, default_extension } = config.dev_server;

const portArguments = port == null ? [] : ["-p", String(port)];

const server = spawn(
  process.execPath,
  [
    httpServerBin,
    config.directories.output,
    ...portArguments,
    "-e", default_extension,
    `-c${cache_seconds}`
  ],
  { stdio: "inherit" }
);

server.on("exit", (code) => process.exit(code == null ? 0 : code));
