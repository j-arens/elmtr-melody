<div id="melody-widgetRoot:<?= $instance ?>">
    <!-- <div>lol spinner</div> -->
</div>
<script>
    (function($) {
        $(document).ready(function() {
            window.MELODY.newInstance(
                <?= json_encode($settings) ?>,
                'melody-widgetRoot:<?= $instance ?>',
            );
        });
    })(jQuery);
</script>
<?php
    // if (defined('MELODY_DEV') && MELODY_DEV) {
    //     print '<pre>';
    //     print_r($settings);
    //     print '</pre>';
    // }
?>