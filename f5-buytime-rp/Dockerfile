FROM amd64/nginx:latest
RUN mkdir -p /data/nginx/cache
RUN mkdir -p /var/cache/nginx
RUN chown nginx:nginx /var/cache/nginx
COPY ./conf.d /etc/nginx/conf.d/
COPY ./sites-enabled /etc/nginx/sites-enabled/
