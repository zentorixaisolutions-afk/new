<?php
/**
 * Gallery - Delete image
 * POST /api/gallery/delete.php
 */
require_once __DIR__ . '/../config.php';
requireAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonError('Method not allowed', 405);
}

$input = getJsonInput();
$id = (int) ($input['id'] ?? 0);

if ($id <= 0) jsonError('Valid image ID required.');

$db = getDB();

// Get image path first to delete file
$fetch = $db->prepare('SELECT image_path FROM gallery WHERE id = :id');
$fetch->execute(['id' => $id]);
$img = $fetch->fetch();

if (!$img) jsonError('Image not found.', 404);

// Delete DB record
$stmt = $db->prepare('DELETE FROM gallery WHERE id = :id');
$stmt->execute(['id' => $id]);

// Delete file from disk
$filePath = __DIR__ . '/../' . ltrim($img['image_path'], '/');
if (file_exists($filePath)) {
    unlink($filePath);
}

jsonSuccess(null, 'Image deleted.');