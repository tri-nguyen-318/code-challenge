import app from "./app";

const PORT = 3000;

app.listen(PORT, () => {
  console.log("✅ Server running at http://localhost:3000");
  console.log("📘 API docs at http://localhost:3000/api-docs");
});
