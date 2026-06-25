<?php
/**
 * Blog Posts - List all
 * GET /api/blogs/list.php?published=0|1
 */
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonError('Method not allowed', 405);
}

$publishedOnly = getQueryParam('published', '1');

$db = getDB();
if ($publishedOnly === '0') {
    $stmt = $db->query('SELECT * FROM blog_posts ORDER BY created_at DESC');
} else {
    $stmt = $db->prepare('SELECT * FROM blog_posts WHERE published = 1 ORDER BY created_at DESC');
    $stmt->execute();
}

$posts = $stmt->fetchAll();

foreach ($posts as &$p) {
    $p['id'] = (int) $p['id'];
    $p['published'] = (bool) $p['published'];
}

jsonSuccess($posts);