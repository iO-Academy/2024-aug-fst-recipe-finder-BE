import mysql from "promise-mysql";
import { host, user, password, database } from "../config/dbConfig";

const getDatabase = async (): Promise<mysql.Connection> => {
  const connection = await mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database,
  });
  return connection;
};

export default getDatabase;