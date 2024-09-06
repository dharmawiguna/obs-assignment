# User Management Application

## Description

This is a simple **User Management Application** built with **React.js**, **TypeScript**, **Tailwind CSS**, and **Redux**. The app fetches user data from an external API and displays it in a table format. Each row in the table contains three action buttons to view, edit, or delete user information. The app uses local storage to store the updated user data and provides modal popups for editing and viewing user details.

## Features

- **View User Details**: You can view detailed information about a user by clicking the "view" icon.
- **Edit User**: Users can be edited by clicking the "edit" icon, which opens a form modal for updating the user data.
- **Delete User**: You can delete a user from the list by clicking the "delete" icon. The user data will be removed from both the table and local storage.

## Technologies Used

- **React.js**
- **TypeScript**
- **Redux** (for state management)
- **Axios** (for API requests)
- **Tailwind CSS** (for styling)
- **React Icons** (for action buttons)

## Getting Started

Follow the instructions below to run this project on your local machine.

### Prerequisites

Ensure you have the following installed:

- **Node.js** (>= 14.x)
- **npm** (>= 6.x) or **yarn**

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dharmawiguna/obs-assignment.git
   cd obs-assignment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   or with Yarn:
   ```bash
   yarn install
   ```

### Running the Application

To run the application locally, execute the following command:

```bash
npm start
```

or with Yarn:

```bash
yarn start
```

The application will be available at http://localhost:3000 in your browser.

### Building the Application

To build the project for production, run:

```bash
npm run build
```

or with Yarn:

```bash
yarn build
```

## Additional Information

- The application fetches user data from https://jsonplaceholder.typicode.com/users
- The user data is stored in Redux for state management, and all updates (edit and delete) are synced with the browser's local storage.
- Tailwind CSS is used for styling, ensuring a responsive and clean user interface
