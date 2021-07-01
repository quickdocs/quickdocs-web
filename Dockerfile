FROM nginx
ENV NGINX_PORT 80
ENV WEB_HOST quickdocs.org
ENV API_HOST api.quickdocs.org

EXPOSE $NGINX_PORT

COPY templates /etc/nginx/templates
COPY static /usr/share/nginx/html
