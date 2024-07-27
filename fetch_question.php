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

