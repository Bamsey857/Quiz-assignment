<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

include '/xampp/htdocs/Quiz/PHP/resources/User.php';

$json = file_get_contents('php://input');

$data = json_decode($json, true);
if ($data === null) {
    echo json_encode(array("error" => "Invalid JSON"));
    exit;
} else {
    $fullname = $data["fullname"] ?? null;
    $email = $data["email"] ?? null;
    $password = $data["password"] ?? null;
    $role = $data["role"] ?? null;

    if (empty($email)) {
        echo json_encode(array("error" => "Email address is empty"));
        exit;
    }


    $otp = rand(100000, 999999);

    $mail = new PHPMailer(true);

    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'samdatesha@gmail.com';
    $mail->Password = 'qqdlkycrghfebxnv';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    $mail->setFrom('samdatesha@gmail.com', 'Code Quiz');

    if (!empty($email)) {
        $mail->addAddress($email);
    } else {
        echo json_encode(array("error" => "Email address is empty"));
        exit;
    }

    $mail->isHTML(true);
    $mail->Subject = 'Verification Code for Code Quiz';
    $mail->Body = 'Your verification code is: ' . $otp;

    $user = getUser($email);

    if ($user) {
        echo json_encode(array("error" => "User already exists", "status" => 500));
        exit;
    }

    if ($mail->send()) {
        echo json_encode(array("message" => "OTP sent successfully", "status" => 200));
        session_start();
        $_SESSION['otp'] = $otp;
        $_SESSION['email'] = $email;
        $_SESSION['password'] = $password;
        $_SESSION['name'] = $fullname;
        $_SESSION['role'] = $role;
        exit();
    } else {
        echo json_encode(array("error" => "Failed to send OTP"));
    }
}
