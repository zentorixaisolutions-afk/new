<?php
/**
 * Contact - Update status (admin)
 * POST /api/contacts/update-status.php
 * Body: { "id": 1, "status": "read" }
 */
require_once __DIR__ . '/../config.php';
requireAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonError('Method not allowed', 405);
}

$input = getJsonInput();
$id = (int) ($input['id'] ?? 0);
$status = trim($input['status'] ?? '');

if ($id <= 0) jsonError('Valid submission ID required.');
if (!in_array($status, ['new', 'read', 'archived'])) jsonError('Status must be: new, read, or archived.');

$db = getDB();
$stmt = $db->prepare('UPDATE contact_submissions SET status = :status WHERE id = :id');
$stmt->execute(['status' => $status, 'id' => $id]);

if ($stmt->rowCount() === 0) {
    jsonError('Submission not found.', 404);
}

jsonSuccess(null, 'Status updated.');