import { v4 } from "uuid";
import bcrypt from "bcrypt";

export function generateToken() {
  return v4();
}

export async function generateHash(value: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(value, salt);
}
