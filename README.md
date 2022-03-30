# Timber Computer

Timber Computer helps you understand the potential carbon impact of a future design by configuring a reference building.


## Backend
The backend runs on [Strapi](https://strapi.io/)


## Frontend
The frontend is powered by [Astro](https://astro.build/), [Vue 3](https://vuejs.org/), [Nano Stores](https://github.com/nanostores/nanostores), [Tailwind CSS](https://tailwindcss.com/), [Vite](https://vitejs.dev/)


## Usage

First install the dependencies:

```sh
npm install
```

Then move into frontend or backend folder.

In the frontend you can:


| Command               | Description                                   |
| --------------------- | --------------------------------------------- |
| **`npm run dev`**     | Runs dev server on http://localhost:3000      |
| **`npm run start`**   | Runs dev server on http://localhost:3000      |
| **`npm run build`**   | Runs Astro build process into dist folder     |
| **`npm run preview`** | Runs preview of build                         |


In the backend you can:

| Command               | Description                                   |
| --------------------- | --------------------------------------------- |
| **`npm run develop`** | Enable access backend in development          |
| **`npm run start`**   | |
| **`npm run build`**   | Create files for backend                      |
| **`npm run strapi`**  | |


This project runs on the current Node LTS version 16.x and uses [npm workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces).

To install global dependencies, that will be used for all workspaces, run
`npm install dependency-123 --save`.

To install a dependency for the frontend, run
`npm install sass -workspace frontend --save-dev`


Make sure you use the correct node.js version:

```sh
# with bash nvm 
nvm use `cat .nvmrc`
# with windows nvm
nvm use $(cat .nvmrc)
# or just install the version specified inside `.nvmrc`
```
