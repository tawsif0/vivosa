import { spawn } from "node:child_process";
import process from "node:process";

const children = [];

const start = (label, command, args, cwd) => {
  const child = spawn(command, args, {
    cwd,
    stdio: "inherit",
    shell: true,
  });

  child.on("exit", (code, signal) => {
    if (signal || (typeof code === "number" && code !== 0)) {
      console.log(`[${label}] exited ${signal ? `with signal ${signal}` : `with code ${code}`}`);
      shutdown(code ?? 0);
    }
  });

  children.push(child);
  return child;
};

let shuttingDown = false;
const shutdown = (exitCode = 0) => {
  if (shuttingDown) return;
  shuttingDown = true;

  for (const child of children) {
    if (!child.killed) {
      child.kill();
    }
  }

  setTimeout(() => process.exit(exitCode), 250);
};

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

start("server", "npm", ["run", "start", "--prefix", "backend"], process.cwd());
start("client", "npm", ["run", "dev", "--prefix", "client"], process.cwd());
