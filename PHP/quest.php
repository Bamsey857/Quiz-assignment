<?php

include "/xampp/htdocs/Quiz/PHP/Resources/User.php";
include "/xampp/htdocs/Quiz/PHP/Resources/Questions.php";

$json = file_get_contents('php://input');

$data = json_decode($json, true);

if ($data === null) {
    echo json_encode(array("error" => "Invalid JSON"));
    exit;
}

$email = $data['email'];
$id = $data['id'];

$user = getUser($email);

if ($user) {
    $allQuestions = getQuestions($id);
    echo json_encode(array("status" => 200, "questions" => $allQuestions));
}else{
    echo json_encode(array("status" => 400, "message" => "You are not a teacher."));
}
?>
