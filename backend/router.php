<?php
// Extract just the path from the URL (strips query strings etc.)
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Route: POST /api/register
if ($path === '/api/register') {
    require __DIR__ . '/api/register.php';
    exit;
}

// Route: GET / → show the health check page
if ($path === '/' || $path === '') {
    require __DIR__ . '/index.php';
    exit;
}

// Fallback: serve the file if it exists on disk
if (file_exists(__DIR__ . $path)) {
    return false;
}

// Nothing matched — 404
http_response_code(404);
header('Content-Type: application/json');
echo json_encode(['error' => 'Not found']);