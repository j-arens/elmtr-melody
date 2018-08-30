<?php

require_once ABSPATH . 'wp-admin/includes/image.php';

$attachments = [
    8001 => [
        'attributes' => [
            'mimetype' => 'audio/mpeg',
            'title' => 'Sunspots',
        ],
        'fs' => [
            'dir' => '/var/www/html/resources',
            'file' => 'sunspots-by-jeremy-blake.mp3',
        ],
    ],
    8002 => [
        'attributes' => [
            'mimetype' => 'image/jpeg',
            'title' => 'waves',
        ],
        'fs' => [
            'dir' => '/var/www/html/resources',
            'file' => 'waves.jpeg',
        ],
    ],
    8003 => [
        'attributes' => [
            'mimetype' => 'audio/mpeg',
            'title' => 'Exhale',
        ],
        'fs' => [
            'dir' => '/var/www/html/resources',
            'file' => 'exhale-by-jeremy-blake.mp3',
        ],
    ],
];

function generateLocations(array $attachment) {
    $uploads = wp_upload_dir(current_time('mysql'));
    $attachment['fs']['uploadDir'] = $uploads['path'];
    $attachment['attributes']['url'] = $uploads['url'] . "/{$attachment['fs']['file']}";
    return $attachment;
}

function moveFile(array $attachment) {
    $current = $attachment['fs']['dir'] . "/{$attachment['fs']['file']}";
    $new = $attachment['fs']['uploadDir'] . "/{$attachment['fs']['file']}";
    rename($current, $new);
    return $attachment;
}

function setPermissions(array $attachment) {
    $path = $attachment['fs']['uploadDir'] . "/{$attachment['fs']['file']}";
    $stat = stat(dirname($path));
    $perms = $stat['mode'] & 0000666;
    chmod($path, $perms);
    return $attachment;
}

function insertAttachment(array $attachment) {
    wp_delete_attachment($attachment['id'], true);
    wp_insert_post([
        'import_id' => $attachment['id'],
        'guid' => $attachment['attributes']['url'],
        'file' => $attachment['fs']['uploadDir'] . "/{$attachment['fs']['file']}",
        'post_mime_type' => $attachment['attributes']['mimetype'],
        'post_parent' => 0,
        'post_title' => $attachment['attributes']['title'],
        'post_content' => $attachment['attributes']['title'],
        'post_type' => 'attachment',
        'post_status' => 'inherit',
    ]);
    return $attachment;
}

function setMeta(array $attachment) {
    $path = $attachment['fs']['uploadDir'] . "/{$attachment['fs']['file']}";
    $meta = wp_generate_attachment_metadata($attachment['id'], $path);
    wp_update_attachment_metadata($attachment['id'], $meta);
    return $attachment;
}

function generateAttachment(array $steps, array $attachment) {
    return array_reduce($steps, function ($attachment, $step) {
        $processed = call_user_func($step, $attachment);
        return $processed;
    }, $attachment);
}

$operations = [
    'generateLocations',
    'moveFile',
    'setPermissions',
    'insertAttachment',
    'setMeta',
];

foreach ($attachments as $id => $attachment) {
    $attachment['id'] = $id;
    generateAttachment($operations, $attachment);
}
