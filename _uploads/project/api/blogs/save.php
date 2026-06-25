<?php
/**
 * Blog Posts - Create or Update
 * POST /api/blogs/save.php
 */
require_once __DIR__ . '/../config.php';
requireAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonError('Method not allowed', 405);
}

$input = getJsonInput();

$title = trim($input['title'] ?? '');
$slug = trim($input['slug'] ?? '');
$excerpt = trim($input['excerpt'] ?? '');
$content = $input['content'] ?? '';
$category = trim($input['category'] ?? '');
$cover_image_path = trim($input['cover_image_path'] ?? '');
$author = trim($input['author'] ?? '');
$published = isset($input['published']) ? ($input['published'] ? 1 : 0) : 0;
$published_at = trim($input['published_at'] ?? '');

if (empty($title)) {
    jsonError('Title is required.');
}
if (empty($slug)) {
    $slug = strtolower(preg_replace('/[^a-z0-9]+/', '-', $title));
    $slug = trim($slug, '-');
}

$db = getDB();

// Check slug uniqueness
$checkStmt = $db->prepare('SELECT id FROM blog_posts WHERE slug = :slug' . (isset($input['id']) ? ' AND id != :id' : '') . ' LIMIT 1');
$checkParams = ['slug' => $slug];
if (isset($input['id'])) $checkParams['id'] = (int) $input['id'];
$checkStmt->execute($checkParams);
if ($checkStmt->fetch()) {
    jsonError('A blog post with this slug already exists.');
}

// If publishing now and no published_at set, use now
if ($published && empty($published_at)) {
    $published_at = date('Y-m-d H:i:s');
}

if (!empty($input['id'])) {
    $stmt = $db->prepare('UPDATE blog_posts SET title = :title, slug = :slug, excerpt = :excerpt, content = :content, category = :cat, cover_image_path = :img, author = :author, published = :pub, published_at = :pub_at WHERE id = :id');
    $stmt->execute([
        'title' => $title, 'slug' => $slug, 'excerpt' => $excerpt,
        'content' => $content, 'cat' => $category, 'img' => $cover_image_path,
        'author' => $author, 'pub' => $published,
        'pub_at' => $published_at ?: null, 'id' => (int) $input['id'],
    ]);
    $fetchStmt = $db->prepare('SELECT * FROM blog_posts WHERE id = :id');
    $fetchStmt->execute(['id' => (int) $input['id']]);
    $post = $fetchStmt->fetch();
} else {
    $stmt = $db->prepare('INSERT INTO blog_posts (title, slug, excerpt, content, category, cover_image_path, author, published, published_at) VALUES (:title, :slug, :excerpt, :content, :cat, :img, :author, :pub, :pub_at)');
    $stmt->execute([
        'title' => $title, 'slug' => $slug, 'excerpt' => $excerpt,
        'content' => $content, 'cat' => $category, 'img' => $cover_image_path,
        'author' => $author, 'pub' => $published,
        'pub_at' => $published_at ?: null,
    ]);
    $newId = $db->lastInsertId();
    $fetchStmt = $db->prepare('SELECT * FROM blog_posts WHERE id = :id');
    $fetchStmt->execute(['id' => (int) $newId]);
    $post = $fetchStmt->fetch();
}

$post['id'] = (int) $post['id'];
$post['published'] = (bool) $post['published'];

jsonSuccess($post, isset($input['id']) ? 'Blog post updated.' : 'Blog post created.');