# CRUD Users API

A small REST API for managing users with Node.js and Express. User records are stored in `data/users.json`, so the project runs locally without a separate database.

## Features

- Health-check endpoint.
- Create, read, update, and delete user records.
- JSON request and response handling with Express.
- File-based persistence using the users JSON file.
- Environment-based port configuration with `dotenv`.
- Development auto-restart with `nodemon`.
- Postman collection for trying the endpoints.

## Technology

- Node.js (18 or later)
- Express 5
- dotenv
- chalk for colored console messages
- nodemon for development

## Setup and run

1. Install Node.js 18 or later.
2. Clone or download this project and open a terminal in the project directory.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root and set the server port:

   ```env
   PORT=5000
   ```

5. Start the development server (restarts when files change):

   ```bash
   npm run dev
   ```

   Or start it without the development watcher:

   ```bash
   npm start
   ```

The API will be available at `http://localhost:5000`. The server reads `PORT` from `.env`; if it is not set, provide it through your shell environment before starting the server.

## API

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Check that the server is running. |
| `GET` | `/users` | Return all users. |
| `GET` | `/users/:id` | Return the user with the specified ID. |
| `POST` | `/users` | Create a user. Requires `name` and `email`. |
| `PUT` | `/users/:id` | Replace the user's `name` and `email`. Both are required. |
| `DELETE` | `/users/:id` | Delete the user with the specified ID. |

Example request body for creating or updating a user:

```json
{
  "name": "Ada Lovelace",
  "email": "ada@example.com"
}
```

Requests that create or update users should use `Content-Type: application/json`. User changes are written to `data/users.json`.

### Try it with Postman

Import `crud-learning_05.10.2026.postman_collection.json` into Postman. The included requests target `http://localhost:5000`.

## Project structure

```text
.
├── controllers/
│   └── users.controller.js  # User operations and JSON file access
├── data/
│   └── users.json           # Initial and persisted user records
├── routes/
│   └── users.routes.js      # User endpoint definitions
├── server.js                # Express setup and server startup
├── package.json             # Dependencies and npm scripts
└── .env                     # Local configuration (create this yourself)
```

## Notes

- This is a learning project using a JSON file as its data store, not a production database.
- Keep the server running from the project root so the data file path resolves correctly.
- The `.env` file is local configuration and should not be committed.
