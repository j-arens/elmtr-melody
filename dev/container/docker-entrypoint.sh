#!/bin/bash
set -euo pipefail

# configure some php ini settings
touch /usr/local/etc/php/conf.d/melody.ini

SETTINGS[0]="upload_max_filesize=100M"
SETTINGS[1]="post_max_size=100M"

for i in "${SETTINGS[@]}"; do
    echo $i >> /usr/local/etc/php/conf.d/melody.ini
done

# alias the wp command with allow-root and path args set
shopt -s expand_aliases
echo 'alias wp="/usr/local/bin/wp --allow-root --path=/var/www/html"' >> ~/.bashrc

# add functions to bashrc so they can used wherever
cat /usr/local/bin/functions.sh >> ~/.bashrc

# reload bashrc
source ~/.bashrc

# if wp isn't installed download core, setup config, and install
# if FLUSH_DB do a fresh install
if ! $(wp core is-installed); then
    prepare_wp_install
    install_wp
elif [ $FLUSH_DB ]; then
    install_wp
fi

# give the apache user access to uploads
chown -R www-data /var/www/html/wp-content/uploads

# install and activate elementor
if ! $(wp plugin is-installed elementor); then
    wp plugin install elementor --activate
fi

# insert seed data
if [ $SEED_DB ]; then
    run_seeds
fi

# restart apache and run it in the foreground so that the process doesn't exit
apachectl -D FOREGROUND

# run passed in commands
exec "$@"
