### create project devtinder-web
- Create vite + react project       
    npm create vite@latest devtinder-web -- --template react  // install the vite builder(boilerplate code)
    npm install -> to install all the packages
    npm run dev -> project will run
- remove unneccesary code
- design library 
  - tailwind : css framework
    - npm i -D tailwindcss postcss autoprefixer / for v4 npm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss
    - npx tailwindcss init -p
    or/create manualy insted of runing npx tailwindcss init -p

    - tailwind.config.js

    /** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }

    - postcss.config.js
      export default {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      }

    - src/index.css
      @tailwind base;
      @tailwind components;
      @tailwind utilities;

    - In src/main.jsx (or src/index.jsx):
      import "./index.css"; // ✅ Import Tailwind styles

      Not working !!!!
    - Install the new PostCSS plugin
      npm install -D @tailwindcss/postcss

    - Update postcss.config.js
      export default {
        plugins: {
          "@tailwindcss/postcss": {},
        },
      }


      - install component library
        daisyui -> compatable with tailwind
        - it gives us more component
      npm i -D daisyui@latest
      - add the configuration to tailwind.config.js
        /** @type {import('tailwindcss').Config} */
        export default {
          content: [
            "./index.html",
            "./src/**/*.{js,ts,jsx,tsx}",
          ],
          theme: {
            extend: {},
          },
          plugins: {
            daisyui: {}, // ✅ Tailwind v4 style plugin registration
          },
        };

      -If you want to disable them and only use utilities:
      plugins: {
        daisyui: { themes: false },
      }

      - postcss.config.js

      import tailwindcss from "@tailwindcss/postcss";

      export default {
        plugins: [tailwindcss()],
      };

      - index.css
        @import "tailwindcss";
        @plugin "daisyui";

- https://daisyui.com/components/navbar/ -> link for document of daiyui

- Create a NarBar.jsx separate component file
- npm i react-router-dom -> to craete different path in react
- <Outlet /> //Renders the matching child route of a parent route or nothing if no child route matches.
- axios -> api to get API call
$ npm install axios
- To aovid cros error we need to install express cros middleware (backend code)
 npm i cors 

- instal redux tool kit
  npm install @reduxjs/toolkit react-redux -> it is two library

  - Store consist of slices and they can be different type of slice we can make.

- instal @reduxjs/toolkit and react-redux
- create a configureStore => Provider => createSlice => add reducer to store


