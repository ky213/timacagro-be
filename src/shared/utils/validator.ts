import { validateSync, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";

export const validateData = <T>(schema: any, newData: T): ValidationError[] =>
  validateSync(plainToClass(schema, newData));
