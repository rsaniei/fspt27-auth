# Full Stack To Do App

In this repository, you will use build a full stack To Do app using React, Node/Express, and MySQL.

## Objectives

- Build a database.
- Build an API server.
- Create a front end.

## Setup

### Dependencies

Run `npm install` in the project folder to install dependencies related to Express (the server).

`cd client` and run `npm install` install dependencies related to React (the client).

### Database Prep

Create `.env` file in project directory and add

```
DB_NAME=todos
DB_PASS=YOUR_PASSWORD
```

(replace `YOUR_PASSWORD` with your actual password)

Alternatively, you can rename the provided `.env.example` file to `.env`.

Type `mysql -u root -p` to access the MySQL CLI using your password.

In the MySQL CLI, type `create database todos;` to create a database in MySQL.

Run the following in the MySQL CLI: `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YOUR_PASSWORD';` (replace `YOUR_PASSWORD` with your actual password)

Run `npm run migrate` in your **TERMINAL**, in the **project** folder (not your MySQL CLI! Open a new terminal window for this). This will create a table called 'items' in your database.

### Run Your Development Servers

- Run `npm start` in project directory to start the Express server on port 4000
- `cd client` and run `npm run dev` to start client server in development mode with hot reloading in port 5173.
- Client is configured so all API calls will be proxied to port 4000 for a smoother development experience. Yay!
- You can test your client app in `http://localhost:5173`
- You can test your API in `http://localhost:4000/api`

## Basic Requirements

### 1. Read through all the current code and explain it to your partner.

- [ ] Explain what each line of code is doing.
  - Look at the docs and ask your instructor if you aren't sure!

### 2. Finish the routes

Suggested Process:

- Try and write the correct query in `mysql`.
- Use that query to finish the endpoint in `routes/api.js`.
- Test your endpoint using Postman.

To Do:

- [ ] Use Postman to confirm that you have completed these correctly
- [ ] GET `/api/todos` should retrieve all resources.
  - This route is almost complete!
- [ ] POST `/api/todos` should create a new resource.
  - To test that your query is correct, check to see if your new resource exists using `mysql`.
  - To test your route, use Postman to see if GET `api/todos` returns your new resources.
- [ ] PUT `/api/todos/:id` should replace a resource.
  - To test that your query is correct, check to see if your updated resource exists using `mysql`.
  - To test your route, use Postman to see if GET `api/todos` includes your updated resources.
- [ ] DELETE `/api/todos/:id` should delete a resource.
  - To test that your query is correct, check to see if your resource was deleted using `mysql`.
  - To test your route, use Postman to see if GET `api/todos` does not include your new resources.

### 3. Finish the front end

- [ ] Spend time reviewing the existing code in `client/src/App.jsx`.
- [ ] Finish populating `tasks` from the API call in `useEffect`.
  - Read about `useEffect` [in the React Docs](https://reactjs.org/docs/hooks-effect.html)
- [ ] Then, add a list of tasks to the DOM. Each task should have the following:
  - The text of the task.
  - A strike through (using CSS) if the task is complete.
  - Two buttons:
    - One button to mark the task complete (this should call the updateTask function)
    - One button to delete the task (this should call the deleteTask function)
- [ ] Finish the updateTask function so it calls the server.
- [ ] Finish the deleteTask function so it calls the server.
- [ ] Add styling.

## Resources

- [MySQL Cheat Sheet](http://www.mysqltutorial.org/mysql-cheat-sheet.aspx)
- [MySQL](https://dev.mysql.com/doc/refman/8.0/en/database-use.html)
- [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [React Documentation](https://react.dev/)

## Notes

_This is a student project that was created at [CodeOp](http://CodeOp.tech), a full stack development bootcamp in Barcelona._
