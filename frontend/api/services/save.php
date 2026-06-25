<?php
/**
 * Services - Create or Update service
 * POST /api/services/save.php  (id omitted or null = create, id present = update)
 */
require_once __DIR__ . '/../config.php';
requireAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonError('Method not allowed', 405);
}

$input = getJsonInput();

$title = trim($input['title'] ?? '');
$slug = trim($input['slug'] ?? '');
$description = trim($input['description'] ?? '');
$icon = trim($input['icon'] ?? '');
$image_path = trim($input['image_path'] ?? '');
$features = $input['features'] ?? [];
$sort_order = (int) ($input['sort_order'] ?? 0);
$published = isset($input['published']) ? ($input['published'] ? 1 : 0) : 1;

if (empty($title)) {
    jsonError('Title is required.');
}
if (empty($slug)) {
    $slug = strtolower(preg_replace('/[^a-z0-9]+/', '-', $title));
    $slug = trim($slug, '-');
}

$db = getDB();

// Check slug uniqueness
$checkStmt = $db->prepare('SELECT id FROM services WHERE slug = :slug' . (isset($input['id']) ? ' AND id != :id' : '') . ' LIMIT 1');
$checkParams = ['slug' => $slug];
if (isset($input['id'])) $checkParams['id'] = (int) $input['id'];
$checkStmt->execute($checkParams);
if ($checkStmt->fetch()) {
    jsonError('A service with this slug already exists.');
}

$featuresJson = !empty($features) ? json_encode($features) : '[]';

if (!empty($input['id'])) {
    // Update
    $stmt = $db->prepare('UPDATE services SET title = :title, slug = :slug, description = :desc, icon = :icon, image_path = :img, features = :feat, sort_order = :sort, published = :pub WHERE id = :id');
    $stmt->execute([
        'title' => $title, 'slug' => $slug, 'desc' => $description,
        'icon' => $icon, 'img' => $image_path, 'feat' => $featuresJson,
        'sort' => $sort_order, 'pub' => $published, 'id' => (int) $input['id'],
    ]);

    $fetchStmt = $db->prepare('SELECT * FROM services WHERE id = :id');
    $fetchStmt->execute(['id' => (int) $input['id']]);
    $service = $fetchStmt->fetch();
} else {
    // Create
    $stmt = $db->prepare('INSERT INTO services (title, slug, description, icon, image_path, features, sort_order, published) VALUES (:title, :slug, :desc, :icon, :img, :feat, :sort, :pub)');
    $stmt->execute([
        'title' => $title, 'slug' => $slug, 'desc' => $description,
        'icon' => $icon, 'img' => $image_path, 'feat' => $featuresJson,
        'sort' => $sort_order, 'pub' => $published,
    ]);

    $newId = $db->lastInsertId();
    $fetchStmt = $db->prepare('SELECT * FROM services WHERE id = :id');
    $fetchStmt->execute(['id' => (int) $newId]);
    $service = $fetchStmt->fetch();
}

$service['id'] = (int) $service['id'];
$service['published'] = (bool) $service['published'];
$service['sort_order'] = (int) $service['sort_order'];
$service['features'] = $service['features'] ? json_decode($service['features'], true) ?? [] : [];

jsonSuccess($service, isset($input['id']) ? 'Service updated.' : 'Service created.');