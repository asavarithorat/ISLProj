<?php
// api/search.php - Search products
require_once '../config.php';

if (!isset($_GET['term'])) {
    jsonResponse(['error' => 'Search term is required']);
}

$term = $_GET['term'];

try {
    // VULNERABLE TO SQL INJECTION - Using direct input in query
    $query = "SELECT * FROM products WHERE name LIKE '%$term%' OR description LIKE '%$term%'";
    $result = mysqli_query($conn, $query);
    
    if (!$result) {
        throw new Exception("Database error: " . mysqli_error($conn));
    }
    
    $products = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $products[] = $row;
    }
    
    // For demonstration purposes, include the SQL query in the response
    jsonResponse([
        'products' => $products,
        'sql_query' => "SELECT * FROM products WHERE name LIKE '%$term%' OR description LIKE '%$term%'"
    ]);
} catch (Exception $e) {
    jsonResponse(['error' => $e->getMessage()]);
}
?>
