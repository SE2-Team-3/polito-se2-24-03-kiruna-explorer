
# kiruna-explorer
This document lists all components and routes that compose the Kiruna Explorer application.
# Table of Contents
- [kiruna-explorer](#kiruna-explorer)
- [Table of Contents](#table-of-contents)
- [React + TypeScript + Vite](#react--typescript--vite)
- [Expanding the ESLint configuration](#expanding-the-eslint-configuration)
- [Client Application Routes](#client-application-routes)
- [Client Application Components](#client-application-components)
  - [1. General Components](#1-general-components)
    - [Left Side Bar](#left-side-bar)
    - [Nav Bar](#nav-bar)
    - [User Context](#user-context)
    - [Sidebar Provider](#sidebar-provider)
    - [Toast Provider](#toast-provider)
  - [2. Anonymous User - Map](#2-anonymous-user---map)
    - [ExploreMap](#exploremap)
  - [3. General Pages](#3-general-pages)
    - [Home](#home)
    - [Login](#login)
  - [4. Urban Planner](#4-urban-planner)
    - [4.1. Add Document Form](#41-add-document-form)
      - [Data Selection](#data-selection)
      - [Document Details](#document-details)
      - [Language Selection](#language-selection)
      - [LinkEntry Form](#linkentry-form)
      - [Link Type Selection](#link-type-selection)
      - [Node Type](#node-type)
      - [Page Selection](#page-selection)
      - [Scale Selection](#scale-selection)
      - [Stakeholders Selection](#stakeholders-selection)
      - [Step One](#step-one)
      - [Step Two](#step-two)
      - [Step Three](#step-three)
      - [Add Document With Component](#add-document-with-component)
      - [Multiple Direct Link Form](#multiple-direct-link-form)
        - [4.1.1. Georeference](#411-georeference)
          - [Georeference Selection](#georeference-selection)
          - [Georeference Type Selection](#georeference-type-selection)
          - [Mini Map Modal](#mini-map-modal)
    - [4.2. Link Document Form](#42-link-document-form)
      - [Document Selector](#document-selector)
      - [Link Type Selector](#link-type-selector)
      - [Link Document Form](#link-document-form)
    - [4.3. Urban Planner Dashboard](#43-urban-planner-dashboard)
    - [4.4. Documents List](#44-documents-lists)
    - [4.5. Add Resource Form](#45-add-resource-form)

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


# **Client Application Routes**

The `App` component defines a set of routes to handle navigation between different parts of the application.

---

### **Root Route (`/`)**
- **Functionality**:  
  When a user navigates to the root path (`/`), this route checks if the user is logged in:  
  - **If logged in**: Redirects the user to the `/explore-map` route.  
  - **If not logged in**: Redirects the user to the `/login` route.

---

### **Login Route (`/login`)**
- **Functionality**:  
  Displays the `Login` component, which provides a login form.  
  - This route is accessible when the user is not logged in.  
  - If the login is successful, the user is redirected to `/explore-map`.

---

### **Home Route (`/home`)**
- **Functionality**:  
  Displays the `Home` component, which is a general public landing page.  
  - This route does not require login and can be accessed by any user.

---

### **Explore Map Route (`/explore-map`)**
- **Functionality**:  
  Renders the `ExploreMap` component, allowing logged-in users to explore the map.  
  - If the user is not logged in, they will be redirected to `/login`.

---

### **Urban Planner Route (`/urban-planner`)**
- **Functionality**:  
  Displays the `UrbanPlanner` component, providing tools and views specifically designed for urban planners.  
  - Requires the user to be logged in.  
  - If not logged in, the user is redirected to `/login`.

---

### **Add Document Route (`/urban-planner/add-document`)**
- **Functionality**:  
  Loads the `AddDocumentForm` component, allowing logged-in users to add a new document.  
  - If not logged in, the user is redirected to `/login`.

---

### **Link Documents Route (`/urban-planner/link-documents`)**
- **Functionality**:  
  Renders the `LinkDocumentForm` component for logged-in users to link related documents.  
  - If not logged in, the user is redirected to `/login`.

---

### **Documents List Route (`/urban-planner/documents-list`)**
- **Functionality**:  
  Displays the `DocumentsListTable` component, which lists all documents available to the user.  
  - Allows the user to select a document for further actions, such as uploading resources.  
  - Requires the user to be logged in.  
  - If not logged in, the user is redirected to `/login`.

---

### **Add Resource Route (`/urban-planner/add-resource`)**
- **Functionality**:  
  Loads the `AddResourceForm` component, allowing the user to add resources to a specific document.  
  - This route is restricted to logged-in users.  
  - If not logged in, the user is redirected to `/login`.

---

### **Floating Add Button**
- **Functionality**:  
  A floating "Add" button is displayed only when:  
  - The user is logged in (`loggedIn` is `true`).  
  - The current route is `/explore-map`.  
  - Clicking this button navigates the user to `/urban-planner/add-document`.

---


# Client Application Components

## 1. General Components

### Left Side Bar
**File**: `components/LeftSideBar.tsx`  
The component is a sidebar component that provides navigation and user-specific options in the app. It includes a button to create a new document, displays the username, and provides a logout option.

---

### Nav Bar 
**File**: `components/NavBar.tsx`  
The NavBar component renders a simple navigation bar with a title. It helps maintain a consistent UI by ensuring the navbar is visible across the application, except on the login page.

---

### User Context 
**File**: `components/UserContext.tsx`  
This component hold information about a user. This setup allows other components to access user information by subscribing to `UserContext`.

---

### Sidebar Provider 
**File**: `components/SidebarProvider.tsx`  
This component manages the sidebar's open/closed state across the application.

---

### Toast Provider 
**File**: `modules/ToastProvider.tsx`  
This component allows any component in the application to show toast notifications for success or error messages

---

## 2. Anonymous User - Map

### ExploreMap 
**File**: `modules/AnonymousUser-Map/ExploreMap.tsx`  
The component displays a map centered on Kiruna, Sweden. It visualizes documents as markers on the map, providing information about each document in a popup when a marker is clicked. If documents lack specific coordinates, they are grouped at the center of Kiruna.

---

## 3. General Pages

### Home 
**File**: `modules/GeneralPagaes/Home.tsx`  
This component serves as a welcome page for users after they log in to have access to their modules.

---

### Login
**File**: `modules/GeneralPagaes/Login.tsx`  
This component provides a login interface for users, allowing them to input their credentials (username and password) and submit them to log into the application.

---

## 4. Urban Planner

### 4.1. Add Document Form
This folder contains components for adding a new document:

   ### Data Selection
   **File**: `modules/UrbanPlanner/AddDocumentForm/elements/DataSelection.tsx`  
   This component is used for selecting a date within a form. It allows users to choose a date for the `issuance date` field of a document and automatically updates the parent component’s document state with the selected date.

--- 
   ### Document Details
   **File**: `modules/UrbanPlanner/AddDocumentForm/elements/DocumentDetails.tsx`  
    This component provides input fields for entering a document's title and description. It manages these fields locally and updates the parent component's document state with each change.

---

   ### Language Selection
   **File**: `modules/UrbanPlanner/AddDocumentForm/elements/LanguageSelection.tsx`  
This component allows users to select a language (either English or Swedish) for a document. It manages the state of the selected language. 

---
   ### LinkEntry Form
   **File**: `modules/UrbanPlanner/AddDocumentForm/elements/LinkEntryForm.tsx`  
This component is designed for managing individual link entries in the form.
Allows users to define a document and its associated link type(s) in a structured way and provides functionality to manage multiple link entries within a form.

---
   ### Link Type Selection
   **File**: `modules/UrbanPlanner/AddDocumentForm/elements/LinkTypeSelection.tsx`  
This component provides a dropdown-based multi-selection interface for choosing link types.
Enables users to select one or more link types from a predefined list and provides validation feedback if no link type is selected when the form is submitted.

---
   ### Node Type
   **File**: `modules/UrbanPlanner/AddDocumentForm/elements/NodeType.tsx`  
The component is designed to allow users to select the type of a document from a predefined list and updates the document's state with the selected. type.

---
   ### Page Selection
   **File**: `modules/UrbanPlanner/AddDocumentForm/elements/PageSelection.tsx`  
This component is designed to allow users to specify the number of pages for a document. It manages the state of the pages input.

---
   ### Scale Selection
   **File**: `modules/UrbanPlanner/AddDocumentForm/elements/ScaleSelection.tsx`  
This component is designed to allow users to select the scale of a document and conditionally input additional details based on their selection.

---
   ### Stakeholders Selection
   **File**: `modules/UrbanPlanner/AddDocumentForm/elements/StakeholdersSelection.tsx`  
This component allows users to select multiple stakeholders from a predefined list.

---

   ### Step One
   **File**: `modules/UrbanPlanner/AddDocumentForm/steps/StepOne.tsx`  
The component is representing the first step in a multi-step form for document creation.
Gathers basic information about a document, such as title, description, pages, and language.

---
   ### Step Two
   **File**: `modules/UrbanPlanner/AddDocumentForm/steps/StepTwo.tsx`  
The component represents the second step in a multi-step form for creating a document.
Collects additional information about the document, such as stakeholders, scale, node type, issuance date, and georeferencing type.

---
   ### Step Three
   **File**: `modules/UrbanPlanner/AddDocumentForm/steps/StepThree.tsx`  
The component is a minimal wrapper that integrates the `MultipleDirectLinkForm` component into the final step of a multi-step form. 
The component represents the third step in a multi-step form process.
It is specifically designed to handle the functionality of linking the newly created or updated document (identified by newDocID) to other existing documents.

---
   ### Add Document With Component
   **File**: `modules/UrbanPlanner/AddDocumentForm/AddDocumentWithComponent.tsx`  
This component represents a multi-step form for adding a new document. It handles the creation of a new document by guiding the user through multiple steps. It allows users to provide document details, additional information, and optionally link the document to others.

---
   ### Multiple Direct Link Form
   **File**: `modules/UrbanPlanner/AddDocumentForm/MultipleDirectLinkForm.tsx`  
This component allows users to link multiple existing documents to a newly created document.
The form allows users to select multiple documents and link them to a newly created document by choosing a document and one or more link types. The form is dynamic, allowing the user to add or remove link entries.

---
### 4.1.1. Georeference
This folder contains components for georeferencing the document:

   ### Georeference Selection
   **File**: `modules/UrbanPlanner/AddDocumentForm/elements/Georeference/GeoreferenceSelection.tsx`  
This component allows users to input geographical coordinates (latitude and longitude) and integrates this data into a document object.

---
   ### Georeference Type Selection
   **File**: `modules/UrbanPlanner/AddDocumentForm/elements/Georeference/GeoreferenceTypeSelection.tsx`  
This component is used for selecting a georeference type for a document.

---
   ### Mini Map Modal
   **File**: `modules/UrbanPlanner/AddDocumentForm/elements/Georeference/GeoreferenceTypeSelection.tsx`  
This component is used for selecting a georeference type for a document.

---
### 4.2. Link Document Form
This folder contains components for linking existing documents:
   
   ### Document Selector
   **File**: `modules/UrbanPlanner/LinkDosumentForm/elements/DocumentSelector.tsx`  
The component provides the functionality for selecting two documents from a list. 

---
   ### Link Type Selector
   **File**: `modules/UrbanPlanner/LinkDosumentForm/elements/LinkTypeSelector.tsx`  
The component allows users to select multiple link types for the documents they are linking

---
  
### Link Document Form
   **File**: `modules/UrbanPlanner/LinkDosumentForm/LinkDocumentForm.tsx`  
This component allows users to link two documents by selecting them from a list of available documents and specifying the type(s) of link between them.

---
### 4.3. Urban Planner Dashboard
**File**: `modules/UrbanPlanner/UrbanPlannerDashboard.tsx`  
This component provides urban planner module to intract with the application.

---
### 4.4. Documents List
**File**: `modules/UrbanPlanner/DocumentsLists/DocumentsListTable.tsx`  
This component allows users to view, navigate, and interact with document-related actions.

---
### 4.5. Add resource Form
**File**: `modules/UrbanPlanner/AddResourceForm/AddResourceForm.tsx`  
This component is used to upload resources (files) for a specific document. It allows users to select files, view the selected files, and then submit the files.

---

