# Mealy

A simple full stack MERN app to manage meals. Created to learn and improve at the MERN stack.

## Requirements To Run

- You need a MongoDB server running and its access url

## How To Run Locally

1. Clone the repository
2. From root directory run `npm install`
3. Create an .env file in root directory of app and add the following
   - MONGODB_URL={your DB url here}
   - JWT_KEY={a token key that will be used for authentication}
4. From root directory run `npm run dev` to start local express server and react development server concurrently
5. Connect to react app from `http://localhost:3000`
