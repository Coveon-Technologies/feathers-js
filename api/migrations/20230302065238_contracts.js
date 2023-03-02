export async function up(knex) {
  await knex.schema.createTable('contracts', (table) => {
    table.increments('id').primary()
    table.integer('user_id').unsigned().references('id').inTable('users')
    table.string('contract_pdf').nullable()
    table.text('contract_summary')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex) {
  await knex.schema.dropTable('contracts')
}
