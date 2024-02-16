<?php

include "/xampp/htdocs/Quiz/PHP/database.php";

function getAllCourses()
{
    global $conn;
    $sql = "SELECT * FROM courses";
    $result = mysqli_query($conn, $sql);
    $courses = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $courses[] = $row;
    }
    return $courses;
}

function getCourse($id)
{
    global $conn;
    $sql = "SELECT * FROM courses WHERE teachID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $course = [];
    while ($row = $result->fetch_assoc()) {
        $course[] = $row;
    }
    $stmt->close();
    return $course;
}

function createCourse($lang, $desc, $teachID)
{
    global $conn;

    $sql = "INSERT INTO courses (lang, `desc`, teachID) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssi", $lang, $desc, $teachID);

    if ($stmt->execute()) {
        $stmt->close();
        return true;
    } else {
        $stmt->close();
        return false;
    }
}


function deleteCourse($id)
{
    global $conn;
    $sql = "DELETE FROM courses WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        $stmt->close();
        return true;
    } else {
        $stmt->close();
        return false;
    }
}

function editCourse($lang, $desc, $id)
{
    global $conn;

    $sql = "UPDATE courses SET lang = ?, `desc` = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssi", $lang, $desc, $id);

    if ($stmt->execute()) {
        $stmt->close();
        return true;
    } else {
        $stmt->close();
        return false;
    }
}