import { validateSync, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";

export const validateData = <T>(schema: any, newData: T, isUpdate?: boolean): ValidationError[] =>
  validateSync(plainToClass(schema, newData), { skipMissingProperties: isUpdate });
