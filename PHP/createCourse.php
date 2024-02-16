<?php

include "/xampp/htdocs/Quiz/PHP/Resources/User.php";
include "/xampp/htdocs/Quiz/PHP/Resources/Courses.php";

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if ($data === null) {
    echo json_encode(array("error" => "Invalid JSON"));
    exit;
}

$lang = htmlspecialchars($data['lang']);
$desc = htmlspecialchars($data['desc']);
$email = htmlspecialchars($data['email']);

$user = getUser($email);

if ($user) {
    $role = $user["isTeach"] ? "Teacher" : "Student";
    $id = $user["id"];

    if ($role === "Teacher") {
        if (createCourse($lang, $desc, $id)) {
            $course = getCourse($id);
            echo json_encode(array("success" => true, "status" => 200, "course" => $course));
        } else {
            echo json_encode(array("error" => "Failed to create course"));
        }
    } else{
        echo json_encode(array("error" => "You are not a teacher"));
    }
}else{
    echo json_encode(array("error" => "User not found"));
}