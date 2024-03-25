import database from "../../../../infra/database.js";

async function status(request, response) {
  const result = await database.query("SELECT 1 + 1 as sum;");
  console.log("🚀 ~ status ~ result:", result.rows);

  response.status(200).json({ key: "valor" });
}

export default status;
