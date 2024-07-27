# PHP MYSQL QUIZ APP
A web application for presenting questions with multiple types of options (image, text, file, video, link) and an answer. Built with HTML, jQuery, JSON, PHP, and MySQL.

## Features

- Displays questions with various types of options.
- Options can be text, images, videos, files, or links.
- Users can select an option and receive feedback on their choice.
- Data is dynamically loaded from a MySQL database using PHP.

## Project Structure

- `index.html`: The main HTML file for the application.
- `script.js`: jQuery script for dynamic content and user interactions.
- `fetch_question.php`: PHP script to fetch questions and options from the database.
- `questions.json`: Example JSON file (if needed for development/testing).
- `images/`: Directory for image files.
- `videos/`: Directory for video files.
- `db/`: Database scripts and schema.

## Setup

1. **Clone the Repository**

    ```sh
    git clone https://github.com/yourusername/php-mysql-quiz-app.git
    cd php-mysql-quiz-app
    ```

2. **Set Up the Database**

    - Import the database schema from `db/create_tables.sql` into your MySQL server.

3. **Configure PHP**

    - Make sure to set up your PHP server to handle the `fetch_question.php` script.
    - Update the database connection details in `fetch_question.php` if needed.

4. **Run the Application**

    - Open `index.html` in your web browser to view the application.

## Contributing

Feel free to submit issues or pull requests for improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

### Steps to Create the Repository

1. **Create a New Repository:**
   - Go to GitHub and create a new repository with the name `php-mysql-quiz-app`.

2. **Initialize Local Repository:**
   - Navigate to your project directory and run:
     ```sh
     git init
     git add .
     git commit -m "Initial commit"
     ```

3. **Add Remote and Push:**
   - Add your GitHub repository as a remote and push your changes:
     ```sh
     git remote add origin https://github.com/yourusername/php-mysql-quiz-app.git
     git push -u origin master
     ```

4. **Add Topics:**
   - Go to your GitHub repository’s settings and add the topics listed above to help others discover your repository. 

By setting up your repository with these details, you'll provide clear information on the project and its structure, making it easier for others to understand, use, and contribute to your application.
