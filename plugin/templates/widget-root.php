<div id="melody-widgetRoot:<?= $instance ?>">
    <div></div>
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