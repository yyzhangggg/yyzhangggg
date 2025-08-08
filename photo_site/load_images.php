<?php
// get diff series of folder name
$folderName = isset($_GET['folder']) ? $_GET['folder'] : '';
$baseDir = 'images/';

// safe check
$folderPath = realpath($baseDir . $folderName);
if (!$folderName || strpos($folderPath, realpath($baseDir)) !== 0) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid folder"]);
    exit;
}

//load 
$files = scandir($folderPath);
$images = [];

foreach ($files as $file) {
    if ($file !== '.' && $file !== '..') {
        $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
        if (in_array($ext, ['jpg', 'jpeg', 'png', 'gif', 'webp'])) {
            $images[] = $baseDir . $folderName . '/' . $file;
        }
    }
}

//return
header('Content-Type: application/json');
echo json_encode($images);