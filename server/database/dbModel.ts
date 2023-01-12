import { Pool, QueryResult } from "pg";
import * as dotenv from "dotenv";

dotenv.config();
const { DATABASE_URL } = process.env;

const pool = new Pool({
  connectionString: DATABASE_URL,
});

export default {
  query: (
    text: string,
    params: any,
    callback: (err: Error, result: QueryResult<any>) => void
  ) => {
    console.log("executed query: ", text);
    return pool.query(text, params, callback);
  },
};
