<?php
/**
 * Blog Posts - Delete
 * POST /api/blogs/delete.php
 */
require_once __DIR__ . '/../config.php';
requireAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonError('Method not allowed', 405);
}

$input = getJsonInput();
$id = (int) ($input['id'] ?? 0);

if ($id <= 0) {
    jsonError('Valid blog post ID required.');
}

$db = getDB();
$stmt = $db->prepare('DELETE FROM blog_posts WHERE id = :id');
$stmt->execute(['id' => $id]);

if ($stmt->rowCount() === 0) {
    jsonError('Blog post not found.', 404);
}

jsonSuccess(null, 'Blog post deleted.');