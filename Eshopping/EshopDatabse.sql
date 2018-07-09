-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: eshop
-- ------------------------------------------------------
-- Server version	5.5.60-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `dob` varchar(45) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `isActive` tinyint(2) DEFAULT NULL,
  `passwordHash` blob,
  `isCustomer` tinyint(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,NULL,NULL,NULL,'11/19/1990','1',1,NULL,1,'2018-07-07 02:16:41',NULL),(2,NULL,NULL,NULL,'19/1/1990','1',1,NULL,1,'2018-07-07 08:51:09',NULL),(3,NULL,NULL,NULL,'19/1/1990','1',1,NULL,1,'2018-07-07 09:06:00',NULL),(4,NULL,NULL,NULL,'11/19/1990','1',1,NULL,1,'2018-07-07 09:12:26',NULL),(5,NULL,NULL,NULL,'19/1/1990','1',1,NULL,1,'2018-07-07 09:13:30',NULL),(6,NULL,NULL,NULL,'11/19/1990','1',1,NULL,1,'2018-07-07 09:17:52',NULL),(7,NULL,NULL,NULL,'19/1/1990','1',1,NULL,1,'2018-07-07 09:39:28',NULL),(8,NULL,NULL,NULL,'11/19/1990','1',1,NULL,1,'2018-07-07 09:40:57',NULL),(9,NULL,NULL,NULL,'11/19/1990','1',1,NULL,1,'2018-07-07 09:43:23',NULL),(10,NULL,NULL,NULL,'19/1/1990','1',1,NULL,1,'2018-07-07 09:46:05',NULL),(11,NULL,NULL,NULL,'19/1/1990','1',1,NULL,1,'2018-07-07 09:51:49',NULL),(12,NULL,NULL,NULL,'19/1/1990','1',1,NULL,1,'2018-07-07 09:55:17',NULL),(13,NULL,NULL,NULL,'19/1/1990','1',1,NULL,1,'2018-07-07 09:56:57',NULL),(14,NULL,NULL,NULL,'19/1/1990','1',1,NULL,1,'2018-07-07 09:59:43',NULL),(15,NULL,NULL,NULL,'19/1/1990','1',1,NULL,1,'2018-07-07 10:01:29',NULL),(16,NULL,NULL,NULL,'19/1/1990','1',1,NULL,1,'2018-07-07 10:34:59',NULL),(17,NULL,NULL,NULL,'19/1/1990','1',1,NULL,1,'2018-07-07 10:35:52',NULL),(18,NULL,NULL,NULL,'19/1/1990','1',1,NULL,1,'2018-07-07 11:00:41',NULL),(19,NULL,NULL,NULL,'19/1/1990','1',1,NULL,1,'2018-07-07 11:59:09',NULL),(20,NULL,NULL,NULL,'19/1/1990','1',1,NULL,1,'2018-07-07 11:59:59',NULL),(21,NULL,NULL,NULL,'19/1/1990','1',1,NULL,1,'2018-07-07 12:01:02',NULL),(22,NULL,NULL,NULL,'19/1/1990','1',1,NULL,1,'2018-07-07 12:03:34',NULL),(23,NULL,NULL,NULL,'19/1/1990','1',1,NULL,1,'2018-07-07 12:08:33',NULL),(24,NULL,NULL,NULL,'19/1/1990','1',1,NULL,1,'2018-07-07 12:09:24',NULL),(25,NULL,NULL,NULL,'11/19/1990','1',1,NULL,1,'2018-07-07 12:15:21',NULL),(26,NULL,NULL,NULL,'19/1/1990','1',1,NULL,1,'2018-07-07 12:21:29',NULL),(27,'Patimeeda','Babu','psureshbabu284@gmail.com','19/1/1990','1',1,'Ts3625wQS94ulKlla4tP.u0012tì96u001f¯-7 $OÚ#B',1,'2018-07-07 12:24:48',NULL),(28,'Suresh','Babu','SURESBABU@TEST.COM','19/1/1990','1',1,'6mWDvrZw96wuksdq5uFl.óR2F&íXÞjý',0,'2018-07-07 12:27:27',NULL),(29,'Suresh','Babu','SURESBABU12@TEST.COM','19/1/1990','1',1,'M8QE8ElyuVjH6dONzyNq.ðÉZ¸³Y8¢ÑÁj$H',0,'2018-07-07 12:37:48',NULL),(30,'Suresh','Babu','SURESBABU@TEST.COM1','19/1/1990','1',1,'pDU2AjpUY7mzzIv4mtFU.*«L6Ñ+ã`vGW?-hc',0,'2018-07-07 12:44:58',NULL),(31,'Suresh','Babu','SURESBABU13@TEST.COM','19/1/1990','1',1,'dCA0uBBuXzEOxkVqLtQo.Þ?®åqûnw;\n\"',0,'2018-07-07 12:45:25',NULL),(32,'Suresh','Babu','itpurchasing@111.com','19/1/1990','1',1,'82OT2MK4PzuSnKFUn0Yk.bÏXû¶öd¿jÞe?:m',0,'2018-07-07 12:46:11',NULL),(33,'Suresh','Babu','SURESBABU14@TEST.COM','19/1/1990','1',1,'BZGvUFKzhNWMupmITUag.(o9\Z{dÃùSý/4·Y',0,'2018-07-07 12:47:18',NULL),(34,'Suresh','Babu','SURESBABU123@TEST.COM','19/1/1990','1',1,'OX5GZUL5OYE1Qai9dkcc.x:®_Üà³ßÆ\\]:´$',0,'2018-07-07 12:49:39',NULL),(35,'Suresh','BABU','SURESBABU1234@TEST.COM','19/1/1990','1',1,'r4IuAXdcD49IM7mnWZVI.{)Õæ½1é¯`(â',0,'2018-07-07 12:52:59',NULL),(36,'Suresh','BABU','SURESBABU34@TEST.COM','19/1/1990','1',1,'cfzUi89Uyj4CR7oUduRu.aÌÓYnú_ÝáS¥8ë¹',0,'2018-07-07 12:54:10',NULL),(37,'Suresh','Babu','SURESBABU98@TEST.COM','19/1/1990','1',1,'JnbZrcHZbWkys4uS4RSS.ÓèXæÑ*§î5ØÂç¾',0,'2018-07-07 13:02:53',NULL),(38,'Suresh','Babu','SURESBqABU@TEST.COM','19/1/1990','1',1,'MOc3AogN0n27XxKKFUub.³hÝ÷ßI,HÅühÐr.',0,'2018-07-07 13:31:45',NULL),(39,'Suresh','Babu','psureshbabu24@gmail.com','19/1/1990','1',1,'PKWqAgAzpqWz9gJoPuns.èÕ¶÷­¸ì\0¡ä<~§',0,'2018-07-07 13:34:32',NULL),(40,'Suresh','Babu','psureshbabu284@gmail.com','19/1/1990','1',1,'B9ZP2OvGYCGI81Yf9tAV.#¦MÇÛzsS{SìYûR^Ûï',0,'2018-07-07 14:00:28',NULL),(41,'suresh1','patimeeda','suresh12@gmail.com','11/19/1990','1',1,'oLlB9PGKVO99DLiYuntf.Ì]]<¤üÁ¡9Çj-í',0,'2018-07-07 14:04:58',NULL),(42,'sureshp','patimeedas','sureshbabu@gmail.com','11/19/1990','1',1,'U2VxYbKh4WujkEMEIcpc.\nL¥\'§zä 3Á×f¨64',0,'2018-07-07 14:32:18',NULL),(43,'Suresh','Babu','SURES89BABU@TEST.COM','19/1/1990','1',1,'uveg30Sz5DvbLHrNHnFu.×_H¶Z¯jl¬q=ZÐÓ',0,'2018-07-07 16:20:12',NULL),(44,'Suresh','Babu','SURES87BABU@TEST.COM','19/1/1990','1',1,'gBLyUrOzoWqafmuivL9B.ë¹.±<Ä!¦¸ûk:Ï',0,'2018-07-07 16:23:01',NULL),(45,'Patimeeda','Babu','SURESBABU@TEST.COM122','19/1/1990','1',1,'tQZy3Ad056v1YRr0CJVe.ÇÜÛizÉ',0,'2018-07-07 16:28:43',NULL),(46,'Suresh','Babu','SURESBABU44@TEST.COM','19/1/1990','1',1,'vWJG4Zz1TYCRhLbJmAd7.ïaÃ¯*l¶¿$þu',0,'2018-07-07 16:35:35',NULL),(47,'Suresh','Babu','S1URESBABU@TEST.COM','19/1/1990','1',1,'qZP7XhUuemsJIlMIHUCI.þ`}ò®QÃé0Nùø\\',0,'2018-07-07 16:51:35',NULL),(48,'Suresh','Babu','psure12shbabu284@gmail.com','19/1/1990','1',1,'fpohV48JaWm7Um5MeQAq.A7®ÞÙHö|¶?×',0,'2018-07-07 16:53:30',NULL),(49,'Suresh','BABU','SURE1SBABU@TEST.COM','19/1/1990','1',1,'u1iHDb9hCcK5VKfUSJZu.SL.éÓ¾½1ÕÃk7Jú¥',0,'2018-07-07 17:55:26',NULL),(50,'Suresh','BABU','SURESBABU1233@TEST.COM','19/1/1990','1',1,'ZFx2nN61NMrBz6A7kQwl.	ø$7Dõí§B)Ö*Á',0,'2018-07-07 18:04:20',NULL),(51,'Suresh','BABU','SURESB12ABU@TEST.COM','19/1/1990','1',1,'NZpcR5gKUU0yETQiXVTQ.¤´`!äò9]1ÂUÆáô',0,'2018-07-07 18:06:30',NULL),(52,'suresh','test','testsuresh@test.com',NULL,'0',1,'cePLc2Hejj1URtcfiMUZ.<hã £*âYèÞÌ\n<',0,'2018-07-07 18:33:54',NULL),(53,'suresh11','patimeedas','sur@gmail.com','11/19/1990','1',1,'iawtq98jRGU4nMdSRV4D.´r¡{Ëæw\0pÿò5',0,'2018-07-07 18:39:28',NULL),(54,'Suresh','Babu','psureshbabu2814@gmail.com','19/1/1990','1',1,'srmHAWwX54fjrYgaGenn.BÑ0á\0 þÉ&©¿ì>Sø',0,'2018-07-07 19:32:33',NULL),(55,'Suresh','Babu','psureshbabu284@gmail.com12','19/1/1990','1',1,'mJFCpLO8otEPkya479iX.9d\\[þàµ9©&µXA\"÷¿',0,'2018-07-07 19:36:00',NULL),(56,'Suresh','Babu','SURESBABU@TEST.COM789','19/1/1990','1',1,'ZR2DuodwIdiJYjPfPknS.×ôÒx8tR\ZÂQ¨Pf',0,'2018-07-07 19:41:43',NULL),(57,'Suresh','BABU','itpurchasing@hairdirect.com2232','19/1/1990','1',1,'XfBBBuuuueqoNt45tMon.Ö%+\ZðMB® É*JuKS',0,'2018-07-07 19:43:45',NULL),(58,'Suresh','babu','psureshbabu284@gmail.com87','19/1/1990','1',1,'UtAmUoIUTOwJ9XOzeNRi.\'äÑïaM~\r©º=',0,'2018-07-07 19:54:27',NULL),(59,'Suresh','BABU','8939105949@test','19/1/1990','1',1,'SBulYHyvLJHLpvDA9uEz.¡ê\rú9éÐ ú¢n#1+Ü',0,'2018-07-07 19:59:08',NULL),(60,'test','customer','testcustomer@test.com','19/1/1990','1',1,'pguf44aigNT03hQjBGm6.Òß¥KïÈuãåÑOÈÒ3=',1,'2018-07-08 09:50:31',NULL),(61,'test','customer','testcustomer1@test.com','19/1/1990','1',1,'JKYobGJaaSvEbSmymoZF.eÚ,ß\"<$30poE',1,'2018-07-08 12:16:20',NULL),(62,'test','customer2','testcustomer2@test.com','19/1/1990','1',1,'Xp3H9IHyvrYAEQLdHArU.(åt¡¬¼#gé$½©	T_',1,'2018-07-08 12:19:44',NULL),(63,'test','customer3','testcustomer3@test.com','19/1/1990','1',1,'VQhcft2DTbZcLy5sSfqY.W©_]TJ¸¹ãæRéºO¬',0,'2018-07-08 12:23:05',NULL),(64,'test','customer4','testcustomer4@test.com','19/1/1990','1',1,'eyoNJGjJ9Mui00QvXsUA.µ#ìm/Y1QGü±È',1,'2018-07-08 12:26:29',NULL),(65,'test','vendor','testvendor5@test.com','19/1/1990','1',1,'lpXRsSv3DDADA6fLxK44.¦¼;on©&çn\rØæU',0,'2018-07-08 12:28:58',NULL),(66,'test','vendor1','testvendor1@test.com','19/1/1990','1',1,'VUrNHGZRkWkP7FCkqUNa.°¡j}NeI|ª÷¿GÏ',0,'2018-07-08 12:30:08',NULL),(67,'test','customer5','testcustomer5@test.com','19/1/1990','1',1,'qlVdC7OY0SL3JmmleuuD.ÒmõcyZ¦XçzoQá[',1,'2018-07-08 12:47:01',NULL),(68,'test','customer6','testcustomer6@test.com','19/1/1990','1',1,'dblaEjr9VsMy3McbR4YC.Øp1¡ÖFó~ÒïZðÇ¤E',1,'2018-07-08 12:50:42',NULL),(69,'test','customer','testv6@test.com','19/1/1990','1',1,'S22apXPut6Ol9eUgs7AU.â]¶^ÖóÇ\"À¾~ Ö¢',1,'2018-07-08 12:54:51',NULL),(70,'test','vendor','testvendor6@test.com',NULL,'0',1,'9obODjk2kJUpCacwrLUV.-ñtÏgBåXB¢:E',0,'2018-07-08 12:59:53',NULL),(71,'test','cut','testcut@test.com','19/1/1990','1',1,'89sum4vyKC4jxveUeO1a.3_ÝþåEÛÚUË®&µ,',0,'2018-07-08 13:36:49',NULL),(72,'test','cust','testcust@testc.com','19/1/1990','1',1,'IHvsEiVf7Y1usOmHpMVz.Ò´ñ»@©¿ðuL;Y9Ï',1,'2018-07-08 13:37:40',NULL),(73,'test','cust','testcuy@test.com','19/1/1990','1',1,'u8FI4EZhVtujugtRaRv5.%¿î#4(³µÍ%ßÈ³',1,'2018-07-08 18:17:33',NULL),(74,'test','fchek','testcheck@test.com','19/1/1990','1',1,'2uTk2ruqdat6urUnIGYg.¾íÏ\\ræJ,J¼Ð\Zô°H',1,'2018-07-08 22:23:42',NULL),(75,'test','act','testact@test.com','19/1/1990','1',1,'3jqXsDdOqifjehJLRhMk.,)ÇSpU&5oÖá',1,'2018-07-08 22:31:21',NULL),(76,'test','checkac','testcheckaqc@test.com','19/1/1990','1',1,'dYCLi9EUGIZ5fy0NfSYL.sàHÆù=Ð0º\\}µºº°Sá',1,'2018-07-08 22:50:22',NULL),(77,'test','actcheck12','testactcheck12@test.com','19/1/1990','1',1,'JgZp8tUWQXqAPcARKknS.íeÚx¼¯{bFÎw.',1,'2018-07-08 23:14:38',NULL),(78,'test','cccc','testcce@test.cvom','19/1/1990','1',1,'ImZhsVA5BJufNou9eNvq.IJ¢S}5@ì\r8¹,',1,'2018-07-09 00:19:01',NULL),(79,'test','setst','twt@test.com','19/1/1990','1',1,'db69xZOAY0tTyTcRTzll.ÎaMÝ*wMïì¿|',0,'2018-07-09 00:20:28',NULL),(80,'test','rere','testere@test.com','19/1/1990','1',1,'JxfhjWk1PupIUxV8VPdU.®¶ÙAÁèNofÑô®èF!',0,'2018-07-09 00:33:45',NULL),(81,'ttt','test','tese@test.com','19/1/1990','1',1,'qWaK5FzMMWbRRhczrS51.25!Ûå´Ü¡ìÍ£­¬ó',0,'2018-07-09 00:35:35',NULL),(82,'este','gd','esvd@tesgv.com','11/19/1990','1',1,'mzfu8L6lKIgTPvjJAOnt.°Hl«ÛÎ\r­¢Ð',1,'2018-07-09 00:36:44',NULL),(83,'dsxgd','gdxvc','vdcew@tesgt.com','19/1/1990','1',1,'mlw2wUP41D1EKTKaad7t.-Hj¤WoLâf®.aá',1,'2018-07-09 00:38:11',NULL),(84,'test','sgsdg','tersthm@tesy.com','19/1/1990','1',1,'quTiasfoMVgt4SckyFbg.`Ëß·üë,¡#,Þ',0,'2018-07-10 00:19:37',NULL),(85,'test','test','tesgse@test.com','19/1/1990','1',1,'2UwkD3BLia4AzNQQQrFU.pÎ0íP3qà°/ò¼´',1,'2018-07-10 00:33:24',NULL),(86,'etwe','gsgqw','gesgvc@test.com','19/1/1990','1',1,'6KuvzOk83gu9RxfzsXha.þjÖ¿qi{±\\Z-x',0,'2018-07-10 00:36:29',NULL);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authtokens`
--

DROP TABLE IF EXISTS `authtokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `authtokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accountId` int(11) DEFAULT NULL,
  `tokenId` varchar(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `expiredAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `accountId_idx` (`accountId`),
  CONSTRAINT `accountId` FOREIGN KEY (`accountId`) REFERENCES `accounts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authtokens`
--

LOCK TABLES `authtokens` WRITE;
/*!40000 ALTER TABLE `authtokens` DISABLE KEYS */;
INSERT INTO `authtokens` VALUES (1,5,'ea59045d-8197-11e8-b4d5-dc0ea181b02c','2018-07-07 09:13:30','2018-07-07 09:13:30'),(2,6,'86286040-8198-11e8-b4d5-dc0ea181b02c','2018-07-07 09:17:52','2018-07-07 09:17:52'),(3,7,'8ae26d26-819b-11e8-b4d5-dc0ea181b02c','2018-07-07 09:39:28','2018-07-07 09:39:28'),(4,8,'bfdbb767-819b-11e8-b4d5-dc0ea181b02c','2018-07-07 09:40:57','2018-07-07 09:40:57'),(5,9,'16b1d2de-819c-11e8-b4d5-dc0ea181b02c','2018-07-07 09:43:23','2018-07-07 09:43:23'),(6,10,'779f18a1-819c-11e8-b4d5-dc0ea181b02c','2018-07-07 09:46:05','2018-07-07 09:46:05'),(7,11,'447941a0-819d-11e8-b4d5-dc0ea181b02c','2018-07-07 09:51:49','2018-07-07 09:51:49'),(8,12,'c045c13a-819d-11e8-b4d5-dc0ea181b02c','2018-07-07 09:55:17','2018-07-07 09:55:17'),(9,13,'fbe0c296-819d-11e8-b4d5-dc0ea181b02c','2018-07-07 09:56:57','2018-07-07 09:56:57'),(10,14,'5f45d61d-819e-11e8-b4d5-dc0ea181b02c','2018-07-07 09:59:43','2018-07-07 09:59:43'),(11,15,'9e48242b-819e-11e8-b4d5-dc0ea181b02c','2018-07-07 10:01:29','2018-07-07 10:01:29'),(12,16,'4c3d1589-81a3-11e8-b4d5-dc0ea181b02c','2018-07-07 10:34:59','2018-07-07 10:34:59'),(13,17,'6bcc40a9-81a3-11e8-b4d5-dc0ea181b02c','2018-07-07 10:35:52','2018-07-07 10:35:52'),(14,18,'e36df4f9-81a6-11e8-b4d5-dc0ea181b02c','2018-07-07 11:00:41','2018-07-07 11:00:41'),(15,19,'0ea79ada-81af-11e8-b4d5-dc0ea181b02c','2018-07-07 11:59:10','2018-07-07 11:59:10'),(16,20,'2c575c29-81af-11e8-b4d5-dc0ea181b02c','2018-07-07 11:59:59','2018-07-07 11:59:59'),(17,21,'52055b86-81af-11e8-b4d5-dc0ea181b02c','2018-07-07 12:01:03','2018-07-07 12:01:03'),(18,22,'ac74c00d-81af-11e8-b4d5-dc0ea181b02c','2018-07-07 12:03:34','2018-07-07 12:03:34'),(19,23,'5ec3f2f9-81b0-11e8-b4d5-dc0ea181b02c','2018-07-07 12:08:33','2018-07-07 12:08:33'),(20,24,'7cbb0287-81b0-11e8-b4d5-dc0ea181b02c','2018-07-07 12:09:24','2018-07-07 12:09:24'),(21,25,'51cdfd82-81b1-11e8-b4d5-dc0ea181b02c','2018-07-07 12:15:21','2018-07-07 12:15:21'),(22,26,'2d49323c-81b2-11e8-b4d5-dc0ea181b02c','2018-07-07 12:21:29','2018-07-07 12:21:29'),(23,27,'a3e8b350-81b2-11e8-b4d5-dc0ea181b02c','2018-07-07 12:24:48','2018-07-07 12:24:48'),(24,28,'02783a0a-81b3-11e8-b4d5-dc0ea181b02c','2018-07-07 12:27:27','2018-07-07 12:27:27'),(25,29,'74d3aa66-81b4-11e8-b4d5-dc0ea181b02c','2018-07-07 12:37:48','2018-07-07 12:37:48'),(26,30,'74e8f30b-81b5-11e8-b4d5-dc0ea181b02c','2018-07-07 12:44:58','2018-07-07 12:44:58'),(27,31,'850e3c51-81b5-11e8-b4d5-dc0ea181b02c','2018-07-07 12:45:25','2018-07-07 12:45:25'),(28,32,'a07995f9-81b5-11e8-b4d5-dc0ea181b02c','2018-07-07 12:46:11','2018-07-07 12:46:11'),(29,33,'c849762b-81b5-11e8-b4d5-dc0ea181b02c','2018-07-07 12:47:18','2018-07-07 12:47:18'),(30,34,'1c937901-81b6-11e8-b4d5-dc0ea181b02c','2018-07-07 12:49:39','2018-07-07 12:49:39'),(31,35,'93c9cd1f-81b6-11e8-b4d5-dc0ea181b02c','2018-07-07 12:52:59','2018-07-07 12:52:59'),(32,36,'be134bd9-81b6-11e8-b4d5-dc0ea181b02c','2018-07-07 12:54:10','2018-07-07 12:54:10'),(33,37,'f5b8f537-81b7-11e8-b4d5-dc0ea181b02c','2018-07-07 13:02:53','2018-07-07 13:02:53'),(34,38,'fde2092f-81bb-11e8-b4d5-dc0ea181b02c','2018-07-07 13:31:45','2018-07-07 13:31:45'),(35,39,'61b43206-81bc-11e8-b4d5-dc0ea181b02c','2018-07-07 13:34:32','2018-07-07 13:34:32'),(36,40,'00e9b30e-81c0-11e8-b4d5-dc0ea181b02c','2018-07-07 14:00:28','2018-07-07 14:00:28'),(37,41,'a224490f-81c0-11e8-b4d5-dc0ea181b02c','2018-07-07 14:04:58','2018-07-07 14:04:58'),(38,42,'73af2f39-81c4-11e8-b4d5-dc0ea181b02c','2018-07-07 14:32:18','2018-07-07 14:32:18'),(39,43,'861989d4-81d3-11e8-b4d5-dc0ea181b02c','2018-07-07 16:20:12','2018-07-07 16:20:12'),(40,44,'eac01c13-81d3-11e8-b4d5-dc0ea181b02c','2018-07-07 16:23:01','2018-07-07 16:23:01'),(41,45,'b69f632c-81d4-11e8-b4d5-dc0ea181b02c','2018-07-07 16:28:43','2018-07-07 16:28:43'),(42,46,'acaaa7aa-81d5-11e8-b4d5-dc0ea181b02c','2018-07-07 16:35:35','2018-07-07 16:35:35'),(43,47,'e8dcb04e-81d7-11e8-b4d5-dc0ea181b02c','2018-07-07 16:51:35','2018-07-07 16:51:35'),(44,48,'2d42ac2a-81d8-11e8-b4d5-dc0ea181b02c','2018-07-07 16:53:30','2018-07-07 16:53:30'),(45,49,'d4452f46-81e0-11e8-b4d5-dc0ea181b02c','2018-07-07 17:55:26','2018-07-07 17:55:26'),(46,50,'1279de43-81e2-11e8-b4d5-dc0ea181b02c','2018-07-07 18:04:20','2018-07-07 18:04:20'),(47,51,'5fb39487-81e2-11e8-b4d5-dc0ea181b02c','2018-07-07 18:06:30','2018-07-07 18:06:30'),(48,52,'33cd4ae3-81e6-11e8-b4d5-dc0ea181b02c','2018-07-07 18:33:54','2018-07-07 18:33:54'),(49,53,'fa8c97cd-81e6-11e8-b4d5-dc0ea181b02c','2018-07-07 18:39:28','2018-07-07 18:39:28'),(50,54,'6532b538-81ee-11e8-b93a-dc0ea181b02c','2018-07-07 19:32:33','2018-07-07 19:32:33'),(51,55,'e07e4350-81ee-11e8-b93a-dc0ea181b02c','2018-07-10 00:32:02','2018-07-10 00:32:02'),(52,56,'acd37d06-81ef-11e8-b93a-dc0ea181b02c','2018-07-07 19:41:43','2018-07-07 19:41:43'),(53,57,'f6022c24-81ef-11e8-b93a-dc0ea181b02c','2018-07-08 09:50:52','2018-07-08 09:50:52'),(54,58,'74a82c41-81f1-11e8-b93a-dc0ea181b02c','2018-07-07 19:54:27','2018-07-07 19:54:27'),(55,59,'1c1dca92-81f2-11e8-b93a-dc0ea181b02c','2018-07-07 19:59:08','2018-07-07 19:59:08'),(56,NULL,'f22e9a8d-8260-11e8-b93a-dc0ea181b02c','2018-07-08 09:08:01','2018-07-08 09:08:01'),(57,60,'e236d677-8266-11e8-b93a-dc0ea181b02c','2018-07-08 22:18:07','2018-07-08 22:18:07'),(58,61,'41679479-827b-11e8-b93a-dc0ea181b02c','2018-07-08 12:18:49','2018-07-08 12:18:49'),(59,62,'bae83433-827b-11e8-b93a-dc0ea181b02c','2018-07-08 12:19:44','2018-07-08 12:19:44'),(60,63,'32a47fdd-827c-11e8-b93a-dc0ea181b02c','2018-07-08 12:23:05','2018-07-08 12:23:05'),(61,64,'ac3e06c5-827c-11e8-b93a-dc0ea181b02c','2018-07-08 12:26:29','2018-07-08 12:26:29'),(62,65,'053d9b07-827d-11e8-b93a-dc0ea181b02c','2018-07-08 12:28:58','2018-07-08 12:28:58'),(63,66,'2ec70769-827d-11e8-b93a-dc0ea181b02c','2018-07-08 12:30:08','2018-07-08 12:30:08'),(64,NULL,'3ab81503-827d-11e8-b93a-dc0ea181b02c','2018-07-08 12:30:28','2018-07-08 12:30:28'),(65,NULL,'3c333789-827d-11e8-b93a-dc0ea181b02c','2018-07-08 12:30:31','2018-07-08 12:30:31'),(66,NULL,'3cc87563-827d-11e8-b93a-dc0ea181b02c','2018-07-08 12:30:32','2018-07-08 12:30:32'),(67,NULL,'3df5209a-827d-11e8-b93a-dc0ea181b02c','2018-07-08 12:30:34','2018-07-08 12:30:34'),(68,NULL,'3e6e1979-827d-11e8-b93a-dc0ea181b02c','2018-07-08 12:30:34','2018-07-08 12:30:34'),(69,NULL,'3e8ab971-827d-11e8-b93a-dc0ea181b02c','2018-07-08 12:30:35','2018-07-08 12:30:35'),(70,NULL,'5004c28f-827d-11e8-b93a-dc0ea181b02c','2018-07-08 12:31:04','2018-07-08 12:31:04'),(71,NULL,'ca6cc741-827d-11e8-b93a-dc0ea181b02c','2018-07-08 12:34:29','2018-07-08 12:34:29'),(72,NULL,'15da2845-827e-11e8-b93a-dc0ea181b02c','2018-07-08 12:36:36','2018-07-08 12:36:36'),(73,NULL,'690f7ec3-827e-11e8-b93a-dc0ea181b02c','2018-07-08 12:38:55','2018-07-08 12:38:55'),(74,NULL,'d1659732-827e-11e8-b93a-dc0ea181b02c','2018-07-08 12:41:50','2018-07-08 12:41:50'),(75,NULL,'e7a8efc6-827e-11e8-b93a-dc0ea181b02c','2018-07-08 12:42:28','2018-07-08 12:42:28'),(76,NULL,'275014e5-827f-11e8-b93a-dc0ea181b02c','2018-07-08 12:44:15','2018-07-08 12:44:15'),(77,67,'8a746dc4-827f-11e8-b93a-dc0ea181b02c','2018-07-08 12:47:01','2018-07-08 12:47:01'),(78,68,'0e70dd3c-8280-11e8-b93a-dc0ea181b02c','2018-07-08 12:50:42','2018-07-08 12:50:42'),(79,69,'a2995465-8280-11e8-b93a-dc0ea181b02c','2018-07-08 12:57:38','2018-07-08 12:57:38'),(80,70,'56af32db-8281-11e8-b93a-dc0ea181b02c','2018-07-08 12:59:53','2018-07-08 12:59:53'),(81,71,'7f47ead4-8286-11e8-b93a-dc0ea181b02c','2018-07-08 13:36:49','2018-07-08 13:36:49'),(82,72,'9e38b9bf-8286-11e8-b93a-dc0ea181b02c','2018-07-08 13:37:41','2018-07-08 13:37:41'),(83,73,'58cd64fe-82ae-11e8-b93a-dc0ea181b02c','2018-07-08 18:17:34','2018-07-08 18:17:34'),(84,74,'bb8e970d-82d0-11e8-b93a-dc0ea181b02c','2018-07-08 22:23:42','2018-07-08 22:23:42'),(85,75,'ccf2427e-82d1-11e8-b93a-dc0ea181b02c','2018-07-08 22:31:21','2018-07-08 22:31:21'),(86,76,'7518d75c-82d4-11e8-b93a-dc0ea181b02c','2018-07-08 22:50:22','2018-07-08 22:50:22'),(87,77,'d90f6a1a-82d7-11e8-b93a-dc0ea181b02c','2018-07-08 23:14:38','2018-07-08 23:14:38'),(88,78,'d7b36217-82e0-11e8-b93a-dc0ea181b02c','2018-07-09 00:19:01','2018-07-09 00:19:01'),(89,79,'0b673be3-82e1-11e8-b93a-dc0ea181b02c','2018-07-09 00:20:28','2018-07-09 00:20:28'),(90,80,'e6a323c7-82e2-11e8-b93a-dc0ea181b02c','2018-07-09 00:33:45','2018-07-09 00:33:45'),(91,81,'28460156-82e3-11e8-b93a-dc0ea181b02c','2018-07-09 00:35:35','2018-07-09 00:35:35'),(92,82,'5169fc09-82e3-11e8-b93a-dc0ea181b02c','2018-07-09 00:36:45','2018-07-09 00:36:45'),(93,83,'84e39155-82e3-11e8-b93a-dc0ea181b02c','2018-07-09 00:38:11','2018-07-09 00:38:11'),(94,84,'b75a6675-83aa-11e8-b93a-dc0ea181b02c','2018-07-10 00:19:37','2018-07-10 00:19:37'),(95,85,'a4bc52c3-83ac-11e8-b93a-dc0ea181b02c','2018-07-10 00:33:24','2018-07-10 00:33:24'),(96,86,'12bb33ea-83ad-11e8-b93a-dc0ea181b02c','2018-07-10 00:36:29','2018-07-10 00:36:29');
/*!40000 ALTER TABLE `authtokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prodid` int(11) DEFAULT NULL,
  `customerId` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `prodid_idx` (`prodid`),
  KEY `customerId_idx` (`customerId`),
  CONSTRAINT `customerId` FOREIGN KEY (`customerId`) REFERENCES `accounts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `prodid` FOREIGN KEY (`prodid`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (11,4,75,1),(12,4,76,2),(13,4,77,1),(14,4,78,1),(15,4,85,1);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `transId` varchar(45) DEFAULT NULL,
  `cartId` int(11) DEFAULT NULL,
  `orderConfirmed` tinyint(4) DEFAULT NULL,
  `orderRemoved` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'22222',1,0,1),(2,'22222',1,0,1),(3,'22222',1,0,1),(4,'22222',1,1,0);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productcategeories`
--

DROP TABLE IF EXISTS `productcategeories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productcategeories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categeory` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productcategeories`
--

LOCK TABLES `productcategeories` WRITE;
/*!40000 ALTER TABLE `productcategeories` DISABLE KEYS */;
INSERT INTO `productcategeories` VALUES (1,'Electronics'),(2,'Mobiles'),(3,'Laptops');
/*!40000 ALTER TABLE `productcategeories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quantity` int(11) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `prodCatId` int(11) DEFAULT NULL,
  `vendorId` int(11) DEFAULT NULL,
  `isActive` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `prodCatId_idx` (`prodCatId`),
  KEY `vendorId_idx` (`vendorId`),
  CONSTRAINT `prodCatId` FOREIGN KEY (`prodCatId`) REFERENCES `productcategeories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `vendorId` FOREIGN KEY (`vendorId`) REFERENCES `accounts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,10,10,1,55,0),(2,10,10,1,55,2),(3,0,10,1,55,1),(4,0,10,1,55,1),(5,3,10,1,55,1),(6,10,10,1,55,1),(7,10,10,1,55,1),(8,10,10,1,55,1),(9,10,10,1,55,1),(10,10,10,1,55,1),(11,10,10,1,55,1),(12,7,10,1,55,1),(13,10,10,1,55,1),(14,10,10,1,55,1),(15,10,10,1,55,1),(16,10,10,1,55,1),(17,10,10,1,55,1),(18,10,10,1,55,1),(19,10,10,1,55,1),(20,10,10,1,55,1),(21,10,10,1,55,1),(22,10,10,1,70,1),(23,10,10,1,73,1),(24,NULL,15,2,81,1),(25,NULL,12,1,86,0),(26,25,12,2,86,1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'eshop'
--

--
-- Dumping routines for database 'eshop'
--
/*!50003 DROP PROCEDURE IF EXISTS `usp_accounts_Details` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`127.0.0.1` PROCEDURE `usp_accounts_Details`(
	IN iAccountId VARCHAR(255)
    #, IN iIsCustomer TINYINT
)
BEGIN
	IF(EXISTS(SELECT COUNT(*) FROM accounts WHERE id = iAccountId)) THEN
     
        SELECT
			1 AS Success
				,act.Id
				,act.firstName
				,act.lastName
				,act.dob
				,act.gender
				,act.email
				,act.passwordHash
                ,auth.tokenId
		FROM accounts act
        JOIN authtokens auth ON (auth.accountId = act.id)
        WHERE act.id = iAccountId;  -- Success
            
	
	ELSE 
    
		SELECT 0 AS Success;  -- Failed
        
	END IF;   
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usp_accounts_insert` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`127.0.0.1` PROCEDURE `usp_accounts_insert`(
	 IN iFirstName VARCHAR(255)
	, IN iLastName VARCHAR(255)
	, IN iEmail VARCHAR(255)
    , IN iDob VARCHAR(255)
    , IN iGender VARCHAR(255)
	, IN iPasswordHash VARBINARY(255)
    , IN iIsCustomer TINYINT
)
BEGIN

DECLARE vAccountId INT;
DECLARE vTokenId VARCHAR(45);

-- Account Active or not
IF (EXISTS(SELECT * FROM accounts WHERE email = iEmail AND isActive = 1 AND isCustomer = iIsCustomer)) THEN
		
        SELECT false AS isSuccess,500 AS serviceCode, 'Email Inactive' AS serviceMessage;

-- Is Email already Registered
ELSEIF (NOT EXISTS(SELECT * FROM accounts WHERE email = iEmail AND isCustomer = iIsCustomer)) THEN

		INSERT INTO accounts (firstName, lastName, email, dob, gender, passwordHash, isActive, createdAt, isCustomer)
		VALUES(iFirstName, iLastName, iEmail, iDob, iGender, iPasswordHash, 1, NOW(), iIsCustomer); 

		SET vTokenId = UUID();
		SET vAccountId = LAST_INSERT_ID();
		-- Insert Auth Token --
        INSERT INTO `eshop`.`authtokens`
			(`accountId`,
			`tokenId`,
			`createdAt`,
			`expiredAt`)
			VALUES
			(vAccountId,
			vTokenId,
			NOW(),
			NOW());

		SELECT iEmail AS email, true AS isSuccess,200 AS serviceCode, vAccountId AS userId,vTokenId AS TokenID,'Registered successfuly' AS serviceMessage, iIsCustomer AS isCustomer;

ELSE
	SELECT false AS isSuccess,500 AS serviceCode, 'Email Already exists' AS serviceMessage;

END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usp_accounts_Select` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`127.0.0.1` PROCEDURE `usp_accounts_Select`(
	IN iEmail VARCHAR(255)
    , IN iIsCustomer TINYINT
)
BEGIN
	IF(EXISTS(SELECT COUNT(*) FROM accounts WHERE email = iEmail)) THEN
     
        SELECT
			1 AS Success
				,Id
				,firstName
				,lastName
				,dob
				,gender
				,email
				,passwordHash
		FROM accounts
        WHERE email = iEmail AND isCustomer = iIsCustomer;  -- Success
            
	
	ELSE 
    
		SELECT 0 AS Success;  -- Failed
        
	END IF;   
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usp_accounts_update` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`127.0.0.1` PROCEDURE `usp_accounts_update`(
	  IN iFirstName VARCHAR(50)
	, IN iLastName VARCHAR(50)
	, IN iOldEmail VARCHAR(255)
	, IN iNewEmail VARCHAR(255)
	, IN isPasswordChanged boolean
	, IN iPasswordHash VARBINARY(255)
    , IN iIsCustomer TINYINT
    
)
BEGIN


DECLARE isEmailExist INT;

IF(EXISTS(SELECT count(*) FROM accounts WHERE email = iOldEmail)) THEN
	
	
	IF(iOldEmail = iNewEmail) THEN
		SET isEmailExist = 0;
	ELSE
		SET isEmailExist = (SELECT count(*) FROM accounts WHERE email = iNewEmail AND isCustomer = iIsCustomer);
	END IF;
	
	
	IF(isEmailExist > 0) then

		SELECT false AS isSuccess,500 AS serviceCode, 'Email Already Registered with Eshopping' AS serviceMessage;

	ELSE

		IF(isPasswordChanged) THEN
			UPDATE `OnlineFittingKit`.`accounts`
			SET
			`firstName` = iFirstName,
			`lastName` = iLastName,
			`email` = iNewEmail,
			`passwordhash__c` = iPasswordHash,
			`updatedAt` = now()
			WHERE `email` = iOldEmail;

		ELSE	
			UPDATE `OnlineFittingKit`.`accounts`
			SET
			`firstName` = iFirstName,
			`lastName` = iLastName,
			`email` = iNewEmail,
			`updatedAt` = now()
			WHERE `email` = iOldEmail;
		END IF;

		SELECT true AS isSuccess,200 AS serviceCode, 'Account successfuly' AS serviceMessage;

	END IF;

ELSE
	SELECT false AS isSuccess,500 as serviceCode, 'Account does not exists' AS serviceMessage;

END IF;
	
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usp_authtokens_insert` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_authtokens_insert`(
	IN iEmail varchar(255)
    , IN iPassword VARBINARY(255)
    , iDeviceName VARCHAR(50)
    , iIPAddress VARCHAR(45)
)
BEGIN

DECLARE VUserID INT(11);
DECLARE VCreatedBy varchar(102);
DECLARE VTokenID VARCHAR(255);
DECLARE authInsertUpdate BOOLEAN;

SET VTokenID = UUID();

SELECT id INTO  VUserID FROM accounts WHERE email = iEmail;

IF(SELECT COUNT(*) from authtokens WHERE accountId = VUserID and ExpiredAt <= NOW()) = 1  THEN -- if expired

	UPDATE authtokens
	SET
	ExpiredAt = NOW(),
	createdAt = now()
	WHERE accountId = VUserID;
    
    SET authInsertUpdate = TRUE;

	ELSEIF(SELECT COUNT(*) from authtokens WHERE accountId = VUserID) = 0 THEN
			
		-- Insert auth details
		INSERT INTO authtokens(
			  TokenID
            , accountId
            , ExpiredAt
            , CreatedAt
		) 
		VALUES (
			VTokenID
            , VUserID
            , NOW()
            , NOW()
		);

		SET authInsertUpdate = TRUE;
	END IF;
		IF(authInsertUpdate IS TRUE) THEN
			-- get user details
			SELECT  
				1 AS isSuccess
				, Aut.accountId
				, Aut.tokenId
				, Aut.CreatedAt
				, acnt.firstName
				, acnt.lastName
				, acnt.Email
				, acnt.dob
				, acnt.gender
                , acnt.passwordHash
                , acnt.isCustomer
			FROM authtokens Aut             
			LEFT JOIN accounts acnt 
			ON Aut.accountId=acnt.id
			WHERE acnt.Email=iEmail ;
ELSE
	SELECT 0 AS Success, 'Email does not exists' As serviceMessage;
	  
    
END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usp_authtokens_Select` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`127.0.0.1` PROCEDURE `usp_authtokens_Select`(
	IN iAccountId INT(11)
    , IN iAuthtoken VARCHAR(50)
    , IN iDeviceName VARCHAR(50)
    , IN iTime INT(11) -- in minutes
    , iIPAddress VARCHAR(45)
)
BEGIN
SET SQL_SAFE_UPDATES = 0;
	#IF (SELECT COUNT(*) from authtokens WHERE accountId = iAccountId AND tokenId = iAuthtoken /*AND DeviceName = iDeviceName*/ AND ExpiredAt >= NOW()) > 0 THEN
    IF (SELECT COUNT(*) from authtokens limit 1) > 0 THEN
		UPDATE authtokens
		SET ExpiredAt = NOW()
		WHERE UserID = iUserid
			AND TokenID = iAuthtoken 
            AND IPAddress = iIPAddress;      
		
		SELECT 1 AS Success;
	
	ELSEIF(SELECT COUNT(*) from authtokens WHERE tokenId = iAuthtoken) > 0 THEN

		UPDATE authtokens
		SET ExpiredAt = NOW()
		WHERE TokenID = iAuthtoken 
		AND IPAddress = iIPAddress;      
		
		SELECT 1 AS Success;

	
	ELSE
    
		SELECT 0 AS Success;
        
	END IF;
	SET SQL_SAFE_UPDATES = 1;   
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usp_cart_insert` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_cart_insert`(
	IN iProdId INT
    , IN icustomerId INT
    , IN iQuantity INT
)
BEGIN

