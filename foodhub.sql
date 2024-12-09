# ************************************************************
# Sequel Ace SQL dump
# Version 20070
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: localhost (MySQL 11.5.2-MariaDB-ubu2404)
# Database: foodhub
# Generation Time: 2024-12-09 15:49:27 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table ingredients
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ingredients`;

CREATE TABLE `ingredients` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;

INSERT INTO `ingredients` (`id`, `name`, `email_id`)
VALUES
	(1,'cheese',1),
	(2,'chicken',1),
	(3,'chocolate',1),
	(4,'crisps',1),
	(5,'cake',1),
	(6,'cucumber',1),
	(7,'camomile',1),
	(8,'cilantro',1);

/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table recipes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `recipes`;

CREATE TABLE `recipes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `instructions` text NOT NULL,
  `prep_time` int(11) NOT NULL,
  `cook_time` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;

INSERT INTO `recipes` (`id`, `email_id`, `name`, `instructions`, `prep_time`, `cook_time`)
VALUES
	(1,1,'baps','how to make baps',1,2),
	(2,1,'crisp sandwich','how to make crips sandwich',1,2),
	(3,1,'chicken chorizo pasta','how to make chicken chorizo pasta',1,1);

/*!40000 ALTER TABLE `recipes` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table recipes_ingredient
# ------------------------------------------------------------

DROP TABLE IF EXISTS `recipes_ingredient`;

CREATE TABLE `recipes_ingredient` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `recipe_id` int(11) NOT NULL,
  `ingredient_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

LOCK TABLES `recipes_ingredient` WRITE;
/*!40000 ALTER TABLE `recipes_ingredient` DISABLE KEYS */;

INSERT INTO `recipes_ingredient` (`id`, `recipe_id`, `ingredient_id`)
VALUES
	(1,1,1),
	(2,1,7),
	(3,3,2),
	(4,3,3),
	(5,3,8);

/*!40000 ALTER TABLE `recipes_ingredient` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user_id
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_id`;

CREATE TABLE `user_id` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

LOCK TABLES `user_id` WRITE;
/*!40000 ALTER TABLE `user_id` DISABLE KEYS */;

INSERT INTO `user_id` (`id`, `email`)
VALUES
	(1,'you@me.com'),
	(2,'me@you.com');

/*!40000 ALTER TABLE `user_id` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;