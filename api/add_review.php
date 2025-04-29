<?php
// api/add_review.php - Add a new review
require_once '../config.php';

// Get POST data
$_POST = json_decode(file_get_contents('php://input'), true) ?: $_POST;

if (!isset($_POST['name']) || !isset($_POST['rating']) || !isset($_POST['comment'])) {
    jsonResponse(['success' => false, 'message' => 'Name, rating, and comment are required']);
}

//$name = mysqli_real_escape_string($conn, $_POST['name']);
//$comment = mysqli_real_escape_string($conn, $_POST['comment']);
$name = $_POST['name'];
$rating = (int)$_POST['rating'];
$comment = $_POST['comment'];
$date = date('Y-m-d H:i:s');

error_log(print_r($_POST, true));
try {
    // VULNERABLE TO XSS - Not sanitizing inputs before storing in database
    // VULNERABLE TO SQL INJECTION - Using direct input in query
    $query = "INSERT INTO reviews (name, rating, comment, date) VALUES ('$name', $rating, '$comment', '$date')";
    $result = mysqli_query($conn, $query);
    
    if (!$result) {
        throw new Exception("Database error: " . mysqli_error($conn));
    }
    
    $review_id = mysqli_insert_id($conn);
    
    // Return the newly created review
    jsonResponse([
        'success' => true,
        'review' => [
            'id' => $review_id,
            'name' => $name,
            'rating' => $rating,
            'comment' => $comment,
            'date' => $date
        ]
    ]);
} catch (Exception $e) {
    jsonResponse(['success' => false, 'message' => $e->getMessage()]);
}
?>
