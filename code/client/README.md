# 🇸🇪 Kiruna-Explorer
This document lists all components and routes that compose the Kiruna Explorer application.

# :books: Table of Contents
- [:atom_symbol: React + TypeScript + Vite](#atom_symbol-react--typescript--vite)
- [:wrench: Expanding the ESLint configuration](#wrench-expanding-the-eslint-configuration)
- [:railway_track: Client Application Routes](#railway_track-client-application-routes)
- [:technologist: Client Application Components](#technologist-client-application-components)

# :atom_symbol: React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# :wrench: Expanding the ESLint configuration

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
<br/>

# :railway_track: Client Application Routes

The `App` component defines a set of routes to handle navigation between different parts of the application.

---

### **Root Route (`/`)**
- **Functionality**:  
  Redirects the user to the `/home` route and acts as the default page of the application..

---

### **Login Route (`/login`)**
- **Functionality**:  
  Displays the `Login` component, which provides a login form.  
  - This route is accessible when the user is not logged in.  
  - Allows users to log in or log in as a guest.
  - Displays messages for login-related actions.
  - If the login is successful, the user is redirected to `/explore-map`.

---

### **Home Route (`/home`)**
- **Functionality**:  
  Displays the `HomePage` component.
  - Shows basic information about the application.
  - Displays the logged-in user's username if available.
  - Accessible without login.

---

### **Diagram Route (`/diagram`)**
- **Functionality**:  
  Displays the `DiagramWrapper` component.
  - Allows filtering and searching of documents.
  - Manages the visibility of the filter table.
  - Accessible without login.

---

### **Document Details Route (`/documents/:documentId`)**
- **Functionality**:  
  Displays the `DocumentDetails` component.
  - Shows detailed information about a specific document identified by its `documentId`.
  - Accessible without login.

---

### **Explore Map Route (`/explore-map`)**
- **Functionality**:  
  Renders the `ExploreMap` component.
  - Provides an interactive map interface for exploring linked documents.
  - Allows users to view and manage linked documents.
  - Supports filtering of documents and switching between map layers.
  - Accessible without login.  
  

---

### **Urban Planner Route (`/urban-planner`)**
- **Functionality**:  
  Displays the `UrbanPlanner` component
  - Provides tools and views specifically designed for urban planners.  
  - Requires the user to be logged in.  
  - If not logged in, the user is redirected to `/login`.

---

### **Add Document Route (`/urban-planner/add-document`)**
- **Functionality**:  
  Loads the `AddDocumentForm` component.
  - Allows logged-in users to create ad a new document.  
  - If not logged in, the user is redirected to `/login`.

---

### **Link Documents Route (`/urban-planner/link-documents`)**
- **Functionality**:  
  Renders the `LinkDocumentForm` component for logged-in users to link related documents.  
  - If not logged in, the user is redirected to `/login`.

---

### **Documents List Route (`/urban-planner/documents-list`)**
- **Functionality**:  
  Displays the `DocumentsListTable` component, 
  - Allows logged-in users to view a table of documents. 
  - Allows the user to select a document for further actions, such as uploading resources, add attachment or link selected document to other documents.
  - Provides filtering and search options using `searchTitle`.   
  - If not logged in, the user is redirected to `/login`.

---

### **Add Resource Route (`/urban-planner/add-resource`)**
- **Functionality**:  
  Loads the `AddResourceForm` component.
  - Allows logged-in users to add resources to a document.    
  - If not logged in, the user is redirected to `/login`.

---

### **Add Attachment Route (`/urban-planner/add-attachment`)**
- **Functionality**:  
  Loads the `AddAttachment` component.
  - Allows logged-in users to add an attachment to a document..    
  - If not logged in, the user is redirected to `/login`.

---

### **Floating Add Button**
- **Functionality**:  
  A floating "Add" button is displayed only when:  
  - The user is logged in (`loggedIn` is `true`).  
  - The current route is `/explore-map`.  
  - Clicking this button navigates the user to `/urban-planner/add-document`.

<br/>


# :technologist: Client Application Components

 - [:books: Back to table of contents](#books-table-of-contents)
 - [1. General Components](#1-general-components)
   - [1.1. Custom Edge](#11-custom-edge)
      - [Edge Collateral Consequence](#edge-collateral-consequence)
      - [Edge Default](#edge-default)
      - [Edge Direct Consequence](#edge-direct-consequence)
      - [Edge Prevision](#edge-prevision)
      - [Edge Update](#edge-update)
   - [1.2. Diagram Components](#12-diagram-components)
      - [Connection Popup](#connection-popup)
      - [Diagram Table](#diagram-table)
      - [Edge Popup](#edge-popup)
      - [Icon](#icon)
    - [Municipality Area](#municipality-area)  
    - [Left Side Bar](#left-side-bar)
    - [Nav Bar](#nav-bar)
    - [Sidebar Context](#sidebar-context)
    - [User Context](#user-context)
  - [2. General Pages](#2-general-pages)
    - [2.1. Diagram](#diagram)
      - [Diagram](#diagram)
      - [Diagram Wrapper](#diagram-wrapper)
    - [Home Page](#home-page)
    - [2.2. Map](#21-map)
      - [Draggable Marker](#draggable-marker)
      - [Explore Map](#explore-map)
      - [Mini Map Detail](#mini-map-detail)
    - [Document Details](#document-details)
    - [Login](#login)
    - [Toast Provider](#toast-provider)
  - [3. Urban Planner](#3-urban-planner)
    - [3.1. Add Document Form](#31-add-document-form)
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
        - [3.1.1. Georeference](#311-georeference)
          - [List Of Area Selection](#list-of-area-selection)
          - [List Of Point Selection](#list-of-point-selection)
          - [New Area Selection](#new-area-selection)
          - [New Point Selection](#new-point-selection)
          - [Mini Map Area Modal](#mini-map-area-modal)
          - [Mini Map List Area Modal](#mini-map-list-area-modal)
          - [Mini Map List Point Modal](#mini-map-list-point-modal)
          - [Mini Map Point Modal](#mini-map-point-modal)
          - [Georeference Type Selection](#georeference-type-selection)
          - [GeoSelection](#geoselection)
    - [3.2. Documents List](#32-documents-list)
    - [3.3. File Upload Form](#33-file-upload-form)
      - [Add Attachment Form](#add-attachment-form)
      - [Add Resource Form](#add-resource-form)
      - [File Upload](#file-upload)
    - [3.4. Filter Popup](#34-filter-popup)
    - [3.5. Link Document Form](#35-link-document-form)
      - [Document Selector](#document-selector)
      - [Link Type Selector](#link-type-selector)
      - [Link Document Form](#link-document-form)
    - [3.6. Urban Planner Dashboard](#36-urban-planner-dashboard)
    
## 1. General Components

### 1.1. Custom Edge
This folder contains components that define link types between two documnets on diagram:

### Edge Collateral Consequence
**File**: `components/customEdge/EdgeCollateralConsequence.tsx`
The component provides edge for "Collateral" link type on diagram.

---

### Edge Default
**File**: `components/customEdge/EdgeDefault.tsx`
The component provides edge for "Default" link type on diagram.

---

### Edge Direct Consequence
**File**: `components/customEdge/EdgeDirectConsequence.tsx`
The component provides edge for "Direct" link type on diagram.

---

### Edge Prevision 
**File**: `components/customEdge/EdgePrevision.tsx`
The component provides edge for "Prevision" link type on diagram.

---

### Edge Update 
**File**: `components/customEdge/EdgeUpdate.tsx`
The component provides edge for "Update" link type on diagram.

---

### 1.2. Diagram Components
This folder contains components for Georeferencing documents on diagram:

### Connection popup  
**File**: `components/diagramComponents/ConnectionPopup.tsx`
This  component lets users create connections between documents on the diagram.

---

### Diagram Table 
**File**: `components/diagramComponents/DiagramTable.tsx`  
This component generates and renders a dynamic table for georeferncing data on the diagram.

---

### Edge popup  
**File**: `components/diagramComponents/EdgePopup.tsx`
This component serves as a popup modal displaying a list of "link types" and includes a button to close the modal.

---

### Icon 
**File**: `components/diagramComponents/Icon.tsx`
This component creates interactive flow diagrams or node-based UIs. It includes handles for connecting edges, along with an icon and label.

---

### Municipality Area
**Files**: `components/MunicipalityArea/MunicipalityArea.tsx`
This component extracts MultiPolygon geometry coordinates and converts them into an array of latitude-longitude pairs, ensuring compatibility with tools that require coordinates in the [lat, lon] format, such as Leaflet maps.

---

### Left Side Bar
**File**: `components/LeftSideBar.tsx`  
The component is a sidebar component that provides navigation and user-specific options in the app. 
- **If logged in**: It includes menu option of view documents, new document, link documents and documents list.  
- **If not logged in**: For guest user it provides just view document as the menu option.

---

### Nav Bar 
**File**: `components/NavBar.tsx`  
The NavBar component renders a simple navigation bar with a title. It helps maintain a consistent UI by ensuring the navbar is visible across the application, except on the login page.

---

### Sidebar Context 
**File**: `components/SidebarContext.tsx`  
This component manages the sidebar's open/closed state across the application.

---

### User Context 
**File**: `components/UserContext.tsx`  
This component hold information about a user. This setup allows other components to access user information by subscribing to `UserContext`.

---

## 2. General Pages

### 2.1. Diagram
This folder contains components for Georeferencing documents on diagram:

### Diagram
**File**: `modules/GeneralPagaes/Diagram/Diagram.tsx`  
The component displays a graphical representation of documents and their connections as nodes and edges, respectively. The component also provides various interactive features and contextual tools to enhance the user experience

---

### Diagram Wrapper
**File**: `modules/GeneralPagaes/Diagram/DiagramWrapper.tsx`  
The component handles the data fetching, processing, and initialization logic for a diagramming interface.

---

### Home 
**File**: `modules/GeneralPagaes/Homepage.tsx`  
This component renders the homepage of the application. It also provides navigation buttons to different sections of the app: a map exploration and a diagram view.

---


### 2.2. Map
This folder contains components for Georeferencing documents on map:

### Draggable Marker
**File**: `modules/GeneralPagaes/Map/DraggableMarker.tsx`  
This components is used by the logged in user to assign a new (lat, long) to the document on the map by moving it with drag&drop

---

### Explore Map
**File**: `modules/GeneralPagaes/Map/ExploreMap.tsx`  
The component  provides functionality for displaying documents as markers on a clustered map and integrates with draggable markers for user interaction

---

### Mini Map Detail
**File**: `modules/GeneralPagaes/Map/MiniMapDetail.tsx`  
This component renders a small map. It allows for visualizing one or more coordinates either as a marker (for a single coordinate) or a polyline (for multiple coordinates)

---

### Document Details
**File**: `modules/GeneralPagaes/DocumentDetails.tsx`  
The component displays detailed information about a specific document that is chosen on the diagram.

---

### Login
**File**: `modules/GeneralPagaes/Login.tsx`  
This component provides a login interface for users, allowing them to input their credentials (username and password) and submit them to log into the application.

---

### Toast Provider 
**File**: `modules/ToastProvider.tsx`  
This component allows any component in the application to show toast notifications for success or error messages

---

## 3. Urban Planner

### 3.1. Add Document Form
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
The component is designed to allow users to select the type of a document from a predefined list and updates the document's state with the selected type.

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

### 3.1.1. Georeference
This folder contains components for georeferencing the document:

### List Of Area Selection
**File**: `modules/UrbanPlanner/AddDocumentForm/elements/Georeference/elements/ListOfAreaSelection.tsx`  
This component is designed to manage and display a form field that allows users to assign a name and optionally configure polygon coordinates for a specific area on a map.

---

### List Of Point Selection
**File**: `modules/UrbanPlanner/AddDocumentForm/elements/Georeference/elements/ListOfPoinSelection.tsx`  
This component provides an interface for selecting and displaying a single geographic point (latitude and longitude).

---

### New Area Selection
**File**: `modules/UrbanPlanner/AddDocumentForm/elements/Georeference/elements/NewAreaSelection.tsx`  
This component allows users to define a new geographic area by naming it and optionally selecting its polygonal boundaries on a map.

---

### New Point Selection
**File**: `modules/UrbanPlanner/AddDocumentForm/elements/Georeference/elements/NewPointSelection.tsx`  
This component facilitates the selection of a single geographic point (latitude and longitude). It allows users to view and potentially update the coordinates using a modal map interface.

---

### Mini Map Area Modal
**File**: `modules/UrbanPlanner/AddDocumentForm/elements/Georeference/minimap/MiniMapAreaModal.tsx`  
The component is a modal window that enables users to interactively select or draw a polygon on a map and save its geographical coordinates. 

---

### Mini Map List Area Modal
**File**: `modules/UrbanPlanner/AddDocumentForm/elements/Georeference/minimap/MiniMapListAreaModal.tsx`  
This component provides a modal-based map interface for selecting predefined polygonal areas. It allows users to choose an area by clicking on displayed polygons.

---

### Mini Map List Point Modal
**File**: `modules/UrbanPlanner/AddDocumentForm/elements/Georeference/minimap/MiniMapListPointModal.tsx`  
This component is a modal-based map interface designed for selecting a single point location. It allows users to choose a point from a set of predefined locations.

---

### Mini Map Point Modal
**File**: `modules/UrbanPlanner/AddDocumentForm/elements/Georeference/minimap/MiniMapPointModal.tsx`  
This component is a modal-based map interface designed for selecting a single point location. It allows users to choose a point from a set of predefined locations.

---

### Georeference Type Selection
**File**: `modules/UrbanPlanner/AddDocumentForm/elements/Georeference/GeoreferenceTypeSelection.tsx`  
This component is used for selecting a georeference type for a document.

---

### GeoSelection
**File**: `modules/UrbanPlanner/AddDocumentForm/elements/Georeference/GeoSelection.tsx`  
This component serves as an interface for managing and displaying georeferenced data (like points, areas, or lists of points/areas) on a map. It allows users to input or select geographical features and customize their properties

---

### 3.2. Documents List
**File**: `modules/UrbanPlanner/DocumentsLists/DocumentsListTable.tsx`  
This component allows users to view, navigate, and interact with document-related actions.

---

### 3.3. File Upload Form
This folder contains components for uploading file for a document:

### Add Attachment Form 
**File**: `modules/UrbanPlanner/AddAttachmentForm/AddAttachment.tsx`  
This component is designed to let a user upload attachment files to a specific document.

---

### Add resource Form
**File**: `modules/UrbanPlanner/AddResourceForm/AddResourceForm.tsx`  
This component is used to upload resources (files) for a specific document. It allows users to select files, view the selected files, and then submit the files.

---

### File Upload
**File**: `modules/UrbanPlanner/AddResourceForm/AddResourceForm.tsx`  
This component provides a file upload interface such as drag-and-drop, file validation, removal, and form submission.

---

### 3.4. Filter Popup
**File**: `modules/UrbanPlanner/FilterTable/FilterPopup.tsx`  
The component provides a user interface for filtering documents based on various criteria includes documentType, nodeType, stakeholders, issuanceDateStart, issuanceDateEnd, language.

---
### 3.5. Link Document Form
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
### 3.6. Urban Planner Dashboard
**File**: `modules/UrbanPlanner/UrbanPlannerDashboard.tsx`  
This component provides urban planner module to intract with the application.
