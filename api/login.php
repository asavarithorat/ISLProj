<?php
// api/login.php - User login
require_once '../config.php';

// Get POST data
$_POST = json_decode(file_get_contents('php://input'), true) ?: $_POST;

if (!isset($_POST['username']) || !isset($_POST['password'])) {
    jsonResponse(['success' => false, 'message' => 'Username and password are required']);
}

$username = $_POST['username'];
$password = $_POST['password'];

try {
    // VULNERABLE TO SQL INJECTION - Using direct input in query
    
    $query = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
    //echo "Query: $query";  // Print the query

    $result = mysqli_query($conn, $query);
    
    if (!$result) {
        throw new Exception("Database error: " . mysqli_error($conn));
    }
    
    if (mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_assoc($result);
        jsonResponse([
            'success' => true,
            'username' => $user['username'],
            'sql_query' => "SELECT * FROM users WHERE username = '$username' AND password = '$password'"
        ]);
    } else {
        jsonResponse([
            'success' => false,
            'message' => 'Invalid username or password',
            'sql_query' => "SELECT * FROM users WHERE username = '$username' AND password = '$password'"
        ]);
    }
} catch (Exception $e) {
    jsonResponse(['success' => false, 'message' => $e->getMessage()]);
}
?>
