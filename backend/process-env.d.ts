
   declare global {
        namespace NodeJS {
            interface ProcessEnv {
                [key: string]: string;
                PORT:string
NODE_ENV:string
DATABASE_URL:string
            }
        }
    }

export { };
