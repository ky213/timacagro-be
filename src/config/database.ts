import { logger } from "~/shared/utils/logger";
import { DataSource } from "typeorm";
import { InjectionToken, Provider } from "graphql-modules";

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

export const DatabaseProviderToken = new InjectionToken<DataSource>("DatabaseProvider");

export const DatabaseProvider: Provider<DataSource> = {
  provide: DatabaseProviderToken,
  useValue: database,
};

export interface IDatabaseProvider extends DataSource {}

export const initDatabse = async () => {
  try {
    const db = await database.initialize();

    logger.info("Database Server connected");

    return db;
  } catch (error) {
    logger.error(error);
  }
};
