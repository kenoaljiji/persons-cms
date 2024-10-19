# Persons CMS Website

This is a custom CMS (Content Management System) built using React for the frontend, Node.js with Express for the backend, and MariaDB as the database. The CMS allows users to dynamically manage content, specifically focused on handling "Persons" in the system. It provides an admin dashboard for performing tasks like adding users, managing posts, sorting persons, and creating database backups.

## Features

- **Admin Login**: Admins can log in via the `/admin` route using the default credentials:
  - **Username**: `admin`
  - **Password**: `admin1234`
- **Admin Dashboard**: After logging in, the admin can access the dashboard at `admin/dashboard`. From here, users can: - ![Dashboard](images/dashboard.png)  
   The admin can add new users by filling in the required details.

  - **Add new users**:
  - ![Add User](https://your-image-url.com/add-user.png)  
    The admin can add new users by filling in the required details.

  - **Create and manage posts**:

    - ![Manage Posts](/images/)  
      Manage posts, including adding, editing, and deleting posts from the dashboard.

  - **Sort persons dynamically**:

    - ![Sort Persons](https://your-image-url.com/sort-persons.png)  
      Easily sort and filter the list of persons dynamically.

  - **Create backups of the database**:
    - ![Create Backup](https://your-image-url.com/create-backup.png)  
      Quickly create backups of the database with a single click.

- **Backend**: The backend is built using Express, Node.js, and MariaDB, providing a robust API to interact with the database.
- **Frontend**: The frontend is built using React, providing a modern and responsive interface for interacting with the CMS.

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MariaDB (SQL)

## How to Run Locally

### Prerequisites

Make sure you have the following installed:

- Node.js
- MariaDB

### Clone the Repository

```bash
git clone https://github.com/yourusername/persons-cms.git
cd persons-cms
```
