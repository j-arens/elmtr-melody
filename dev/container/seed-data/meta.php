<?php

$meta = [
    9900 => [
        '_wp_page_template' => 'elementor-canvas',
        '_elementor_data' => '[{"id": "c27316f","elType": "section","settings": [],"elements": [{"id": "dbd9ec6","elType": "column","settings": {"_column_size": 100},"elements": [{"id": "0d6b549","elType": "widget","settings": {},"elements": [],"widgetType": "melody-audio-player-slider"}],"isInner": false}],"isInner": false}]',
    ],
    9901 => [
        '_wp_page_template' => 'elementor-canvas',
        '_elementor_data' => '[{"id": "c27317f","elType": "section","settings": [],"elements": [{"id": "dbd9ec6","elType": "column","settings": {"_column_size": 100},"elements": [{"id": "0d6b549","elType": "widget","settings": {},"elements": [],"widgetType": "melody-audio-player-toolbar"}],"isInner": false}],"isInner": false}]',
    ],
];

foreach ($meta as $id => $kv) {
    foreach ($kv as $k => $v) {
        update_post_meta($id, $k, $v);
    }
}
