import database from "infra/database.js";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
}

test("POST to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response.status).toBe(201);

  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);

  const newRequest = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(newRequest.status).toBe(200);

  const newResponseBody = await newRequest.json();
  expect(Array.isArray(newResponseBody)).toBe(true);
  expect(newResponseBody.length).toBe(0);
});
