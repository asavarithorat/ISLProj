<?php
// api/register.php - User registration
require_once '../config.php';

// Get POST data
$_POST = json_decode(file_get_contents('php://input'), true) ?: $_POST;

if (!isset($_POST['username']) || !isset($_POST['password']) || !isset($_POST['email'])) {
    jsonResponse(['success' => false, 'message' => 'Username, password, and email are required']);
}

$username = $_POST['username'];
$password = $_POST['password'];
$email = $_POST['email'];

try {
    // Check if username already exists
    // VULNERABLE TO SQL INJECTION - Using direct input in query
    $check_query = "SELECT * FROM users WHERE username = '$username'";
    $check_result = mysqli_query($conn, $check_query);
    
    if (!$check_result) {
        throw new Exception("Database error: " . mysqli_error($conn));
    }
    
    if (mysqli_num_rows($check_result) > 0) {
        jsonResponse(['success' => false, 'message' => 'Username already exists']);
    }
    
    // Insert new user
    // VULNERABLE TO SQL INJECTION - Using direct input in query
    $insert_query = "INSERT INTO users (username, password, email) VALUES ('$username', '$password', '$email')";
    $insert_result = mysqli_query($conn, $insert_query);
    
    if (!$insert_result) {
        throw new Exception("Database error: " . mysqli_error($conn));
    }
    
    jsonResponse(['success' => true, 'message' => 'Registration successful']);
} catch (Exception $e) {
    jsonResponse(['success' => false, 'message' => $e->getMessage()]);
}
?>
