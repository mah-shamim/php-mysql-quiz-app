# PHP MYSQL QUIZ APP
To create a website that presents a complex question with multiple types of options (image, text, file, video, link) and an answer, using HTML, jQuery, JSON, PHP, and MySQL, you need to follow several steps. Here's a detailed guide:

### Step 1: Database Setup

First, create a MySQL database and table to store the questions and options.

**SQL to create the database and tables:**

```sql
CREATE DATABASE question_db;

USE question_db;

CREATE TABLE questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    answer_type ENUM('text', 'image', 'file', 'video', 'link') NOT NULL,
    answer TEXT NOT NULL
);

CREATE TABLE options (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT,
    option_type ENUM('text', 'image', 'file', 'video', 'link') NOT NULL,
    option_content TEXT NOT NULL,
    FOREIGN KEY (question_id) REFERENCES questions(id)
);
```

### Step 2: Insert Sample Data

Insert some sample data into the `questions` and `options` tables.

```sql
INSERT INTO questions (question, answer_type, answer) VALUES
("Identify the famous landmark.", "text", "Eiffel Tower");

INSERT INTO options (question_id, option_type, option_content) VALUES
(1, "text", "Eiffel Tower"),
(1, "image", "images/statue_of_liberty.jpg"),
(1, "video", "videos/great_wall.mp4"),
(1, "link", "https://en.wikipedia.org/wiki/Taj_Mahal");
```

### Step 3: PHP Script to Fetch Data

Create a PHP script to fetch the question and options from the database.

**fetch_question.php:**

```php
<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "question_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$question_id = 1; // You can change this to fetch different questions

$question_sql = "SELECT * FROM questions WHERE id = $question_id";
$question_result = $conn->query($question_sql);

$options_sql = "SELECT * FROM options WHERE question_id = $question_id";
$options_result = $conn->query($options_sql);

$response = array();

if ($question_result->num_rows > 0) {
    $response['question'] = $question_result->fetch_assoc();
}

if ($options_result->num_rows > 0) {
    $response['options'] = array();
    while($row = $options_result->fetch_assoc()) {
        $response['options'][] = $row;
    }
}

echo json_encode($response);

$conn->close();
?>
```

### Step 4: HTML Structure

Create the HTML structure for your site.

**index.html:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Complex Question Site</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .question-container {
            margin: 20px;
        }
        .options-container {
            margin: 20px 0;
        }
        .option {
            margin: 10px 0;
        }
        .result-container {
            margin: 20px 0;
            display: none;
        }
    </style>
</head>
<body>
    <div class="question-container">
        <h1 id="question"></h1>
        <div class="options-container" id="options-container"></div>
        <button id="submit-btn">Submit</button>
    </div>
    <div class="result-container" id="result-container">
        <h2>Result</h2>
        <p id="result"></p>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="script.js"></script>
</body>
</html>
```

### Step 5: jQuery Script

Create a jQuery script to load the question and handle user interaction.

**script.js:**

```javascript
$(document).ready(function() {
    $.ajax({
        url: 'fetch_question.php',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            $('#question').text(data.question.question);

            data.options.forEach(function(option) {
                let optionElement;
                switch (option.option_type) {
                    case 'text':
                        optionElement = `<div class="option">
                                            <input type="radio" name="option" value="${option.option_content}">
                                            <label>${option.option_content}</label>
                                        </div>`;
                        break;
                    case 'image':
                        optionElement = `<div class="option">
                                            <input type="radio" name="option" value="${option.option_content}">
                                            <img src="${option.option_content}" alt="Option Image" style="max-width: 200px;">
                                        </div>`;
                        break;
                    case 'video':
                        optionElement = `<div class="option">
                                            <input type="radio" name="option" value="${option.option_content}">
                                            <video width="320" height="240" controls>
                                                <source src="${option.option_content}" type="video/mp4">
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>`;
                        break;
                    case 'link':
                        optionElement = `<div class="option">
                                            <input type="radio" name="option" value="${option.option_content}">
                                            <a href="${option.option_content}" target="_blank">${option.option_content}</a>
                                        </div>`;
                        break;
                }
                $('#options-container').append(optionElement);
            });

            $('#submit-btn').click(function() {
                var selectedOption = $('input[name="option"]:checked').val();
                if (selectedOption) {
                    if (selectedOption === data.question.answer) {
                        $('#result').text("Correct! The answer is " + data.question.answer + ".");
                    } else {
                        $('#result').text("Incorrect. The correct answer is " + data.question.answer + ".");
                    }
                    $('#result-container').show();
                } else {
                    alert("Please select an option.");
                }
            });
        }
    });
});
```

### Explanation

1. **Database Setup**: Creates the necessary tables and inserts sample data.
2. **PHP Script**: Fetches the question and options from the database and returns them as a JSON response.
3. **HTML Structure**: Defines the basic structure of the page with containers for the question, options, and result.
4. **jQuery Script**: Loads the question and options using AJAX, dynamically creates the appropriate HTML elements, and handles the submission of the selected option.

This setup allows you to present complex questions with various types of options and handle user interactions seamlessly. You can extend this by adding more complex question types, improving the styling, and adding additional functionalities as needed.
