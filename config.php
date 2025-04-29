<?php
// config.php - Database configuration
//$db_host = "localhost";
//$db_user = "root";
//$db_pass = "asmita1$";
//$db_name = "vulnerable_shop";
$db_host = "localhost:3307";
$db_user = "root";
$db_pass = "";
$db_name = "vulnerable_shop";


// Create a connection with error reporting
$conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Enable CORS for development
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

// Helper function for sending JSON responses
function jsonResponse($data) {
    echo json_encode($data);
    exit;
}
?>