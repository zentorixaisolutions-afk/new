<?php
/**
 * Contact - Submit from public form
 * POST /api/contacts/submit.php
 */
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonError('Method not allowed', 405);
}

$input = getJsonInput();

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$phone = trim($input['phone'] ?? '');
$company = trim($input['company'] ?? '');
$service_type = trim($input['service_type'] ?? '');
$message = trim($input['message'] ?? '');

if (empty($name)) jsonError('Name is required.');
if (empty($email)) jsonError('Email is required.');
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) jsonError('Valid email required.');
if (empty($message)) jsonError('Message is required.');
if (strlen($message) > 500) jsonError('Message must be 500 characters or less.');

$db = getDB();
$stmt = $db->prepare('INSERT INTO contact_submissions (name, email, phone, company, service_type, message, status) VALUES (:name, :email, :phone, :company, :service_type, :message, :status)');
$stmt->execute([
    'name' => $name,
    'email' => $email,
    'phone' => $phone,
    'company' => $company,
    'service_type' => $service_type,
    'message' => $message,
    'status' => 'new',
]);

jsonSuccess(['id' => (int) $db->lastInsertId()], 'Message sent successfully!');