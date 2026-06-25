<?php
/**
 * Services - Get single service
 * GET /api/services/get.php?id=X  OR  ?slug=xxx
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
    $stmt = $db->prepare('SELECT * FROM services WHERE id = :id LIMIT 1');
    $stmt->execute(['id' => (int) $id]);
} else {
    $stmt = $db->prepare('SELECT * FROM services WHERE slug = :slug LIMIT 1');
    $stmt->execute(['slug' => $slug]);
}

$service = $stmt->fetch();

if (!$service) {
    jsonError('Service not found.', 404);
}

$service['id'] = (int) $service['id'];
$service['published'] = (bool) $service['published'];
$service['sort_order'] = (int) $service['sort_order'];
$service['features'] = $service['features'] ? json_decode($service['features'], true) ?? [] : [];

jsonSuccess($service);