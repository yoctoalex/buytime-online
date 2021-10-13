FROM mysql:8.0.26
ENV MYSQL_ROOT_PASSWORD=password
COPY buytime_init.sql /docker-entrypoint-initdb.d
EXPOSE 3306
CMD ["mysqld", "--default-authentication-plugin=mysql_native_password"]