<?php

$attachments = [
    8001 => [
        'path' => '/var/www/html/resources',
        'name' => 'sunspots-by-jeremy-blake.mp3',
        'mimetype' => 'audio/mpeg',
        'title' => 'Sunspots'
    ],
];

foreach ($attachments as $id => $attachment) {
    $uploads = wp_upload_dir(current_time('mysql'));
    $filename = wp_unique_filename($uploads['path'], $attachment['name']);
    $old = $attachment['path'] . "/{$attachment['name']}";
    $new = $uploads['path'] . "/$filename";
    $url = $uploads['url'] . "/$filename";

    // rename moves files :shrug:
    rename($old, $new);

    // set permissions
    $stat = stat(dirname($new));
    $perms = $stat['mode'] & 0000666;
    chmod($new, $perms);

    wp_delete_attachment($id, true);
    wp_insert_post([
        'guid' => $url,
        'file' => $new,
        'post_mime_type' => $attachment['mimetype'],
        'post_parent' => 0,
        'post_title' => $attachment['title'],
        'post_content' => $attachment['title'],
        'post_type' => 'attachment',
        'post_status' => 'inherit',
    ]);

    $meta = wp_generate_attachment_metadata($id, $new);
    wp_update_attachment_metadata($id, $meta);
}
