//? To avoid recreating prisma client instance on each HMR(Hot Module Reloading) only for dev mode
//? as HMR does not load the entire application it only replaces the updated module

// Importing prisma client from custom location instead from 'node_modules/@prisma'
import { PrismaClient } from "@prisma/client";

// Typescript casting as global object do not have prisma property
const globalObj = global as unknown as { prisma: PrismaClient };

// If prisma available on global object taking it from there otherwise creating it
export const prisma: PrismaClient = globalObj.prisma || new PrismaClient();

// It is assigning global object with prisma client instance in dev mode if it is not added to globalObject at start
// so each time application does HMR it gets the client from global object instead of recreating it each time
// but for production it should be created on each request
if (process.env.NODE_ENV !== "prod" && !globalObj.prisma) globalObj.prisma = prisma;
