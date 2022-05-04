/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// untuk menambahkan table
exports.up = function (knex) {
  return knex.schema.createTable("posts", function (table) {
    table.increments(); // untuk id increment/ primary key
    table.string("title"); //
    table.text("content");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// untuk rollback, ketika ada db yg salah, bisa di rollback/ undo
exports.down = function (knex) {
  return knex.schema.dropTable("posts");
};
