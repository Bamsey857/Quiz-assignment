<?php

include '/xampp/htdocs/Quiz/PHP/Resources/Courses.php';

$json = file_get_contents('php://input');

$data = json_decode($json, true);

if ($data === null) {
    echo json_encode(array("error" => "Invalid JSON"));
    exit;
}

$lang = htmlspecialchars($data['lang']);
$desc = htmlspecialchars($data['desc']);
$id = $data["id"] ?? null;
$teachID = $data["teachID"] ?? null;

if (editCourse($lang, $desc, $id)) {
    $allCourses = getCourse($teachID);
    echo json_encode(array("message" => "Question deleted successfully", 'status' => 200, "course" => $allCourses));
}else{
    echo json_encode(array("error" => "Failed to Delete question", "status" => 500));
}