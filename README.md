# AcedIt! School Dashboard

This application helps students to manage their courses, tasks, and progress.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Progress](#progress)
- [To-Do](#to-do)
- [License](#license)

## Usage

### Backend Spring Boot Locally running

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dariganarmanova/school-dashboard.git
   cd school-dashboard/backend
   ```
2. **Run the Maven command:**

   ```bash
   ./mvnw clean package
   ```

3. **Run the Backend:**

   ```bash
   java -jar target/project-0.0.1-SNAPSHOT.jar
   ```

### Frontend React Locally running

1. **Install Frontend Dependencies:**

   ```
   npm install
   ```

2. **Start:**

   ```
   npm start
   ```

## Progress

### ✅ Completed Features

- 3rd February: initialized repo on github, set up tasks, dependencies
- 4th February: implemented authentication with spring security: includes jwtauthenticationfilter, service, app configuration, started frontend side, did not do the styling yet
- 5th February: set up postgresql db, fixed role bug, authentication page and navbar frontend set up
- 6th February: task set-up server side
- 7th February: did nothing
- 8th February: did nothing
- 9th February: implemented task CRUD, client-side tasks form, get request, post request for client side.
- 10th February: implemented filtering
- 11th February: fixed rendering bug
- 12th February: styled, course component frontend set up
- 13th February: did nothing
- 14th February: grades backend set up, d3
- 15th February: d3 style, progress component style, final touch ups
- 16th February: did nothing
- 17th February: wrap up the project

## To-Do

1. **Set up project repository**:

- [x] Initialize project repo on Github.
- [x] Set up project structure.

2. **User Authentication**:

- [x] Implement Spring Boot Authentication and Authorization (role-based) with Spring Security and JWT. Authentication should also include student grade, age, head teacher's name.
- [x] Test with Postman.
- [x] Set up Frontend for user authentication.

3. **Home Screen**:

- [x] Set up Frontend Home Screen. Navigation bar should include Log In or Sign Up, Course view, Task view, Progress view, User information.

4. **Task Management System**:

- [x] Implement task creation, deletion, edit.
- [x] Implement deadline for each task.
- [x] Implement filtering -> based on the date.

5. **Course Page**:

- [x] View all the courses assigned by the admin (head teacher or administrator).

6. **Progress Tracking**:

- [x] Implement D3.js chart for progress tracking. It should include the student's grades.
- [x] Take the course information from /course endpoint or db, then have categories and input for the student to input the grade.
- [x] Chart should be based on the date. Each date is a bar with a grade and shows the progress over time.

7. **Package as a JAR backend**:

- [x] Final.
