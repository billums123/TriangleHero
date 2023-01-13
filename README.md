# TriangleHero

## Instructions

- After cloning the repository, run the following command from the root directory to install all required dependencies for both the frontend and backend:

  `npm install && npm run install-all-deps`

- To start the dev server and backend server run the following command from the root directory:

  `npm run dev`

- Navigate to the [server/.env](./server/.env) file and update the
  `DATABASE_URI` and `JWT_SECRET` environment variables

  _\*Note if using your own database, you can create your database tables using the [createDb.sql](./server//database/createDb.sql) file (server/database)._

- Some basic API testing has been set up on the backend using jest and supertest. Run the following command from the root directory to run test suite:

  `npm run test`

---

## Summary

Prior to digging into the code, I spent a few hours deciding how I wanted to tackle the problem, the tech stack I would use, and how I wanted it to function. I opted to use the following stack:
<br>

- Frontend: React (with TypeScript) and Material-UI to streamline styling
- Server: Node/Express (with TypeScript)
- Database: PostgreSQL
- Testing: Jest/Supertest

Upon starting on the assignment, I set up the repository to have a _dev_ branch be the default branch to push to rather than _main_ to better resemble how I’ve worked with teams in the past to protect production code and improve productivity as a team. For each feature I worked on, a new semantically named branch was created (i.e. when working on testing I worked in testSuite branch). This was to enhance organization, ensure reverting code (if needed) was less impactful, and be able to better document steps taken to create each feature. Once ready to submit the assignment, the dev branch was merged into the _main_ branch.

I was able to succesfully meet all the objectives of the assignment on the frontend as well a visually display a triangle based on user inputs. This feature proved much more difficult than I had anticipated. I used the HTML canvas element which I had not used before. It was challenging to say the least and I had to create quite a few [helper functions](./web/src/utils/findTriangleVerticesForCanvas.ts) While it's not a perfect feature, I am confident I could resolve any outstanding issues with addtional time.

On the backend I implemented password hashing (using bcrypt) and JWTs to handle user sessions and authenticate users making requests to the server. I also enabled users to save, view, and delete triangles in their count. While I recognize it's best practice to store media files on an online file storage system (such as AWS S3), I opted to save and store the generated PNG files of the triangles directly to the database by converting them to binary strings. If this project were to scale with many users and more data, I would pivot to using a file storage system.

For the database, I used PostgreSQL and created the [createDb.sql](./server//database/createDb.sql) file to quickly create your database as needed.

I implemented some basic API testing using jest and supertest. The testing suite is not comprehensive but I hope it demonstrates my ability to create useful tests.

---

## Future Improvements

- Build out the test suite more (both for frontend and backend).
- Improve form control on Create User/ Login.
- Allow users to edit their triangles if desired and give them nicknames (the triangles tables of the database has "nickname" attribute that currently is unused, that was the future intent of this attribute).
- Link emails to user accounts and set up password recovery.
- Update userController to not allow multiple users with the same username.
- Deploy application on AWS EB or AWS Lambda (for backend) with S3 (for frontend).
- I originally decided on the name "Triangle Hero" because I had the idea to create a small video game within the app. Once the user created a triangle (complete with color and other customization options), they would select the triangle as their "hero" and then proceed to play a Space Invaders-esque or similiar simple style game. There would be a leaderboard where other users could see high scores for the game. I didn't have time to implement this, but would love to explore this in the future.

- Update userController to not allow multiple users with the same username (especially important if a leaderboard was created).

---

## Final Comments

While I recognize this application is far from perfect, I hope that it allows you to get a small glimpse at my capabilities as a fullstack engineer. Thanks for the great project, I thoroughly enjoyed working on it and look forward to talking more soon!
<br>
<br>
Thanks,
<br>
Tanner Hesterman
<br>
801.641.2708 tannerhesterman@gmail.com

