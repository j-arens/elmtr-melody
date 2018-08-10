<?php

$pages = [
    9900 => 'slider build 1',
    9901 => 'slim build 1',
];

foreach ($pages as $id => $title) {
    wp_delete_post($id, true);
    wp_insert_post([
        'import_id' => $id,
        'post_title' => $title,
        'post_type' => 'page',
        'post_content' => '',
        'post_status' => 'publish',
    ]);
}
