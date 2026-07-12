# DevPulse Backend API 🚀

A role-based Issue Tracking REST API built with **Express.js**, **TypeScript**, **PostgreSQL**, and **JWT Authentication**.

This project allows contributors and maintainers to manage software issues such as bugs and feature requests.

---

# ✨ Features

- User Registration & Login
- JWT Authentication
- Role-Based Authorization
- Create Issues
- Get All Issues
- Get Single Issue
- Update Issues
- Delete Issues
- PostgreSQL Database Integration
- Password Hashing with bcrypt
- TypeScript Architecture

---

# 🛠️ Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- JWT
- bcryptjs
- dotenv

---

# 📁 Project Structure

```bash
src/
│
├── config/
├── db/
├── middleware/
│
├── modules/
│   ├── auth/
│   ├── user/
│   └── issues/
│
├── app.ts
└── server.ts
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone <your-repository-link>
```

---

## 2. Move to Project Folder

```bash
cd ASSIGNMENT_2_DEVPULSE
```

---

## 3. Install Dependencies

```bash
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

DATABASE_URL=your_postgresql_connection_string

JWT_SECRET=your_secret_key
```

---

# ▶️ Run The Project

## Development Mode

```bash
npm run dev
```

---

# 📌 API Endpoints

---

# 🔹 Authentication

## Register User

### POST `/api/auth/signup`

```json
{
  "name": "John Doe",
  "email": "john.doe@gmail.com",
  "password": "123456",
  "role": "contributor"
}
```

---

## Login User

### POST `/api/auth/login`

```json
{
  "email": "john.doe@gmail.com",
  "password": "123456"
}
```

---

# 🔹 Users

## Get All Users

### GET `/api/users`

### Access:
- Maintainer Only

### Headers

```txt
Authorization: <JWT_TOKEN>
```

---

# 🔹 Issues

## Create Issue

### POST `/api/issues`

### Access:
- Contributor
- Maintainer

### Headers

```txt
Authorization: <JWT_TOKEN>
```

### Request Body

```json
{
  "title": "Database connection issue",
  "description": "Pool exhausted under load",
  "type": "bug"
}
```

---

## Get All Issues

### GET `/api/issues`

### Query Params

| Param | Values |
|---|---|
| sort | newest / oldest |
| type | bug / feature_request |
| status | open / in_progress / resolved |

Example:

```bash
/api/issues?sort=newest&type=bug
```

---

## Get Single Issue

### GET `/api/issues/:id`

Example:

```bash
/api/issues/1
```

---

## Update Issue

### PATCH `/api/issues/:id`

### Access:
- Maintainer → Any Issue
- Contributor → Own Issue Only

### Headers

```txt
Authorization: <JWT_TOKEN>
```

### Request Body

```json
{
  "title": "Updated Issue Title",
  "description": "Updated description",
  "status": "resolved"
}
```

---

## Delete Issue

### DELETE `/api/issues/:id`

### Access:
- Maintainer Only

### Headers

```txt
Authorization: <JWT_TOKEN>
```

---

# 🔒 Authentication & Authorization

This project uses:

- JWT Authentication
- Role-Based Middleware

Supported Roles:

- contributor
- maintainer

---

# ✅ Success Response Example

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

---

# ❌ Error Response Example

```json
{
  "success": false,
  "message": "Something went wrong",
  "errors": {}
}
```

---

# 👨‍💻 Author

Developed by **Ehasun Ul Islam** 🚀
