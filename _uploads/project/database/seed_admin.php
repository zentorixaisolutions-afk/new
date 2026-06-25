<?php
/**
 * SEED ADMIN USER
 * Run this ONCE to create your admin account, then DELETE this file.
 *
 * Usage: php database/seed_admin.php
 *
 * Replace the credentials below or pass them as arguments:
 *   php database/seed_admin.php "admin@example.com" "your-password" "Admin Name"
 */

$email = $argv[1] ?? 'admin@sinstech.com';
$password = $argv[2] ?? 'changeme123';
$displayName = $argv[3] ?? 'Admin';
$username = strtolower(explode('@', $email)[0]);

$hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

echo "========================================\n";
echo "  SINS Technology - Admin User Creator\n";
echo "========================================\n\n";
echo "Email:      {$email}\n";
echo "Username:   {$username}\n";
echo "Password:   {$password}\n";
echo "Hash:       {$hash}\n\n";

echo "SQL to run in phpMyAdmin or MySQL CLI:\n";
echo "----------------------------------------\n";
echo "INSERT INTO admin_users (username, email, password_hash, display_name) VALUES\n";
echo "('{$username}', '{$email}', '{$hash}', '{$displayName}');\n\n";

echo "Or run this script with cPanel's Terminal:\n";
echo "  php database/seed_admin.php\n\n";
echo "After creating the admin user, DELETE THIS FILE for security.\n";