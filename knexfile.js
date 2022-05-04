// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

// import dotenv from "dotenv";
// dotenv.config();

require("dotenv").config({ path: ".env.local" });

module.exports = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: process.env.DB_PORT,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    },
  },
};
