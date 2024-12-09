Try it at https://youngtai.github.io/gedcomx-differ-react/

This is a tool for visually diffing a pair of simple GedcomX JSON. The intent is _not_ to be able to diff all of the various fields and data that GedcomX can represent, but to make it easy to diff and edit a basic record with persons, relationships, and their facts.

Currently the primary customer is missionary volunteers who create GedcomX indexes for ACE to use in model testing and training.

---

# Running Locally

1. Clone this repo
2. Run `npm install`
3. Run `npm run dev`
4. Open `http://localhost:5173` in your browser

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
