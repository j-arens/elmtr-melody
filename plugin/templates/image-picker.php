<div style="padding-bottom: 15px" class="elementor-control-type-media elementor-control-image elementor-label-block elementor-control-seperator-default" data-melody-ap-field="artist">
    <div class="elementor-control-content">
        <div class="elementor-control-field">
            <div class="elementor-control-input-wrapper">
                <div class="elementor-control-media {{{ data.controlValue.artwork ? '' : 'media-empty' }}}">
                    <div
                        class="elementor-control-media-upload-button"
                        data-melody-ap-image-trigger
                        data-melody-ap-trigger-action="ADD_IMAGE"
                    >
                        <i style="pointer-events: none" class="fa fa-plus-circle"></i>
                    </div>
                    <div class="elementor-control-media-image-area">
                        <div
                            class="elementor-control-media-image"
                            data-melody-ip-image-preview
                            style="background-image: url({{ data.controlValue.artwork }});">
                        </div>
                        <div
                            class="elementor-control-media-delete"
                            data-melody-ip-trigger
                            data-melody-ip-trigger-action="CLEAR_IMAGE"
                        >
                            <?= __('Delete', MELODY_TD) ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>