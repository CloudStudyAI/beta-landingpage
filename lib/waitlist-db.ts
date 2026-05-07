import "server-only";

import { Pool, type PoolConfig } from "pg";

export const waitlistEnvKeys = [
  "DB_HOST",
  "DB_PORT",
  "DB_NAME",
  "DB_USER",
  "DB_PASSWORD",
] as const;

export type WaitlistEnvKey = (typeof waitlistEnvKeys)[number];

declare global {
  var cloudStudyWaitlistPool: Pool | undefined;
}

function readRequiredEnv(name: WaitlistEnvKey) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required database environment variable: ${name}`);
  }

  return value;
}

export function getWaitlistEnvStatus(): Record<WaitlistEnvKey, boolean> {
  return waitlistEnvKeys.reduce<Record<WaitlistEnvKey, boolean>>(
    (status, key) => {
      status[key] = Boolean(process.env[key]?.trim());
      return status;
    },
    {
      DB_HOST: false,
      DB_PORT: false,
      DB_NAME: false,
      DB_USER: false,
      DB_PASSWORD: false,
    },
  );
}

function getPoolConfig(): PoolConfig {
  const portValue = readRequiredEnv("DB_PORT");
  const port = Number.parseInt(portValue, 10);

  if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    throw new Error("DB_PORT must be a valid TCP port number.");
  }

  return {
    connectionTimeoutMillis: 5000,
    database: readRequiredEnv("DB_NAME"),
    host: readRequiredEnv("DB_HOST"),
    idleTimeoutMillis: 10000,
    max: 5,
    password: readRequiredEnv("DB_PASSWORD"),
    port,
    ssl: { rejectUnauthorized: false },
    user: readRequiredEnv("DB_USER"),
  };
}

export function getWaitlistPool() {
  if (!globalThis.cloudStudyWaitlistPool) {
    globalThis.cloudStudyWaitlistPool = new Pool(getPoolConfig());
  }

  return globalThis.cloudStudyWaitlistPool;
}
