import { KurrentDBClient } from "@kurrent/kurrentdb-client";

export const kurrent = KurrentDBClient.connectionString`${process.env.KURRENT_URL}`;
