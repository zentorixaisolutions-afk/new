<?php
/**
 * Image Upload
 * POST /api/upload.php
 * Multipart form: file + folder (services | blog | gallery)
 * Uploads to: ../uploads/{folder}/
 */
require_once __DIR__ . '/../config.php';
requireAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonError('Method not allowed', 405);
}

$folder = trim($_POST['folder'] ?? 'services');
if (!in_array($folder, ['services', 'blog', 'gallery'])) {
    jsonError('Invalid folder. Must be: services, blog, or gallery.');
}

if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    $errorMsg = 'File upload failed.';
    if (isset($_FILES['file'])) {
        switch ($_FILES['file']['error']) {
            case UPLOAD_ERR_INI_SIZE:
            case UPLOAD_ERR_FORM_SIZE:
                $errorMsg = 'File is too large (max 20MB).';
                break;
            case UPLOAD_ERR_NO_FILE:
                $errorMsg = 'No file was uploaded.';
                break;
        }
    }
    jsonError($errorMsg);
}

$file = $_FILES['file'];

// Validate file type
$allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!in_array($mimeType, $allowedTypes)) {
    jsonError('Invalid file type. Allowed: JPG, PNG, GIF, WebP, SVG.');
}

// Validate file size (20MB)
$maxSize = 20 * 1024 * 1024;
if ($file['size'] > $maxSize) {
    jsonError('File too large. Maximum size is 20MB.');
}

// Create upload directory
$uploadBase = realpath(__DIR__ . '/../uploads');
if (!$uploadBase) {
    $uploadBase = __DIR__ . '/../uploads';
    if (!is_dir($uploadBase)) mkdir($uploadBase, 0755, true);
}

$targetDir = $uploadBase . '/' . $folder;
if (!is_dir($targetDir)) {
    mkdir($targetDir, 0755, true);
}

// Generate unique filename
$ext = pathinfo($file['name'], PATHINFO_EXTENSION);
$ext = strtolower($ext);
if ($ext === 'jpeg') $ext = 'jpg';
if ($ext === 'svg') $ext = 'svg';

$uniqueName = time() . '-' . bin2hex(random_bytes(8)) . '.' . $ext;
$targetPath = $targetDir . '/' . $uniqueName;

if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
    jsonError('Failed to save uploaded file.', 500);
}

// Return the relative path for storage in DB
$relativePath = '/uploads/' . $folder . '/' . $uniqueName;

jsonSuccess([
    'path' => $relativePath,
    'filename' => $uniqueName,
    'size' => $file['size'],
    'mime_type' => $mimeType,
], 'File uploaded successfully.');