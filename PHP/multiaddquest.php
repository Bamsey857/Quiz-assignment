<?php

include '/xampp/htdocs/Quiz/PHP/Resources/Questions.php';

$json = file_get_contents('php://input');

$data = json_decode($json, true);

if ($data === null || !isset($data['multiQuest'])) {
    echo json_encode(array("error" => "Invalid JSON or missing 'multiQuest' key"));
    exit;
}

$multiQuest = json_decode($data['multiQuest'], true);

if ($multiQuest === null) {
    echo json_encode(array("error" => "Invalid JSON format in 'multiQuest'"));
    exit;
}

foreach ($multiQuest as $questionData) {
    $question = $questionData['question'];
    $option1 = $questionData['option1'];
    $option2 = $questionData['option2'];
    $option3 = $questionData['option3'];
    $option4 = $questionData['option4'];
    $answer = $questionData['answer'];
    $questID = $questionData['questID'];

    $success = createQuestion($question, $option1, $option2, $option3, $option4, $answer, $questID);

    if ($success) {
        echo "Question inserted successfully!<br>";
    } else {
        echo "Failed to insert question!<br>";
    }
}
?>
