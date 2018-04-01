<div id="melody-widgetRoot:<?= $instance ?>">
    <div></div>
</div>
<script>
    (function($) {
        $(document).ready(function() {
            $(window).trigger({
                type: 'melody/init_app',
                config: <?= json_encode($settings) ?>,
                id: 'melody-widgetRoot:<?= $instance ?>',
            });
        });
    })(jQuery);
</script>