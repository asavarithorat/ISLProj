<?php
// api/product.php - Get product by ID
require_once '../config.php';

// VULNERABLE TO SQL INJECTION - Using direct input in query
if (!isset($_GET['id'])) {
    jsonResponse(['error' => 'Product ID is required']);
}

$id = $_GET['id'];

try {
    // Vulnerable query - no prepared statement
    $query = "SELECT * FROM products WHERE id = $id";
    $result = mysqli_query($conn, $query);
    
    if (!$result) {
        throw new Exception("Database error: " . mysqli_error($conn));
    }
    
    $product = mysqli_fetch_assoc($result);
    
    if (!$product) {
        jsonResponse(['error' => 'Product not found']);
    }
    
    jsonResponse($product);
} catch (Exception $e) {
    jsonResponse(['error' => $e->getMessage()]);
}
?>
