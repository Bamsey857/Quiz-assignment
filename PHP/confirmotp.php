<?php

session_start();
$conOtp = $_SESSION['otp'];

include "/xampp/htdocs/Quiz/PHP/Resources/User.php";
include "/xampp/htdocs/Quiz/PHP/Resources/Courses.php";

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if ($data === null) {
    echo json_encode(array("error" => "Invalid JSON"));
    exit;
}

$otp = $data["otp"] ?? null;

if ($otp == 123456) {
    $hash = password_hash($_SESSION['password'], PASSWORD_DEFAULT);

    $user = getUser($_SESSION['email']);

    if (!$user) {
        $role = $_SESSION['role'];

        if ($role === "Teacher") {
            $isTeacher = true;
        } else {
            $isTeacher = false;
        }

        if (createUser($_SESSION['name'], $_SESSION['email'], $hash, $isTeacher)) {
            $uid = $user['id'];

            if ($isTeacher) {
                $courses = getCourse($user['id']);
            } else {
                $courses = getAllCourses();
            }

            echo json_encode(array(
                "success" => "Login successful",
                "status" => 200,
                "fullName" => $user['fullname'],
                "email" => $user['email'],
                "courses" => $courses,
                "role" => $role
            ));
        } else {
            echo json_encode(array("error" => "Error creating user", "status" => 501));
        }
    } else {
        echo json_encode(array("error" => "User already exists", "status" => 500));
    }
} else {
    echo json_encode(array("error" => "Invalid OTP", "status" => 404));
}