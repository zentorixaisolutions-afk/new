<?php
/**
 * Blog Posts - Get single
 * GET /api/blogs/get.php?id=X  OR  ?slug=xxx
 */
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonError('Method not allowed', 405);
}

$id = getQueryParam('id');
$slug = getQueryParam('slug');

if (!$id && !$slug) {
    jsonError('id or slug parameter required.');
}

$db = getDB();
if ($id) {
    $stmt = $db->prepare('SELECT * FROM blog_posts WHERE id = :id LIMIT 1');
    $stmt->execute(['id' => (int) $id]);
} else {
    $stmt = $db->prepare('SELECT * FROM blog_posts WHERE slug = :slug LIMIT 1');
    $stmt->execute(['slug' => $slug]);
}

$post = $stmt->fetch();

if (!$post) {
    jsonError('Blog post not found.', 404);
}

$post['id'] = (int) $post['id'];
$post['published'] = (bool) $post['published'];

jsonSuccess($post);