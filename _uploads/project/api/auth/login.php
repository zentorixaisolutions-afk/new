<?php
/**
 * Admin Login
 * POST /api/auth/login.php
 * Body: { "email": "...", "password": "..." }
 */
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonError('Method not allowed', 405);
}

$input = getJsonInput();
$email = trim($input['email'] ?? '');
$password = $input['password'] ?? '';

if (empty($email) || empty($password)) {
    jsonError('Email and password are required.');
}

$db = getDB();
$stmt = $db->prepare('SELECT id, username, email, password_hash, display_name FROM admin_users WHERE email = :email LIMIT 1');
$stmt->execute(['email' => $email]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
    jsonError('Invalid email or password.', 401);
}

// Update last login
$update = $db->prepare('UPDATE admin_users SET last_login = NOW() WHERE id = :id');
$update->execute(['id' => $user['id']]);

// Set session
$_SESSION['admin_user'] = [
    'id' => $user['id'],
    'username' => $user['username'],
    'email' => $user['email'],
    'display_name' => $user['display_name'] ?? $user['username'],
];

jsonSuccess([
    'user' => $_SESSION['admin_user'],
], 'Login successful.');