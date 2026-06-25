<?php
/**
 * SINS Technology - API Configuration
 * All database credentials are read from environment variables.
 * DO NOT hardcode passwords in this file.
 */

// ─── CORS ────────────────────────────────────────────────────
header('Access-Control-Allow-Origin: ' . ($_SERVER['HTTP_ORIGIN'] ?? '*'));
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ─── Session ─────────────────────────────────────────────────
if (session_status() === PHP_SESSION_NONE) {
    session_set_cookie_params([
        'lifetime' => 86400,
        'path' => '/',
        'domain' => '',
        'secure' => isset($_SERVER['HTTPS']),
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_start();
}

// ─── Database Connection ─────────────────────────────────────
function getDB(): PDO {
    static $pdo = null;
    if ($pdo !== null) return $pdo;

    $host = getenv('DB_HOST') ?: 'localhost';
    $port = getenv('DB_PORT') ?: '3306';
    $name = getenv('DB_NAME') ?: 'technic9_it_services';
    $user = getenv('DB_USER') ?: 'technic9_ruwan';
    $pass = getenv('DB_PASSWORD');

    if (empty($pass)) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Database password not configured.']);
        exit;
    }

    $dsn = "mysql:host={$host};port={$port};dbname={$name};charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];

    try {
        $pdo = new PDO($dsn, $user, $pass, $options);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Database connection failed.']);
        exit;
    }

    return $pdo;
}

// ─── JSON Helpers ────────────────────────────────────────────
function jsonSuccess($data = null, string $message = 'OK'): void {
    $response = ['success' => true, 'message' => $message];
    if ($data !== null) $response['data'] = $data;
    echo json_encode($response);
    exit;
}

function jsonError(string $message, int $code = 400): void {
    http_response_code($code);
    echo json_encode(['success' => false, 'message' => $message]);
    exit;
}

// ─── Auth Helpers ────────────────────────────────────────────
function requireAuth(): void {
    if (empty($_SESSION['admin_user'])) {
        jsonError('Unauthorized. Please log in.', 401);
    }
}

function isAuthenticated(): bool {
    return !empty($_SESSION['admin_user']);
}

// ─── Input Helpers ───────────────────────────────────────────
function getJsonInput(): array {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function getQueryParam(string $key, $default = null): ?string {
    return $_GET[$key] ?? $default;
}