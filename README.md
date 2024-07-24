# Book Store

This is a web application for managing a Book Store. The backend is built using Laravel, and the frontend is developed using React.

## Installation

### Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js 16.14 or higher
- npm or yarn
- MySQL or any other supported database

### Backend Setup (Laravel)

1. Clone the repository:
    ```bash
    git clone https://github.com/HoangMinhFpt/Book_Store
    cd Book_Store
    ```

2. Install dependencies:
    ```bash
    composer install
    ```

3. Copy the example environment file and configure the environment variables:
    ```bash
    cp .env.example .env
    ```
   Update the `.env` file with your database credentials and other necessary configuration.

4. Generate the application key:
    ```bash
    php artisan key:generate
    ```

5. Run the database migrations:
    ```bash
    php artisan migrate
    ```

6. Seed the database with initial data (optional):
    ```bash
    php artisan db:seed
    ```

7. Start the development server:
    ```bash
    php artisan serve
    ```
   The server will start at `http://localhost:8000`.

### Frontend Setup (React)

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3. Start the development server:
    ```bash
    npm start
    # or
    yarn start
    ```
   The server will start at `http://localhost:3000`.

## Features

- User authentication and authorization
- Add, update, delete books
- Browse and search books
- Admin can perform functions such as managing books (create, read, update, delete), view orders, reviews,...
- Customers can perform functions such as searching, viewing book details, rating, checking out the books they want to buy,... 
- Front end using some libraries as Reactstrap, FontAwesome, Bootstrap, i18next to translate language,...
- My website also uses the Redux library to manage state, specifically redux-tooltip, react-query for storing data retrieved from the database.

## Usage

After setting up the backend and frontend, you can access the application by navigating to `http://localhost:8000` for the Laravel server and `http://localhost:3000` for the React development server.
