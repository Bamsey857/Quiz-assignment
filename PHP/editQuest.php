<?php

include '/xampp/htdocs/Quiz/PHP/Resources/Questions.php';

$json = file_get_contents('php://input');

$data = json_decode($json, true);

if ($data === null) {
    echo json_encode(array("error" => "Invalid JSON"));
    exit;
}

$question = $data["question"] ?? null;
$option1 = $data["option1"] ?? null;
$option2 = $data["option2"] ?? null;
$option3 = $data["option3"] ?? null;
$option4 = $data["option4"] ?? null;
$answer = $data["answer"] ?? null;
$id = $data["id"] ?? null;
$questID = $data["questID"] ?? null;

if (editQuestion($question, $option1, $option2, $option3, $option4, $answer, $id)) {
    $allQuestions = getQuestions($questID);
    echo json_encode(array("message" => "Question updated successfully", 'status' => 200, "questions" => $allQuestions));
} else {
    echo json_encode(array("error" => "Failed to update question", "status" => 500));
}