<?php
/**
 * Dashboard - Get stats
 * GET /api/dashboard.php
 */
require_once __DIR__ . '/config.php';
requireAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonError('Method not allowed', 405);
}

$db = getDB();

$totalServices = (int) $db->query('SELECT COUNT(*) FROM services')->fetchColumn();
$totalPosts = (int) $db->query('SELECT COUNT(*) FROM blog_posts')->fetchColumn();
$totalMessages = (int) $db->query('SELECT COUNT(*) FROM contact_submissions')->fetchColumn();
$unreadMessages = (int) $db->query("SELECT COUNT(*) FROM contact_submissions WHERE status = 'new'")->fetchColumn();
$totalGallery = (int) $db->query('SELECT COUNT(*) FROM gallery')->fetchColumn();

jsonSuccess([
    'totalServices' => $totalServices,
    'totalPosts' => $totalPosts,
    'totalMessages' => $totalMessages,
    'unreadMessages' => $unreadMessages,
    'totalGallery' => $totalGallery,
]);