DECLARE oldQuantity INT;

SELECT quantity INTO oldQuantity FROM products WHERE id = iProdId;

INSERT INTO cart(prodid,customerId,quantity) VALUES (iProdId,icustomerId,iQuantity);

SET SQL_SAFE_UPDATES = 0;
UPDATE products SET quantity = (oldQuantity - iQuantity) WHERE id = iProdId;
 
SELECT true AS IsSuccess,200 AS serviceCode, 
		LAST_INSERT_ID() AS cartId,
        'Cart Saved Successfuly' AS serviceMessage,
       
        iProdId AS id,
        pr.price AS price,
        pr.prodCatId AS prodCatId,
        pc.categeory AS prodCategeory,
        icustomerId AS vendorId FROM products pr 
        JOIN productcategeories pc ON (pc.id= pr.prodCatId) WHERE pr.id = iProdId;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usp_customers_update` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`127.0.0.1` PROCEDURE `usp_customers_update`(
	  IN iFirstName VARCHAR(50)
	, IN iLastName VARCHAR(50)
	, IN iOldEmail VARCHAR(255)
	, IN iNewEmail VARCHAR(255)
	, IN isPasswordChanged boolean
	, IN iPasswordHash VARBINARY(255)
)
BEGIN


DECLARE isEmailExist INT;

IF(EXISTS(SELECT count(*) FROM customers WHERE email = iOldEmail)) THEN
	
	
	IF(iOldEmail = iNewEmail) THEN
		SET isEmailExist = 0;
	ELSE
		SET isEmailExist = (SELECT count(*) FROM customers WHERE email = iNewEmail AND isRepresenter = 0);
	END IF;
	
	
	IF(isEmailExist > 0) then

		SELECT false AS isSuccess,500 AS serviceCode, 'Email Already Registered with Eshopping' AS serviceMessage;

	ELSE

		IF(isPasswordChanged) THEN
			UPDATE `OnlineFittingKit`.`customers`
			SET
			`firstName` = iFirstName,
			`lastName` = iLastName,
			`email` = iNewEmail,
			`passwordhash__c` = iPasswordHash,
			`updatedAt` = now()
			WHERE `email` = iOldEmail;

		ELSE	
			UPDATE `OnlineFittingKit`.`customers`
			SET
			`firstName` = iFirstName,
			`lastName` = iLastName,
			`email` = iNewEmail,
			`updatedAt` = now()
			WHERE `email` = iOldEmail;
		END IF;

		SELECT true AS isSuccess,200 AS serviceCode, 'Updated successfuly' AS serviceMessage;

	END IF;

ELSE
	SELECT false AS isSuccess,500 as serviceCode, 'User does not exists' AS serviceMessage;

END IF;
	
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usp_order_delete` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_order_delete`(
	 IN iId INT
     , IN iIsOrderRemoved INT
)
BEGIN

IF (EXISTS(SELECT id FROM products WHERE id = iId)) THEN
SET SQL_SAFE_UPDATES = 0;
	IF(iIsOrderRemoved = 0) THEN 
		UPDATE orders SET  orderConfirmed = 1,orderRemoved=0 WHERE id = iId;
	ELSE
		UPDATE orders SET  orderConfirmed = 0, orderRemoved = 1 WHERE id = iId;
	END IF;
    SELECT 1 AS IsSuccess, 'Order Updated Successfully' AS serviceMessage;
ELSE
	SELECT 0 AS IsSuccess, 'Not Able to Updated Order' AS serviceMessage;
END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usp_order_Details` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`127.0.0.1` PROCEDURE `usp_order_Details`(
	IN iAccountId VARCHAR(255)
)
BEGIN
	IF(NOT EXISTS(SELECT COUNT(*) FROM cart JOIN orders ord ON (cart.customerId = ord.cartId) WHERE customerId = iAccountId)) THEN
     
         
		SELECT true AS IsSuccess,200 AS serviceCode, 
			crt.prodid AS prodid,
			pr.price AS price,
            crt.id AS cartId,
			pr.prodCatId AS prodCatId,
            pr.quantity AS quantity,
            ord.orderConfirmed AS orderConfirmed,
            ord.id AS orderId,
            ord.orderRemoved AS orderRemoved,
			pc.categeory AS prodCategeory FROM  cart crt
			JOIN products pr ON (pr.id= crt.prodid)
            JOIN productcategeories pc ON (pc.id= pr.prodCatId)
            JOIN orders ord ON (ord.cartId = crt.id) WHERE  
            crt.customerId =  iAccountId  ;
	ELSE 
			SELECT true AS IsSuccess,200 AS serviceCode, 
			crt.prodid AS prodid,
			pr.price AS price,
            crt.id AS cartId,
			pr.prodCatId AS prodCatId,
            pr.quantity AS quantity,
			pc.categeory AS prodCategeory FROM  cart crt
			JOIN products pr ON (pr.id= crt.prodid)
            JOIN productcategeories pc ON (pc.id= pr.prodCatId) WHERE  
            crt.customerId =iAccountId;
        
	END IF;   
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usp_order_insert` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_order_insert`(
	IN iTransId INT
    , IN iCartid INT
)
BEGIN

