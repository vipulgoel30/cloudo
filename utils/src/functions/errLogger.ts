export function errLogger(err: any, file: string): void;
export function errLogger(err: any, file: string, msg: string): void;
export function errLogger(err: any, file: string, isPriority: boolean): void;
export function errLogger(err: any, file: string, msg: string, isPriority: boolean): void;

export function errLogger(err: any, file: string, arg1?: string | boolean, arg2?: boolean): void {
  const msg: string = typeof arg1 === "string" ? arg1 : err instanceof Error ? err.message : "Unknown error";
  const isPriority: boolean = typeof arg1 === "boolean" ? arg1 : !!arg2;

  if (process.env.NODE_ENV === "prod") {
    // TODO add the fetch request to error service
  } else {
    console.log(`\x1b[3${isPriority ? "1" : "4"}m%s\x1b[0m`, `Module : ${file} \nError message : ${msg}`);
    console.log(err);
  }
}
