<?php
/**
 * Auth Check - Verify current session
 * GET /api/auth/check.php
 */
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonError('Method not allowed', 405);
}

if (isAuthenticated()) {
    jsonSuccess(['user' => $_SESSION['admin_user']]);
} else {
    jsonError('Not authenticated.', 401);
}