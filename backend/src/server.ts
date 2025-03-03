// User imports
import { errLogger } from "@mono/utils";
import app from "./app.js";
import { prisma, Prisma } from "@mono/prisma";

const ERR_TYPES = ["uncaughtException", "unhandledRejection"] as const;
ERR_TYPES.forEach((errType: (typeof ERR_TYPES)[number]) => {
  process.on(errType, (err) => {
    errLogger(err, import.meta.filename, errType.toUpperCase(), false);
    process.exitCode = 0;
  });
});

const initServer = async () => {
  try {
    await prisma.$connect();
    console.log("DB connected successfully ✅✅✅");

    const port: number = parseInt(process.env.PORT ?? "4000");
    app.listen(port, () => {
      console.log(`App listening on port : ${port} 🎉🎉🎉`);
    });
  } catch (err) {
    let msg: string = "Error in init server";
    if (err instanceof Prisma.PrismaClientInitializationError) {
      msg = "Error in initializing prisma client";
    }
    errLogger(err, import.meta.filename, msg, true);
  }
};

initServer();
