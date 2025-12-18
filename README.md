# React + TypeScript + Vite

# React + TypeScript + Vite – Personal Portfolio

This project is a **personal portfolio web application** built using **React, TypeScript, and Vite**. It is designed to present my professional profile in a clean, structured, and performance-focused manner for recruiters and technical reviewers.

The portfolio serves as a single platform to showcase my **skills, experience, projects, education, and resume**, with an emphasis on clarity, scalability, and modern frontend practices.

---

## 🚀 Features

- **About Me**  
  Professional summary highlighting career goals and technical interests.

- **Skills**  
  Categorized list of programming languages, frameworks, tools, and technologies.

- **Experience**  
  Internship, training, and project-based experience with responsibilities and outcomes.

- **Projects**  
  Academic and personal projects with descriptions, tech stack, and key learnings.

- **Education**  
  Academic background and relevant coursework.

- **Resume**  
  Downloadable resume for quick access.

- **Contact**  
  Links to email, GitHub, LinkedIn, and other professional profiles.

---

## 🛠 Tech Stack

- **Frontend:** React, TypeScript  
- **Build Tool:** Vite  
- **Styling:** CSS / Tailwind CSS  
- **Linting:** ESLint  
- **Version Control:** Git & GitHub  

---

## 📂 Project Structure

- Component-based architecture
- Type-safe codebase using TypeScript
- Clear separation of concerns for better maintainability
- Fast development and build times with Vite

---

## 🎯 Project Objective

The goal of this project is to:
- Present a professional and recruiter-friendly portfolio
- Demonstrate modern frontend development skills
- Maintain a scalable and easily extendable codebase

This portfolio is built for **real-world use**, not just as a demo project.

---

## ⚙️ Development Setup

### SETUP := 

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
