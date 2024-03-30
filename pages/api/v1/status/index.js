import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersion = await database.query("show server_version");

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnections = (
    await database.query({
      text: "select count(*)::int from pg_stat_activity where datname = $1 and state = 'active';",
      values: [databaseName],
    })
  ).rows[0].count;

  const databaseMaxConnections = (await database.query("show max_connections"))
    .rows[0].max_connections;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersion.rows[0].server_version,
        opened_connections: databaseOpenedConnections,
        max_connections: Number(databaseMaxConnections),
      },
    },
  });
}

export default status;
