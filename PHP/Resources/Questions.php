<?php

include "/xampp/htdocs/Quiz/PHP/database.php";

function getQuestions($id)
{

    global $conn;
    $sql = "SELECT * FROM questions WHERE questID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $questions = [];
    while ($row = $result->fetch_assoc()) {
        $questions[] = $row;
    }
    $stmt->close();
    return $questions;
}

function createQuestion($question, $option1, $option2, $option3, $option4, $answer, $courseid)
{

    global $conn;
    $sql = "INSERT INTO questions (question, option1, option2, option3, option4, answer, questID) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssss", $question, $option1, $option2, $option3, $option4, $answer, $courseid);
    if ($stmt->execute()) {
        $stmt->close();
        return true;
    } else {
        $stmt->close();
        return false;
    }
}

function editQuestion($question, $option1, $option2, $option3, $option4, $answer, $id)
{
    global $conn;
    $sql = "UPDATE questions SET question = ?, option1 = ?, option2 = ?, option3 = ?, option4 = ?, answer = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssi", $question, $option1, $option2, $option3, $option4, $answer, $id);
    if ($stmt->execute()) {
        $stmt->close();
        return true;
    } else {
        $stmt->close();
        return false;
    }
}

function deleteQuestion($id)
{
    global $conn;
    $sql = "DELETE FROM questions WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        $stmt->close();
        return true;
    } else {
        $stmt->close();
        return false;
    }
}