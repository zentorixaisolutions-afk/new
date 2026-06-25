<?php
/**
 * Gallery - List all images
 * GET /api/gallery/list.php
 */
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonError('Method not allowed', 405);
}

$db = getDB();
$stmt = $db->query('SELECT * FROM gallery ORDER BY sort_order ASC, id ASC');
$images = $stmt->fetchAll();

foreach ($images as &$img) {
    $img['id'] = (int) $img['id'];
    $img['sort_order'] = (int) $img['sort_order'];
}

jsonSuccess($images);