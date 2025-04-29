<?php
// debug.php - Quick check if PHP server + database are working

require_once '../config.php';

header('Content-Type: application/json');

// Check if database connection is working
if (!$conn) {
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed']);
    exit;
}

// Try a simple query
$result = mysqli_query($conn, "SHOW TABLES");

if (!$result) {
    echo json_encode(['status' => 'error', 'message' => 'Query failed: ' . mysqli_error($conn)]);
    exit;
}

// Fetch table names
$tables = [];
while ($row = mysqli_fetch_array($result)) {
    $tables[] = $row[0];
}

// Show success message
echo json_encode([
    'status' => 'success',
    'message' => 'Database connection successful!',
    'tables' => $tables
]);
?>
