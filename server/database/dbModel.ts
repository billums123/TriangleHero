import { Pool } from "pg";
import * as dotenv from "dotenv";
dotenv.config();

const { DATABASE_URI } = process.env;

const pool = new Pool({
  connectionString: DATABASE_URI,
});

export default {
  query: (text: string, params: any) => {
    console.log("executed query: ", text);
    return pool.query(text, params);
  },
};
