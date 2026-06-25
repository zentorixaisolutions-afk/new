<?php
/**
 * Gallery - Save image record
 * POST /api/gallery/save.php
 */
require_once __DIR__ . '/../config.php';
requireAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonError('Method not allowed', 405);
}

$input = getJsonInput();
$title = trim($input['title'] ?? '');
$description = trim($input['description'] ?? '');
$image_path = trim($input['image_path'] ?? '');
$sort_order = (int) ($input['sort_order'] ?? 0);

if (empty($image_path)) {
    jsonError('Image path is required.');
}

$db = getDB();

if (!empty($input['id'])) {
    $stmt = $db->prepare('UPDATE gallery SET title = :title, description = :desc, image_path = :img, sort_order = :sort WHERE id = :id');
    $stmt->execute(['title' => $title, 'desc' => $description, 'img' => $image_path, 'sort' => $sort_order, 'id' => (int) $input['id']]);
    $fetchStmt = $db->prepare('SELECT * FROM gallery WHERE id = :id');
    $fetchStmt->execute(['id' => (int) $input['id']]);
    $img = $fetchStmt->fetch();
} else {
    $stmt = $db->prepare('INSERT INTO gallery (title, description, image_path, sort_order) VALUES (:title, :desc, :img, :sort)');
    $stmt->execute(['title' => $title, 'desc' => $description, 'img' => $image_path, 'sort' => $sort_order]);
    $fetchStmt = $db->prepare('SELECT * FROM gallery WHERE id = :id');
    $fetchStmt->execute(['id' => (int) $db->lastInsertId()]);
    $img = $fetchStmt->fetch();
}

$img['id'] = (int) $img['id'];
$img['sort_order'] = (int) $img['sort_order'];

jsonSuccess($img, isset($input['id']) ? 'Image updated.' : 'Image saved.');