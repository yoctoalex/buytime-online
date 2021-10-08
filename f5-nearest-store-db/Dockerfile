FROM mysql:8.0.11
ENV MYSQL_ROOT_PASSWORD=password
ADD buytime_init.sql /docker-entrypoint-initdb.d
EXPOSE 3306
CMD ["mysqld", "--default-authentication-plugin=mysql_native_password"]