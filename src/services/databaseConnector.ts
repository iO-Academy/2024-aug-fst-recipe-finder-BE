import mysql from "promise-mysql";
import { dbSettings } from "../../config/dbConfig";

const getDatabase = async (): Promise<mysql.Connection> => {
  return await mysql.createConnection(dbSettings);
};

export default getDatabase;