INSERT INTO orders(transId, cartId, orderConfirmed) VALUES (iTransId,iCartid,1);

SET SQL_SAFE_UPDATES = 0;

SELECT true AS IsSuccess,200 AS serviceCode, 
		LAST_INSERT_ID() AS orderId,
        'Order Saved Successfuly' AS serviceMessage;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usp_products_delete` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_products_delete`(
	 IN iId INT
)
BEGIN

IF (EXISTS(SELECT id FROM products WHERE id = iId)) THEN
SET SQL_SAFE_UPDATES = 0;
	UPDATE products SET  isActive = 0 WHERE id = iId;
    SELECT 1 AS IsSuccess, 'Order Removed Successfully' AS serviceMessage;
ELSE
	SELECT 0 AS IsSuccess, 'Can not Remove Your Order' AS serviceMessage;
END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usp_products_details` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_products_details`(
	 IN iCustomerId INT
)
BEGIN

SELECT 1 AS IsSuccess,
products.id,products.quantity,products.isActive, products.price,products.prodCatId,products.vendorId,pc.categeory As prodCategeory
		FROM products JOIN productcategeories pc ON (pc.id = products.prodCatId) WHERE isActive = 1 AND products.quantity>0;
        
IF (EXISTS(SELECT id FROM cart WHERE customerId = iCustomerId)) THEN
	SELECT 1 AS IsSuccess,
		pr.id,
        pr.quantity,
        pr.isActive, 
        pr.price,
        pr.prodCatId,
        pr.vendorId,
        pc.categeory As prodCategeory
		FROM cart cr JOIN products pr ON (pr.id = cr.prodid)
        JOIN productcategeories pc ON (pc.id = pr.id) WHERE
		customerId = iCustomerId;
