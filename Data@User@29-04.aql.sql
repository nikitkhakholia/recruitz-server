-- MySQL dump 10.13  Distrib 8.0.28, for Linux (x86_64)
--
-- Host: localhost    Database: recruitz
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `login_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `login_id` (`login_id`),
  CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`login_id`) REFERENCES `login` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certificate`
--

DROP TABLE IF EXISTS `certificate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certificate` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NOT NULL,
  `credential_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cert_studId_fk_idx` (`student_id`),
  CONSTRAINT `cert_studId_fk` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificate`
--

LOCK TABLES `certificate` WRITE;
/*!40000 ALTER TABLE `certificate` DISABLE KEYS */;
INSERT INTO `certificate` VALUES (1,2,'https://s3-ap-southeast-1.amazonaws.com/learnyst/schools/2410/certificates/50332/2432116_50332.png'),(2,7,'https://miro.medium.com/max/1034/1*bSOHUQLRfP4TMpBWoLYjgw.jpeg'),(3,7,'https://miro.medium.com/max/1034/1*bSOHUQLRfP4TMpBWoLYjgw.jpeg'),(4,2,'https://i0.wp.com/www.bwcoder.in/wp-content/uploads/2021/11/assamese-to-english-translation-app.png2resize=360%2C200&ssl=1');
/*!40000 ALTER TABLE `certificate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `education`
--

DROP TABLE IF EXISTS `education`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `education` (
  `id` int NOT NULL AUTO_INCREMENT,
  `institute_name` varchar(100) NOT NULL,
  `specialization` varchar(100) NOT NULL,
  `end_date` date DEFAULT NULL,
  `grade` decimal(5,2) DEFAULT NULL,
  `degree` varchar(100) DEFAULT NULL,
  `student_id` int NOT NULL,
  `start_date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `student_id_fk_idx` (`student_id`),
  CONSTRAINT `studentId_fk` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `education`
--

LOCK TABLES `education` WRITE;
/*!40000 ALTER TABLE `education` DISABLE KEYS */;
INSERT INTO `education` VALUES (1,'Royal Global University','Applications','2020-08-17',85.00,'Bachelors\' of Computer Application',2,'2017-08-01'),(2,'Institute','SPecialization','2021-10-10',100.00,'Degree',7,'2020-10-10');
/*!40000 ALTER TABLE `education` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `encry_pass` varchar(64) NOT NULL,
  `encry_key` varchar(36) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES (17,'nikit.khakholia@mca.christuniversity.in','2c2f5d6224f7f17f765aba12d0a92dde548f3b79ec6e190b2054c28b4fb76132','086d7475-069e-443c-8180-79cd20064cbd','Nikit Khakholia'),(24,'testuser@mca.christuniversity.in','e3d0ff17042e465e8da458af079b3fcc5f84135c77b3755b01bf3e855602a8cc','49378465-023a-4967-927f-7b1404d9db9d','Nikit Khakholia');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `id` int NOT NULL AUTO_INCREMENT,
  `login_id` int DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `about` text,
  `github` varchar(255) DEFAULT NULL,
  `linkedin` varchar(255) DEFAULT NULL,
  `phone` bigint DEFAULT NULL,
  `skills` varchar(255) DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `login_id` (`login_id`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`login_id`) REFERENCES `login` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (2,17,'Java, NodeJs, ReactJs','Experienced Full Stack Engineer with a demonstrated history of working in the software industry. Skilled in Java, JavaScript. Strong engineering professional focused in development who is pursuing MCA from Christ University.','https://github.com/nikitkhakholia','https://www.linkedin.com/in/nikit-khakholia/',9864945505,'Develop MERN and SpringBoot Applications, Deploy them AWS EC2 instances, Designing and Implementing various Smart Home use cases with Internet of Things.','https://www.consensio.in/wp-content/uploads/elementor/thumbs/Nikit-ok4vqt8sx4l5z18250zsu2wa099cpcy9pk28410ou0.jpeg'),(7,24,'This is editable bio text area.','This is editable about text area.','','',NULL,'This is skills text area.',NULL);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_experience`
--

DROP TABLE IF EXISTS `work_experience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_experience` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `location` varchar(50) NOT NULL,
  `description` text,
  `student_id` int NOT NULL,
  `employment_type` varchar(50) NOT NULL,
  `company` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `work_exp_studId_fk_idx` (`student_id`),
  CONSTRAINT `work_exp_studId_fk` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_experience`
--

LOCK TABLES `work_experience` WRITE;
/*!40000 ALTER TABLE `work_experience` DISABLE KEYS */;
INSERT INTO `work_experience` VALUES (1,'Backend Developer','2020-08-17','2021-08-01','Bangalore','Design the functionality/requirement with the team, Develop apis and gsp pages based on the functionality, Write SQL queries for the functionality,  Solve existing bugs',2,'Full Time','Wonderslate Technologies'),(2,'Full Stack Developer','2021-08-01',NULL,'Remote',' ',2,'Freelance','Barkataki Company'),(3,'Role','2010-11-11',NULL,'Location','Description',7,'Intern','Company');
/*!40000 ALTER TABLE `work_experience` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-29 11:13:08
