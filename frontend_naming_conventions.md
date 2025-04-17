# ⚛️ React Naming Conventions

Consistent naming improves readability, maintainability, and collaboration in React projects.

---

## 📁 Folders

-   Use `kebab-case`
-   Group by feature or domain when possible
-   Examples: `components/`, `hooks/`, `auth/`, `user-profile/`

---

## 📄 Files

-   Use `PascalCase.js/.tsx` for components
    -   ✅ `LoginForm.tsx`, `UserProfileCard.tsx`
-   Use `camelCase.js/.ts` for hooks and utilities
    -   ✅ `useAuth.ts`, `formatDate.ts`

---

## 🧩 Components

-   Use **PascalCase** for component names
    -   ✅ `UserCard`, `LoginForm`
    -   ❌ `usercard`, `login_form`
-   File name should match component name

---

## 🪝 Hooks

-   Use **camelCase**, always start with `use`
    -   ✅ `useUser()`, `useAuthToken()`
    -   ❌ `getUserHook()`, `auth()`

---

## 🧠 Variables & Functions

-   Use **camelCase**
    -   ✅ `handleSubmit`, `userData`, `fetchPosts()`

---

## 🧱 Classes (if used)

-   Use **PascalCase**
    -   ✅ `class AuthService {}`

---

## 🧪 Test Files

-   Match the component name + `.test.tsx` or `.spec.tsx`
    -   ✅ `LoginForm.test.tsx`, `useAuth.spec.ts`

---

## 🌐 CSS/SCSS Modules

-   Use `PascalCase.module.css` or `camelCase.module.scss`
    -   ✅ `LoginForm.module.css`, `userProfileCard.module.scss`

---

## 📦 Package Names (if publishing)

-   Use lowercase with dashes
    -   ✅ `react-awesome-ui`

---

## 💡 Example Structure
