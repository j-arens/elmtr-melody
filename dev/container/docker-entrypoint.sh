#!/bin/bash
set -euo pipefail

# alias the wp command with allow-root and path args set
shopt -s expand_aliases
echo 'alias wp="/usr/local/bin/wp --allow-root --path=/var/www/html"' >> ~/.bashrc

# add functions to bashrc so they can used in any process
cat /usr/local/bin/functions.sh >> ~/.bashrc

# reload bashrc
source ~/.bashrc

# if wp isn't installed download and setup config
# if FLUSH_DB do a fresh install, otherwise do a normal install
# if wp is already installed, give the option to wipe everything and start from scratch
if ! $(wp core is-installed); then
    prepare_wp_install
    if [ $FLUSH_DB ]; then
        fresh_wp_install
    else
        install_wp
    fi
else
    if [ $FLUSH_DB ]; then
        fresh_wp_install
    fi
fi


# install and activate elementor
if ! $(wp plugin is-installed elementor); then
    wp plugin install elementor --activate
fi

# restart apache and run it in the foreground so that the process doesn't exit
apachectl -D FOREGROUND

# run passed in commands
exec "$@"
















# create a page and assign the elementor canvas template
#wp --allow-root post create --post_type=page --guid=99 --post_title='slider build 1' --meta_input=["_wp_page_template":"elementor_canvas"]

# wp post update 99 --meta_input=["_wp_page_template":"elementor-canvas","_elementor_data":""]
# copy and echo??
# {"id":"c27316f","elType":"section","settings":[],"elements":[{"id":"dbd9ec6","elType":"column","settings":{"_column_size":100},"elements":[{"id":"0d6b549","elType":"widget","settings":{"section_melody_toolbar_typography_separator_text":"-"},"elements":[],"widgetType":"melody-audio-player-toolbar"}],"isInner":false}],"isInner":false}]

#wp media
#wp media import filepath or url