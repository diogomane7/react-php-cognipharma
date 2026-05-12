<?php

// ── CORS headers ─────────────────────────────────────────────────────
// Allow the React dev server on port 5173 to call this endpoint.
// In production (same domain), these headers are not needed.
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// ── Handle CORS preflight ─────────────────────────────────────────────
// Before a cross-origin POST, the browser sends an OPTIONS "preflight"
// request to ask: "is this allowed?" Respond 204 and stop.
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ── Only accept POST ──────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed. Use POST.']);
    exit;
}

// ── Parse JSON body ───────────────────────────────────────────────────
// React sends data as JSON in the request body.
// $_POST is empty for JSON payloads — use php://input instead.
$raw  = file_get_contents('php://input');
$body = json_decode($raw, true);  // true = decode as associative array

if (!is_array($body)) {
    http_response_code(400);
    echo json_encode(['error' => 'Request body must be valid JSON.']);
    exit;
}

// ── Extract and sanitise ──────────────────────────────────────────────
// trim() removes leading/trailing whitespace.
// strtolower() normalises email so 'Jane@TEST.com' == 'jane@test.com'.
$name      = isset($body['name'])      ? trim($body['name'])                         : '';
$email     = isset($body['email'])     ? trim(strtolower($body['email']))            : '';
$specialty = isset($body['specialty']) ? trim(htmlspecialchars($body['specialty'])) : '';

// ── Validate required fields ──────────────────────────────────────────
if ($name === '' || $email === '' || $specialty === '') {
    http_response_code(400);
    echo json_encode(['error' => 'All fields (name, email, specialty) are required.']);
    exit;
}

// ── Validate email format ─────────────────────────────────────────────
// filter_var with FILTER_VALIDATE_EMAIL uses PHP's built-in RFC validator.
// More reliable than writing your own regex.
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Please provide a valid email address.']);
    exit;
}

// ── Load existing registrations ───────────────────────────────────────
$dataFile      = __DIR__ . '/../data/registrations.json';
$registrations = [];

if (file_exists($dataFile)) {
    $decoded       = json_decode(file_get_contents($dataFile), true);
    $registrations = is_array($decoded) ? $decoded : [];
}

// ── Duplicate email check ─────────────────────────────────────────────
foreach ($registrations as $existing) {
    if (strtolower($existing['email']) === $email) {
        http_response_code(409);
        echo json_encode(['error' => 'This email address is already registered.']);
        exit;
    }
}

// ── Build and save the new record ─────────────────────────────────────
$registrations[] = [
    'id'           => uniqid('reg_', true),
    'name'         => $name,
    'email'        => $email,
    'specialty'    => $specialty,
    'registeredAt' => date('c'),  // ISO 8601 timestamp
];

file_put_contents($dataFile, json_encode($registrations, JSON_PRETTY_PRINT));

// ── Success response ──────────────────────────────────────────────────
http_response_code(201);
echo json_encode([
    'message' => 'Registration successful!',
    'name'    => $name,
]);