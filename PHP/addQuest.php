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
$questID = $data["questID"] ?? null;



if (createQuestion($question, $option1, $option2, $option3, $option4, $answer, $questID)) {
    $allQuestions = getQuestions($questID);
    echo json_encode(array("message" => "Question created successfully", 'status' => 200, "questions" => $allQuestions)); 
}else{
    echo json_encode(array("error" => "Failed to create question", "status" => 500));
}