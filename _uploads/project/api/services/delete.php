<?php
/**
 * Services - Delete
 * POST /api/services/delete.php
 * Body: { "id": 1 }
 */
require_once __DIR__ . '/../config.php';
requireAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonError('Method not allowed', 405);
}

$input = getJsonInput();
$id = (int) ($input['id'] ?? 0);

if ($id <= 0) {
    jsonError('Valid service ID required.');
}

$db = getDB();
$stmt = $db->prepare('DELETE FROM services WHERE id = :id');
$stmt->execute(['id' => $id]);

if ($stmt->rowCount() === 0) {
    jsonError('Service not found.', 404);
}

jsonSuccess(null, 'Service deleted.');