# build off of php 7.1 with apache
FROM php:7.1-apache

# install and setup wp-cli
# install mysql-client because wp-cli is lol
# install php zip lib
# install php mysqli lib
RUN apt-get update && apt-get install -y \
    && curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
    && chmod +x wp-cli.phar \
    && mv wp-cli.phar /usr/local/bin/wp \
    && apt-get install -y mysql-client \
    && apt-get install -y zlib1g-dev \
    && docker-php-ext-install zip \
    && docker-php-ext-install mysqli

# copy global functions into container
COPY dev/container/functions.sh /usr/local/bin

# copy entrypoint script into container and make it executable
COPY dev/container/docker-entrypoint.sh /usr/local/bin

# make entrypoint and functions executable
RUN chmod +x /usr/local/bin/docker-entrypoint.sh /usr/local/bin/functions.sh

# run when the image starts
ENTRYPOINT ["docker-entrypoint.sh"]