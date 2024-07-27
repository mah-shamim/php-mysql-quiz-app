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

INSERT INTO questions (question, answer_type, answer) VALUES
("Identify the famous landmark.", "text", "Eiffel Tower");

INSERT INTO options (question_id, option_type, option_content) VALUES
(1, "text", "Eiffel Tower"),
(1, "image", "images/statue_of_liberty.jpg"),
(1, "video", "videos/great_wall.mp4"),
(1, "link", "https://en.wikipedia.org/wiki/Taj_Mahal");

