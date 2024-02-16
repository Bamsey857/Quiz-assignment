# Project Under Construction

This project is currently under construction, and certain features may not be fully implemented. The paths and links within the project are based on local files and may need to be modified to suit your environment.

## Description

This project is a PHP-based web application that provides quiz functionality. While the PHP backend works well, please note that the styling is not complete. Please modify the styling according to your preferences and requirements.

## Database Structure

The database used in this project is named `quiz` and consists of three tables:

1. **User Table**: This table stores user information and includes a boolean identifier to confirm the user's role as a teacher or student.
2. **Course Table**: The course table includes a foreign key of the user ID (named `teachID`)to associate courses with the corresponding user who created them.
3. **Questions Table**: This table stores quiz questions and includes a foreign key of the course ID (named `QuestId`) to associate questions with specific courses.

## File Structure

The project's modules or controllers for the database tables can be found in the `resources` folder. These files provide a deeper understanding of the code structure and logic.

## Usage

To use this project:

1. Ensure that you have PHP installed on your system.
2. Set up a local web server environment (e.g., XAMPP, WAMP, or MAMP).
3. Import the provided SQL file to create the `quiz` database and its tables.
4. Modify the paths and links within the project to match your local file structure.
5. Customize the styling to meet your design preferences.
6. Ensure that the PHP backend functionalities meet your requirements.

## Note

While the backend functionalities are fully implemented and operational, the frontend styling is a work in progress.

For any questions or assistance, please contact [`Bamsey857@gmail.com`].