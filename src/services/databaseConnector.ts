import mysql from "promise-mysql";
import { settings } from "../../config"

const getDatabase = async (): Promise<mysql.Connection> => {
  return await mysql.createConnection( settings.db );
};

export default getDatabase;