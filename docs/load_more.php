<?php
// 获取文件夹名称
$folder = isset($_GET['folder']) ? $_GET['folder'] : '';

// 安全检查：只允许特定的文件夹名称
$allowed_folders = ['flowers', 'backlight', 'nature', 'portrait', 'city', 'arch','forest','colours','painting','withered_tree','gallery'];
if (!in_array($folder, $allowed_folders)) {
    die('Invalid folder');
}

// 设置图片路径
$image_path = "images/" . $folder . "/";

// 扫描文件夹中的所有图片
$images = [];
for ($i = 1; $i <= 100; $i++) {
    $filename = sprintf("%02d.jpg", $i); // 格式化为 01.jpg, 02.jpg, etc.
    $filepath = $image_path . $filename;
    
    if (file_exists($filepath)) {
        $images[] = $filename;
    }
}

// 美化文件夹名称
$title = ucfirst($folder);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $title; ?> Gallery</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 40px;
        }
        
        .header h1 {
            font-size: 2.5em;
            color: #333;
            margin-bottom: 10px;
        }
        
        .back-link {
            display: inline-block;
            margin-top: 10px;
            padding: 10px 20px;
            background-color: #333;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
        
        .back-link:hover {
            background-color: #555;
        }
        
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            max-width: 1400px;
            margin: 0 auto;
        }
        
        .gallery-item {
            position: relative;
            overflow: hidden;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }
        
        .gallery-item:hover {
            transform: scale(1.05);
        }
        
        .gallery-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
        
        .image-number {
            position: absolute;
            bottom: 10px;
            right: 10px;
            background-color: rgba(0,0,0,0.7);
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 14px;
        }
        
        .no-images {
            text-align: center;
            padding: 50px;
            font-size: 1.2em;
            color: #666;
        }
        
        /* Lightbox样式 */
        .lightbox {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.9);
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }
        
        .lightbox.active {
            display: flex;
        }
        
        .lightbox img {
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
        }
        
        .lightbox-close {
            position: absolute;
            top: 20px;
            right: 30px;
            font-size: 40px;
            color: white;
            cursor: pointer;
            z-index: 1001;
        }
        
        .lightbox-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            font-size: 40px;
            color: white;
            cursor: pointer;
            padding: 20px;
            user-select: none;
        }
        
        .lightbox-prev {
            left: 20px;
        }
        
        .lightbox-next {
            right: 20px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1><?php echo $title; ?> Gallery</h1>
        <p>Total Images: <?php echo count($images); ?></p>
        <a href="javascript:history.back()" class="back-link">← Back to Main Page</a>
    </div>
    
    <?php if (empty($images)): ?>
        <div class="no-images">
            <p>No images found in this gallery.</p>
        </div>
    <?php else: ?>
        <div class="gallery">
            <?php foreach ($images as $index => $image): ?>
                <div class="gallery-item" onclick="openLightbox(<?php echo $index; ?>)">
                    <img src="<?php echo $image_path . $image; ?>" alt="<?php echo $title . ' ' . $image; ?>">
                    <span class="image-number">#<?php echo $index + 1; ?></span>
                </div>
            <?php endforeach; ?>
        </div>
        
        <!-- Lightbox -->
        <div class="lightbox" id="lightbox" onclick="closeLightbox(event)">
            <span class="lightbox-close" onclick="closeLightbox(event)">&times;</span>
            <span class="lightbox-nav lightbox-prev" onclick="changeImage(-1, event)">&#10094;</span>
            <img id="lightbox-img" src="" alt="">
            <span class="lightbox-nav lightbox-next" onclick="changeImage(1, event)">&#10095;</span>
        </div>
    <?php endif; ?>
    
    <script>
        const images = <?php echo json_encode(array_map(function($img) use ($image_path) {
            return $image_path . $img;
        }, $images)); ?>;
        
        let currentIndex = 0;
        
        function openLightbox(index) {
            currentIndex = index;
            document.getElementById('lightbox-img').src = images[currentIndex];
            document.getElementById('lightbox').classList.add('active');
        }
        
        function closeLightbox(event) {
            if (event.target.id === 'lightbox' || event.target.className === 'lightbox-close') {
                document.getElementById('lightbox').classList.remove('active');
            }
        }
        
        function changeImage(direction, event) {
            event.stopPropagation();
            currentIndex += direction;
            
            if (currentIndex < 0) {
                currentIndex = images.length - 1;
            } else if (currentIndex >= images.length) {
                currentIndex = 0;
            }
            
            document.getElementById('lightbox-img').src = images[currentIndex];
        }
        
        // 键盘导航
        document.addEventListener('keydown', function(e) {
            if (document.getElementById('lightbox').classList.contains('active')) {
                if (e.key === 'ArrowLeft') {
                    changeImage(-1, e);
                } else if (e.key === 'ArrowRight') {
                    changeImage(1, e);
                } else if (e.key === 'Escape') {
                    document.getElementById('lightbox').classList.remove('active');
                }
            }
        });
    </script>
</body>
</html>
