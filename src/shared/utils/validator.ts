import { validateSync, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";

export interface ValidationOptions {
  isUpdate?: boolean | undefined;
}

export const validateData = <T>(schema: any, newData: T, options?: ValidationOptions): ValidationError[] =>
  validateSync(plainToClass(schema, newData), { skipMissingProperties: options?.isUpdate });
