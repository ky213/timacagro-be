import { Type } from "class-transformer";
import { Length, IsBoolean, IsAlpha, ValidateNested, IsArray, ArrayMinSize, ArrayMaxSize } from "class-validator";

export class ClientSchema {
  @IsAlpha()
  @Length(2, 25)
  name!: string;

  @IsArray()
  @IsAlpha()
  @ValidateNested({ each: true })
  @ArrayMinSize(11)
  @ArrayMaxSize(11)
  @Type(() => String)
  files!: string[];

  @IsBoolean({ message: "Client status should be a boolean" })
  active!: boolean;
}
