<?php

include "/xampp/htdocs/Quiz/PHP/Resources/User.php";
include "/xampp/htdocs/Quiz/PHP/Resources/Courses.php";


$json = file_get_contents('php://input');
$data = json_decode($json, true);

if ($data === null) {
    echo json_encode(array("error" => "Invalid JSON"));
    exit;
}

$email = $data["email"] ?? null;
$password = $data["password"] ?? null;

$user = getUser($email);

if ($user) {
    if (password_verify($password, $user['password'])) {
        $uid = $user['id'];
        $role = $user['isTeach'] ? "Teacher" : "Student";

        if ($role == "Teacher") {
            $courses = getCourse($user['id']);
            echo json_encode(array(
                "success" => "Login successful",
                "status" => 200,
                "fullName" => $user['fullname'],
                "email" => $user['email'],
                "courses" => $courses,
                "role" => $role
            ));
        } else {
            $courses = getAllCourses();
            echo json_encode(array(
                "success" => "Login successful",
                "status" => 200,
                "fullName" => $user['fullname'],
                "email" => $user['email'],
                "courses" => $courses,
                "role" => $role
            ));
        }
    } else {
        echo json_encode(array("error" => "Incorrect password", "status" => 401));
    }
} else {
    echo json_encode(array("error" => "User not found", "status" => 404));
}
