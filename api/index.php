<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

try {
    // Attempt to boot Laravel
    require __DIR__ . '/../public/index.php';
} catch (\Throwable $e) {
    // If Laravel crashes, catch it and print the raw details
    echo "<div style='font-family: sans-serif; padding: 20px; background: #ffebee; color: #c62828; border-radius: 8px;'>";
    echo "<h1>🚨 Laravel Fatal Crash Report</h1>";
    echo "<p><strong>Error:</strong> " . $e->getMessage() . "</p>";
    echo "<p><strong>File:</strong> " . $e->getFile() . " (Line " . $e->getLine() . ")</p>";
    echo "</div>";
}