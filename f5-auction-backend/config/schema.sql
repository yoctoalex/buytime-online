drop database if exists auction_data;
create database auction_data;

create table if not exists auction_data.users(
    id bigint not null auto_increment,
    date datetime default current_timestamp,
    login varchar(32) not null,
    email varchar(255) not null,
    name varchar(255) not null,
    password varchar(255) not null,
    primary key (id)
);
create table if not exists auction_data.lots(
    id bigint not null auto_increment,
    date datetime default current_timestamp,
    auction_ends datetime not null,
    title varchar(255) not null,
    description text not null,
    userId bigint,
    primary key (id),
    foreign key (userId) references users(id)
);
create table if not exists auction_data.bids(
    id bigint not null auto_increment,
    date datetime default current_timestamp,
    amount double not null,
    lotId bigint,
    userId bigint,
    primary key (id),
    foreign key (lotId) references lots(id),
    foreign key (userId) references users(id)
);
create table if not exists auction_data.auth(
    bearer varchar(255) not null,
    date datetime default current_timestamp,
    userId bigint,
    primary key (bearer),
    foreign key (userId) references users(id)
);

