import { DataSource } from "typeorm";

export const db = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  entities: ["src/data-sources/database/*.entity.ts", "src/data-sources/database/*.entity.js"],
  logging: process.env.NODE_ENV == "prod",
  synchronize: process.env.NODE_ENV == "dev",
});
