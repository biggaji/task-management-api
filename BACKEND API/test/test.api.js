// app.test.js
const request = require('supertest');
const app = require('./app');

//test to create task
describe('POST /tasks', () => {
  test('It should create a new task', async () => {
    const newTask = { title: 'Task 1', description: 'Description for Task 1' , status: 'Pending' , due_date: '20-04-2024' };
    const response = await request(app)
      .post('/tasks')
      .send(newTask);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(newTask.title);
    expect(response.body.description).toBe(newTask.description);
    expect(response.body.status).toBe(newTask.status);
    expect(response.body.due_date).toBe(newTask.due_date);
  });
});

//test to get all tasks
describe('GET /tasks', () => {
  test('It should fetch all tasks', async () => {
    const response = await request(app).get('/tasks');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});


//test for task with id and test if the id is not correct
describe('GET /tasks/:id', () => {
    test('It should return a task with a specific ID', async () => {
      
      const response = await request(app).get(`/tasks/66605c6c9ba03dd792053aaf`);
      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBe(taskId);
    });
  
    test('It should return 404 if task with specified ID does not exist', async () => {
       // Assuming this ID doesn't exist
      const response = await request(app).get(`/tasks/66605c6c9ba03dd792053aa`);
      expect(response.statusCode).toBe(404);
    });
  });

  //test for update
  
  describe('PUT /tasks/:id', () => {
    test('It should update a task with a specific ID', async () => {
      
      const updatedTask = { title: 'Updated Task 1' };
      const response = await request(app)
        .put(`/tasks/66605c6c9ba03dd792053aaf`)
        .send(updatedTask);
      expect(response.statusCode).toBe(200);
      expect(response.body.title).toBe(updatedTask.title);
    });
  
    test('It should return 404 if task with specified ID does not exist', async () => {
      
      const updatedTask = { title: 'Updated Task 1' };
      const response = await request(app)
        .put(`/tasks/66605c6c9ba03dd792053aa`)
        .send(updatedTask);
      expect(response.statusCode).toBe(404);
    });
  });

  // test for delete
  describe('DELETE /tasks/:id', () => {
    test('It should delete a task with a specific ID', async () => {
      
      const response = await request(app).delete(`/tasks/66605c6c9ba03dd792053aaf`);
      expect(response.statusCode).toBe(204);
    });
  
    test('It should return 404 if task with specified ID does not exist', async () => {
    
      const response = await request(app).delete(`/tasks/66605c6c9ba03dd792053aa`);
      expect(response.statusCode).toBe(404);
    });
  });

