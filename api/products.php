<?php
// api/products.php - Get all products
require_once '../config.php';

try {
    $query = "SELECT * FROM products";
    $result = mysqli_query($conn, $query);
    
    if (!$result) {
        throw new Exception("Database error: " . mysqli_error($conn));
    }
    
    $products = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $products[] = $row;
    }
    
    jsonResponse($products);
} catch (Exception $e) {
    jsonResponse(['error' => $e->getMessage()]);
}
?>
