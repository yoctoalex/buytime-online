SET @@global.sql_mode= '';

CREATE TABLE IF NOT EXISTS `images` (
	`id` VARCHAR(50) NOT NULL,
	`lotId` BIGINT(20),
	`author` VARCHAR(50) NOT NULL,
	`name` VARCHAR(50) NOT NULL,
	`contentType` VARCHAR(50) NOT NULL,
	`content` MEDIUMBLOB NOT NULL,
	UNIQUE INDEX `id` (`id`)
);