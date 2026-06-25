<?php
/**
 * Contact Submissions - List all (admin)
 * GET /api/contacts/list.php
 */
require_once __DIR__ . '/../config.php';
requireAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonError('Method not allowed', 405);
}

$db = getDB();
$stmt = $db->query('SELECT * FROM contact_submissions ORDER BY created_at DESC');
$submissions = $stmt->fetchAll();

foreach ($submissions as &$s) {
    $s['id'] = (int) $s['id'];
}

jsonSuccess($submissions);