ELSE
	SELECT 0 AS IsSuccess;
END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usp_products_insert` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_products_insert`(
	IN quantity INT
    , IN price INT
	, IN prodCatId INT
    , IN vendorId INT
)
BEGIN

INSERT INTO products(quantity,price,prodCatId,vendorId) VALUES (quantity,price,prodCatId,vendorId);

SELECT true AS IsSuccess,200 AS serviceCode, LAST_INSERT_ID() AS prodId,'Product Saved Successfuly' AS serviceMessage;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usp_products_select` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_products_select`(
	 IN iVendorId INT
)
BEGIN

SELECT id,categeory FROM productcategeories;

IF (EXISTS(SELECT id FROM products WHERE vendorId = iVendorId)) THEN
	SELECT 1 AS IsSuccess, 
		products.id,products.quantity,products.isActive, products.price,products.prodCatId,products.vendorId,pc.categeory As prodCategeory
		FROM products 
		JOIN productcategeories pc ON (pc.Id=products.prodCatId)
		WHERE vendorId = iVendorId AND isActive = 1;
ELSE
	SELECT 0 AS IsSuccess;
END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usp_products_update` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_products_update`(
	 IN iId INT
     ,IN iQuantity INT 
     ,IN iPrice INT
     ,IN iProdCatId INT
      ,IN iIsActive INT
)
BEGIN

IF (EXISTS(SELECT id FROM products WHERE id = iId)) THEN
SET SQL_SAFE_UPDATES = 0;
	UPDATE products SET quantity = iQuantity,price = iPrice, prodCatId = iProdCatId, isActive = iIsActive
    WHERE id = iId;
    SELECT 1 AS IsSuccess, 'Product Updated Successfully' AS serviceMessage; 
ELSE
	SELECT 0 AS IsSuccess;
END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-10  0:44:52
