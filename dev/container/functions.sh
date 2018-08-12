# download wp core, create and setup config file
prepare_wp_install () {
    wp core download --version=latest --force

    wp config create \
        --dbname=${WORDPRESS_DB_NAME} \
        --dbuser=${WORDPRESS_DB_USER} \
        --dbpass=${WORDPRESS_DB_PASSWORD} \
        --dbhost=${WORDPRESS_DB_HOST} \
        --extra-php="define('WP_DEBUG', ${WP_DEBUG});"
}

# run wp install process
install_wp () {
    if [ $FLUSH_DB ]; then
        wp db reset --yes
    fi

    wp core install \
        --url=localhost:4000 \
        --title=dev \
        --admin_user=admin \
        --admin_password=z \
        --admin_email=josh@pro.photo \
        --skip-email
}

# run php seed scripts
run_seeds () {
    wp eval-file /usr/local/bin/seed-data/main.php
}
