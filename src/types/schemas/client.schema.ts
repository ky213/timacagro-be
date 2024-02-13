import { Type } from "class-transformer";
import {
  Length,
  ValidateNested,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsIn,
  Max,
  IsString,
  Matches,
} from "class-validator";
import { Client } from "../graphql";

export class ClientSchema implements Omit<Client, "id" | "active" | "createdAt" | "updatedAt"> {
  @IsString()
  @Length(2, 25)
  name!: string;

  @IsArray()
  @ArrayMaxSize(10)
  @Type(() => ClientFile)
  @ValidateNested({ each: true })
  files!: ClientFile[];
}

export class ClientFile implements Pick<File, "name" | "type" | "size"> {
  @Matches(
    /^(ID|birth-certificate|proof-of-residency|mines-license|signal-file|certificate-of-property|taxes-card|C20-certificate|bank-statement|purchase-order)\./
  )
  name!: string;

  @Max(2_000_000, { message: "File size cannot exceed 2 MB." })
  private _size!: number;

  public get size() {
    return this._size;
  }

  @IsIn(["image/png", "image/jpg", "image/jpeg"], { message: "file type should be of image type (png, jpg, jpeg)" })
  type!: string;
}
