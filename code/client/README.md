
# kiruna-explorer
This document lists all components and routes that compose the Kiruna Explorer application.
# Table of Contents
- [kiruna-explorer](#kiruna-explorer)
- [Table of Contents](#table-of-contents)
- [React + TypeScript + Vite](#react--typescript--vite)
- [Expanding the ESLint configuration](#expanding-the-eslint-configuration)
- [Client Application Routes](#client-application-routes)
- [Client Application Components](#client-application-components)
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Expanding the ESLint configuration

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


# Client Application Routes
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

* #### Add Document Route (`/urban-planner/add-document`):
Loads the `AddDocumentForm` component, which allows the user to add a new document.

* #### Add Document Route (`/urban-planner/link-documents`):

This route renders the `LinkDocumentForm` component when the user is logged in. If the user is not logged in, it redirects them to the login page.

# Client Application Components

* #### Left Side Bar Component in (`LeftSideBar.tsx`):
   The component is a sidebar component that provides navigation and user-specific options in the app. It includes a button to create a new document, displays the username, and provides a logout option.

* #### Nav Bar Component in (`NavBar.tsx`):
   The NavBar component renders a simple navigation bar with a title. It helps maintain a consistent UI by ensuring the navbar is visible across the application, except on the login page.

* #### UserContext Component in (`UserContext.tsx`):
   This component hold information about a user. This setup allows other components to access user information by subscribing to `UserContext`.

* #### Login Component in (`modules/GeneralPages/Login.tsx`):
   This component provides a login interface for users, allowing them to input their credentials (username and password) and submit them to log into the application.

* #### Home Component in (`modules/GeneralPages/Home.tsx`):
   This component serves as a welcome page for users after they log in to have access to their modules.

* #### Urban Planner Dashboard Component in (`modules/UrbanPlanner/UrbanPlannerDashboard.tsx`):
   This component provides urban planner module to intract with the application.

* #### Add Document Form Component in (`modules/UrbanPlanner/AddDocumentForm/AddDocumentForm.tsx`):
   This component provides a comprehensive form interface that enables users to input and submit details for adding a new document to the system. It uses several subcomponents to handle different sections of the form and manages state for error handling and form validation.

* #### Date Selection Component in (`modules/UrbanPlanner/AddDocumentForm/DateSelection.tsx`):
   This component is used for selecting a date within a form. It allows users to choose a date for the `issuance date` field of a document and automatically updates the parent component’s document state with the selected date.

* #### Document Details Component in (`modules/UrbanPlanner/AddDocumentForm/DocumentDetails.tsx`):
   This component provides input fields for entering a document's title and description. It manages these fields locally and updates the parent component's document state with each change.

* #### Language Selection Component in (`modules/UrbanPlanner/AddDocumentForm/LanguageSelection.tsx`):
   This component allows users to select a language (either English or Swedish) for a document. It manages the state of the selected language. 

* #### Node Type Component in (`modules/UrbanPlanner/AddDocumentForm/NodeType.tsx`):
   This component that allows users to select a document type from a dropdown menu. It manages the state of the selected document type.

* ####  Page Selection Component in (`modules/UrbanPlanner/AddDocumentForm/PageSelection.tsx`):
   This component is designed to allow users to specify the number of pages for a document. It manages the state of the pages input.

* ####  Scale Selection Component in (`modules/UrbanPlanner/AddDocumentForm/ScaleSelection.tsx`):
   This component is designed to allow users to select the scale of a document and conditionally input additional details based on their selection.
* ####  Stakeholder Selection Component in (`modules/UrbanPlanner/AddDocumentForm/StakeholderSelection.tsx`):
   This component allows users to select multiple stakeholders from a predefined list.

* ####   Georeference Selection Component in (`modules/UrbanPlanner/AddDocumentForm/GeoreferenceSelection.tsx`):
   This component allows users to input geographical coordinates (latitude and longitude) and integrates this data into a document object.

* ####    Document Selector Component in (`modules/UrbanPlanner/LinkDocumentForm/DocumentSelector.tsx`):
   This component is a document selection form where users can select two documents from a list, possibly for comparison or other dual-document operations.

* ####     Link Type Selector Component in (`modules/UrbanPlanner/LinkDocumentForm/LinkTypeSelector.tsx`):
   This component is a form element that provides four mutually exclusive radio button options for users to select a "link type." Once a user selects one of the options, the parent component’s state is updated to reflect the chosen link type. This component is useful when categorizing or classifying data based on predefined link types.

* ####     Link Document Form Component in (`modules/UrbanPlanner/LinkDocumentForm/LinkDocumentForm.tsx`):
   This component provides a form for linking two documents in a user interface. It includes two select inputs for choosing documents, a selector for the type of link between the documents, and buttons to submit the form or cancel the action