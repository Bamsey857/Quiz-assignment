<?php
include "/xampp/htdocs/Quiz/PHP/Resources/User.php";
include "/xampp/htdocs/Quiz/PHP/Resources/Courses.php";
include "/xampp/htdocs/Quiz/PHP/Resources/Questions.php";

// $course = getCourse(1);
// print_r($course);
// $id = 5;
// $question = 'Question 1';
// $option1 = 'Option 1';
// $option2 = 'Option 2';
// $option3 = "option3";
// $option4 = "option4";
// $answer = "answer";
// $questID = 1;

$id = 12;

if (deleteQuestion($id)) {
    $allQuestions = getQuestions($questID);
    echo json_encode(array("message" => "Question deleted successfully", 'status' => 200, "questions" => $allQuestions));
}else{
    echo json_encode(array("error" => "Failed to Delete question", "status" => 500));
}


// if (createQuestion($question, $option1, $option2, $option3, $option4, $answer, $questID)) {
//     $allQuestions = getQuestions($questID);
//     echo json_encode(array("message" => "Question created successfully", 'status' => 200, "questions" => $allQuestions)); 
// }else{
//     echo json_encode(array("error" => "Failed to create question", "status" => 500));
// }


// if (createQuestion("Question 1", "Option 1", "Option 2", "Option 3", "Option 4", "Option 1", $id)) {
//     echo "Question created successfully!";
// }else{
//     echo "Failed to create question.";
// }

// $questions = getQuestions($id);
// print_r($questions);

// $user = getUser("bamsey857@gmail.com");

// $lang = "HTML5";
// $desc = "fcegefusgdsujfcsdjgsdugudgy";
// $id = $user['id'];

// $role = $user['isTeach'] ? "Teacher" : "Student";

// if ($role === "Teacher") {
//     if (createCourse($lang, $desc, $id)) {
//         echo "Course created successfully!";
//     }else{
//         echo "Failed to create course.";
//     }
// }else{
//     echo "You are not a teacher.";
// }


// $fullname = "John Doe";
// $email = "john@example.com";
// $password = password_hash("password123", PASSWORD_DEFAULT);

// if (createUser($fullname, $email, $password)) {
//     echo "User created successfully!";
// } else {
//     echo "Failed to create user.";
// }


// $user = getUser("bamsey857@gmail.com");

// $id = $user['id'];

// // $courses = getAllCourses();
// // print_r($courses);

// $course = getCourse($id);
// print_r($course);

?>
