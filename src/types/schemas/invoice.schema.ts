import { Length, IsBoolean, IsAlpha, IsNumber, IsIn, IsDateString } from "class-validator";

export class InvoiceSchema {
  @IsAlpha()
  @Length(2, 25)
  number!: string;

  @IsIn([], { message: "Client should be a number" })
  client!: number;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: "Total should be a number" })
  total!: number;

  @IsBoolean({ message: "Payed should be a boolean" })
  active!: boolean;

  @IsDateString({}, { message: "Invoice date should be provided." })
  createdAt!: boolean;
}
