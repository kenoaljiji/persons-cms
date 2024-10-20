# Persons CMS Website

This is a custom CMS (Content Management System) built using React for the frontend, Node.js with Express for the backend, and MariaDB as the database. The CMS allows users to dynamically manage content, specifically focused on handling "Persons" in the system. It provides an admin dashboard for performing tasks like adding users, managing posts, sorting persons, and creating database backups.

## Frontpage:

![Dashboard](images/frontpage.png)

## Features

- **Admin Login**: Admins can log in via the `/admin` route using the default credentials:
  - **Username**: `admin`
  - **Password**: `admin1234`

### Admin dashboard

After logging in, the admin can access the dashboard at `admin/dashboard`. From here logged user can add new users, make new posts, change header navigation and logo,change footer item, sort person in front page, track visitors ip, system information and make can backup for db and backend part.

![Dashboard](images/dashboard.png)

### Add Users

![Users](/images/users.png)
Manage users, including adding , editing and deleting users

### Create and manage posts

- ![Manage Posts](/images/posts.png)  
  Manage posts, including adding, editing, and deleting posts from the dashboard.

- **Add persons post on frontpage**:

  ![Add Persons on front page](/images/persons-post.png)
  Add Persons Post on frontpage and also in Persons Of Interest page . In Persons of Interest you can add a multiple titles based on selected person . But if you dont select existing peron then you can add new person with first title. All persons in frontpage exist in carousel in row no 3 in frontpage.

  ![Add media files](/images/media-files.png)
  Add media files to display a media in persons details page based on selected title. You can add multiple media files in one title

- **Sort persons dynamically**:

  ![Sort Persons](https://your-image-url.com/sort-persons.png)  
  Easily sort and filter the list of persons dynamically.

- **Create backups of the database**:

  - ![Create Backup](https://your-image-url.com/create-backup.png)  
    Quickly create backups of the database with a single click.

- **Change header and footer**:

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
