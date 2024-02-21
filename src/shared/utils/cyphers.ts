import { v4 } from "uuid";
import bcrypt from "bcrypt";

export function generateToken() {
  return v4();
}

export async function generateHash(value: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(value, salt);
}

export function generatePassword(): string {
  return Math.random().toString(36).slice(-8);
}

export async function isSameHash(text: string, hash: string) {
  return await bcrypt.compare(text, hash);
}
