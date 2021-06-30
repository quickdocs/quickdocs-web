FROM nginx
COPY conf.d /etc/nginx/conf.d
COPY static /usr/share/nginx/html
