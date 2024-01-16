import { DataSource } from "typeorm";

export const database = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  port: Number(process.env.DB_PORT),
  entities: ["src/services/database/repos/*.repo.ts", "src/services/database/repos/*.repo.js"],
  logging: process.env.NODE_ENV == "prod",
  synchronize: process.env.NODE_ENV == "dev",
});
