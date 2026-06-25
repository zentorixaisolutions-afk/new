<?php
/**
 * Contact - Delete submission (admin)
 * POST /api/contacts/delete.php
 */
require_once __DIR__ . '/../config.php';
requireAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonError('Method not allowed', 405);
}

$input = getJsonInput();
$id = (int) ($input['id'] ?? 0);

if ($id <= 0) jsonError('Valid submission ID required.');

$db = getDB();
$stmt = $db->prepare('DELETE FROM contact_submissions WHERE id = :id');
$stmt->execute(['id' => $id]);

if ($stmt->rowCount() === 0) {
    jsonError('Submission not found.', 404);
}

jsonSuccess(null, 'Submission deleted.');