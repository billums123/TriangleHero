# TriangleHero

## Instructions

After cloning the repository, run the following command from the root directory to install all required dependencies for both the frontend and backend:

`npm install && npm run install-all-deps`

To start the dev server and backend server run the following command from the root directory:

`npm run dev`

Navigate to the [server/.env](./server/.env) file and update the
`DATABASE_URI`, `TEST_DATABSE_URI` and `JWT_SECRET` environment variables

\*Note if using your own database, you can create your database tables using the [createDb.sql](./server//database/createDb.sql) file (server/database)
