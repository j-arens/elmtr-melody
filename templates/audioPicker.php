<div class="{{{ data.controlValue.id ? '' : 'elementor-hidden' }}}" data-melody-ap-reveal>
    <div style="padding-bottom: 15px" class="elementor-control-type-text elementor-label-block elementor-control-seperator-default" data-melody-ap-field="title">
        <div class="elementor-control-content">
            <div class="elementor-control-field">
                <label for="melody-ap-title-field" class="elementor-control-title">Title</label>
                <div class="elementor-control-input-wrapper">
                    <input id="melody-ap-title-field" type="text" value="{{{ data.controlValue.title }}}" />
                </div>
            </div>
        </div>
    </div>
    <div style="padding-bottom: 15px" class="elementor-control-type-text elementor-label-block elementor-control-seperator-default" data-melody-ap-field="album">
        <div class="elementor-control-content">
            <div class="elementor-control-field">
                <label for="melody-ap-album-field" class="elementor-control-title">Album</label>
                <div class="elementor-control-input-wrapper">
                    <input id="melody-ap-album-field" type="text" value="{{{ data.controlValue.album }}}" />
                </div>
            </div>
        </div>
    </div>
    <div style="padding-bottom: 15px" class="elementor-control-type-text elementor-label-block elementor-control-seperator-default" data-melody-ap-field="artist">
        <div class="elementor-control-content">
            <div class="elementor-control-field">
            <label for="melody-ap-artist-field" class="elementor-control-title">Artist</label>
            <div class="elementor-control-input-wrapper">
                <input id="melody-ap-artist-field" type="text" value="{{{ data.controlValue.artist }}}" />
            </div>
        </div>
        </div>
    </div>
    <div style="padding-bottom: 15px" class="elementor-control-type-media elementor-control-image elementor-label-block elementor-control-seperator-default" data-melody-ap-field="artist">
        <div class="elementor-control-content">
            <div class="elementor-control-field">
                <div class="elementor-control-input-wrapper">
                    <div class="elementor-control-media {{{ data.controlValue.artwork ? '' : 'media-empty' }}}">
                        <div class="elementor-control-media-upload-button" data-melody-ap-image-trigger data-melody-ap-trigger-action="ADD_IMAGE">
                            <i style="pointer-events: none" class="fa fa-plus-circle"></i>
                        </div>
                        <div class="elementor-control-media-image-area">
                            <div class="elementor-control-media-image" data-melody-ap-image-preview style="background-image: url({{ data.controlValue.artwork }});"></div>
                            <div class="elementor-control-media-delete" data-melody-ap-image-trigger data-melody-ap-trigger-action="CLEAR_IMAGE">Delete</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="elementor-control-field">
    <div style="margin-top: 0" class="elementor-control-input-wrapper">
        <div class="elementor-control-media wp-core-ui">  
            <button style="display: flex; justify-content: center; align-items: center; width: 100%; height: 30px;" type="button" class="button" data-melody-ap-track-trigger data-melody-ap-trigger-action="{{{ data.controlValue.id ? 'CLEAR_TRACK' : 'SELECT_TRACK' }}}">
                <p style="pointer-events: none">{{{ data.controlValue.id ? 'Clear' : 'Select' }}} Track</p>
            </button>
        </div>
    </div>
    <input type="hidden" data-setting="{{ data.name }}" />
    <? if (defined('MELODY_DEV') && MELODY_DEV): ?>
    <script>{{{ console.log('audio picker content template: ', data) }}}</script>
    <? endif; ?>
</div>