<div id="melody__root__<?= $instance ?>">
    <div></div>
</div>
<script>
    (function($) {
        $(document).ready(function() {
            $(window).trigger({
                type: 'melody/init_app',
                config: <?= json_encode($settings) ?>,
                selector: '#melody__root__<?= $instance ?>',
            });
        });
    })(jQuery);
</script>