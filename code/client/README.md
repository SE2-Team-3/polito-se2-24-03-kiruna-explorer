# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```


## Client Application Routes
The `App` component defines a set of routes using `react-router-dom` to handle navigation between different parts of the application.
<br/>Here’s a breakdown of each route’s functionality:

* #### Root Route (`/`): 
   When a user navigates to the root path (`/`), this route checks if the user is logged in:
<br/>If logged in: Redirects the user to the `/home` route.
<br/>If not logged in: Redirects the user to the `/login` route.

* #### Login Route (`/login`):
  Displays the `Login` component, which provides a login form.This route is accessible when the user is not logged in. If the login is successful, the user is redirected to `/home`.

* #### Home Route (`/home`):
  Displays the `Home` component, which is the main landing page for logged-in users.

* #### Urban Planner Route (`/urban-planner`):
Displays the `UrbanPlanner` component, which likely provides tools and views specific to urban planners.

## Client Application Components
* #### Login Component in (`Login.tsx`):
  This component provides a login interface for users, allowing them to input their credentials (username and password) and submit them to log into the application.

* #### Home Component in (`Home.tsx`):
  This component serves as a welcome page for users after they log in to have access to their modules.

  * #### UserContext Component in (`UserContext.tsx`):
  This component hold information about a user. This setup allows other components to access user information by subscribing to `UserContext`.


 * #### Urban Planner Component in (`modules/UrbanPlanner/UrbanPlanner.tsx`):
   This component provides urban planner module to intract with the application.
