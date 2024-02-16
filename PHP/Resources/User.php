<?php

include('/xampp/htdocs/Quiz/PHP/database.php');

function getUser($email)
{
    global $conn;
    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);

    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
    } else {
        $user = null;
    }

    $stmt->close();
    return $user;
}

function createUser($fullname, $email, $password, $role){
    global $conn;
    $sql = "INSERT INTO users (fullname, email, password, isTeach) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssi", $fullname, $email, $password, $role);
    
    if ($stmt->execute()) {
        $stmt->close();
        return true;
    } else {
        $stmt->close();
        return false;
    }
}
