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
    wp core install \
        --url=localhost \
        --title=dev \
        --admin_user=admin \
        --admin_password=z \
        --admin_email=josh@pro.photo \
        --skip-email
}

# flush the db and install wp
fresh_wp_install () {
    wp db reset --yes
    install_wp
}
