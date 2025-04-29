<?php
// api/reviews.php - Get all reviews
require_once '../config.php';

try {
    $query = "SELECT * FROM reviews";
    //$query = "SELECT * FROM reviews ORDER BY created_at DESC";
    $result = mysqli_query($conn, $query);
    
    if (!$result) {
        throw new Exception("Database error: " . mysqli_error($conn));
    }
    
    $reviews = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $reviews[] = $row;
    }
    
    jsonResponse($reviews);
} catch (Exception $e) {
    jsonResponse(['error' => $e->getMessage()]);
}
?>
