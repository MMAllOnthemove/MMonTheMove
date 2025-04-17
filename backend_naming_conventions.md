# 📘 Node.js Naming Conventions

Follow these guidelines to keep code consistent, readable, and maintainable.

---

## 📁 Folders
- Use `kebab-case`
- Examples: `routes/`, `controllers/`, `services/`, `middlewares/`

---

## 📄 Files
- Use `kebab-case.js` or `camelCase.js`
- Match the file name with what it exports
- Examples: `user-controller.js`, `authService.js`

---

## 🧠 Variables & Functions
- Use `camelCase`
- Examples: `getUserById()`, `userService`, `authToken`

---

## 🧱 Classes
- Use `PascalCase`
- Examples: `UserService`, `ApiClient`

---

## ⚙️ Environment Variables
- Use `SCREAMING_SNAKE_CASE`
- Examples: `PORT`, `DATABASE_URL`

---

## 🛣️ Routes (RESTful)
- Use lowercase, plural nouns
- Examples:
  - `GET /users`
  - `POST /auth/login`

---

## 🧪 Tests
- Name tests after the file they're testing
- Use `.test.js` or `.spec.js`
- Examples: `user-controller.test.js`, `auth-service.spec.js`

---

## 📦 Package Names (npm)
- Use lowercase with dashes
- Examples: `my-awesome-lib`

---
