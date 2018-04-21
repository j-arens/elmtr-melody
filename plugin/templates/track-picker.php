<div class="elementor-control-field">
    <div style="margin-top: 0" class="elementor-control-input-wrapper">
        <div class="elementor-control-media wp-core-ui">  
            <button
                style="display: flex; justify-content: center; align-items: center; width: 100%; height: 30px;"
                type="button"
                class="button"
                data-melody-tp-trigger
                data-melody-tp-trigger-action="{{{ data.controlValue.id ? 'CLEAR_TRACK' : 'SELECT_TRACK' }}}"
            >
                {{{ data.controlValue.id ? 'Clear Track' : 'Select Track' }}}
                {{{ console.log(data) }}}
            </button>
        </div>
    </div>
</div>