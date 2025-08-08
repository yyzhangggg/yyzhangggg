<?php

//read folder name
$folderName = isset($_GET['folder']) ? $_GET['folder'] : '';
$baseDir = 'images/';


//get path
$folderPath = realpath($baseDir . $folderName);
if (!$folderName || strpos($folderPath, realpath($baseDir)) !== 0) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid folder"]);
    exit;
}

//read all left image
$files = scandir($folderPath);
$images = [];

//case
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