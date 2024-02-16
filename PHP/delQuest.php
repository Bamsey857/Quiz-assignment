<?php

include '/xampp/htdocs/Quiz/PHP/Resources/Questions.php';

$json = file_get_contents('php://input');

$data = json_decode($json, true);

if ($data === null) {
    echo json_encode(array("error" => "Invalid JSON"));
    exit;
}

$id = $data["id"] ?? null;
$questID = $data["questID"] ?? null;

if (deleteQuestion($id)) {
    $allQuestions = getQuestions($questID);
    echo json_encode(array("message" => "Question deleted successfully", 'status' => 200, "questions" => $allQuestions));
}else{
    echo json_encode(array("error" => "Failed to Delete question", "status" => 500));
}