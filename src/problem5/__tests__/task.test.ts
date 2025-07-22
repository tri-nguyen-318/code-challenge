import request from "supertest";
import app from "../src/app";

describe("GET api/v1/tasks", () => {
  it("should return list of tasks", async () => {
    try {
      const res = await request(app).get("/api/v1/tasks");
      console.log("🚀 ~ it ~ res:", res);

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true); // Adjust based on your logic
    } catch (error) {
      console.log("🚀 ~ it ~ error:", error);
    }
  });
});

describe("POST api/v1/tasks", () => {
  it("should create a new task", async () => {
    const newTask = { title: "Test Task", description: "This is a test task" };
    const res = await request(app).post("/api/v1/tasks").send(newTask);

    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toEqual(newTask.title);
    expect(res.body.description).toEqual(newTask.description);

    const find = await request(app).get(`/api/v1/tasks/${res.body.id}`);
    expect(find.statusCode).toEqual(200);
    expect(find.body.id).toEqual(res.body.id);
    expect(find.body.title).toEqual(newTask.title);
    expect(find.body.description).toEqual(newTask.description);
  });
});

describe("PUT api/v1/tasks/:id", () => {
  it("should update an existing task", async () => {
    const newTask = { title: "Test Task", description: "This is a test task" };
    const resCreated = await request(app).post("/api/v1/tasks").send(newTask);

    const updatedTask = {
      title: "Updated Task",
      description: "This is an updated task",
    };
    const res = await request(app)
      .put(`/api/v1/tasks/${resCreated.body.id}`)
      .send(updatedTask);

    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual(updatedTask.title);
    expect(res.body.description).toEqual(updatedTask.description);
  });
});

describe("DELETE api/v1/tasks/:id", () => {
  it("should delete a task", async () => {
    const newTask = { title: "Test Task", description: "This is a test task" };
    const resCreated = await request(app).post("/api/v1/tasks").send(newTask);

    const res = await request(app).delete(
      `/api/v1/tasks/${resCreated.body.id}`
    );

    expect(res.statusCode).toEqual(204);

    // find the deleted task
    const find = await request(app).get(`/api/v1/tasks/${resCreated.body.id}`);
    expect(find.statusCode).toEqual(404); // Assuming 404 is returned for not found
    expect(find.body.message).toEqual("Task not found");
  });
});

// get item task (detail)
describe("GET api/v1/tasks/:id", () => {
  it("should return a task by ID", async () => {
    const newTask = { title: "Test Task", description: "This is a test task" };
    const resCreated = await request(app).post("/api/v1/tasks").send(newTask);

    const res = await request(app).get(`/api/v1/tasks/${resCreated.body.id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(resCreated.body.id);
  });
});
