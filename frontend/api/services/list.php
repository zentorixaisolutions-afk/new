<?php
/**
 * Services - List all services
 * GET /api/services/list.php?published=0|1  (1 = published only, 0 = all)
 */
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonError('Method not allowed', 405);
}

$publishedOnly = getQueryParam('published', '1');

$db = getDB();
if ($publishedOnly === '0') {
    $stmt = $db->query('SELECT * FROM services ORDER BY sort_order ASC, id ASC');
} else {
    $stmt = $db->prepare('SELECT * FROM services WHERE published = 1 ORDER BY sort_order ASC, id ASC');
    $stmt->execute();
}

$services = $stmt->fetchAll();

// Parse features JSON
foreach ($services as &$s) {
    $s['id'] = (int) $s['id'];
    $s['published'] = (bool) $s['published'];
    $s['sort_order'] = (int) $s['sort_order'];
    $s['features'] = $s['features'] ? json_decode($s['features'], true) ?? [] : [];
}

jsonSuccess($services);