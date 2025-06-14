-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: seguros
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `beneficio`
--

DROP TABLE IF EXISTS `beneficio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `beneficio` (
  `id_beneficio` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `detalle` varchar(50) NOT NULL,
  PRIMARY KEY (`id_beneficio`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `beneficio`
--

LOCK TABLES `beneficio` WRITE;
/*!40000 ALTER TABLE `beneficio` DISABLE KEYS */;
INSERT INTO `beneficio` VALUES (1,'suba','sab');
/*!40000 ALTER TABLE `beneficio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pago_seguro`
--

DROP TABLE IF EXISTS `pago_seguro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pago_seguro` (
  `id_pago_seguro` int NOT NULL AUTO_INCREMENT,
  `id_usuario_seguro_per` int NOT NULL,
  `fecha_pago` date NOT NULL,
  `cantidad` double NOT NULL,
  `comprobante_pago` varchar(50) NOT NULL,
  PRIMARY KEY (`id_pago_seguro`),
  KEY `id_usuario_seguro_per` (`id_usuario_seguro_per`),
  CONSTRAINT `pago_seguro_ibfk_1` FOREIGN KEY (`id_usuario_seguro_per`) REFERENCES `usuario_seguro` (`id_usuario_seguro`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pago_seguro`
--

LOCK TABLES `pago_seguro` WRITE;
/*!40000 ALTER TABLE `pago_seguro` DISABLE KEYS */;
INSERT INTO `pago_seguro` VALUES (1,1,'2024-05-02',50,'50');
/*!40000 ALTER TABLE `pago_seguro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requisito`
--

DROP TABLE IF EXISTS `requisito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requisito` (
  `id_requisito` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `detalle` varchar(50) NOT NULL,
  PRIMARY KEY (`id_requisito`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requisito`
--

LOCK TABLES `requisito` WRITE;
/*!40000 ALTER TABLE `requisito` DISABLE KEYS */;
INSERT INTO `requisito` VALUES (1,'cedula','lala');
/*!40000 ALTER TABLE `requisito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requisito_seguro`
--

DROP TABLE IF EXISTS `requisito_seguro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requisito_seguro` (
  `id_requisito_seguro` int NOT NULL AUTO_INCREMENT,
  `id_usuario_seguro_per` int NOT NULL,
  `id_requisito_per` int NOT NULL,
  `informacio` varchar(50) NOT NULL,
  `validado` int NOT NULL,
  PRIMARY KEY (`id_requisito_seguro`),
  KEY `id_usuario_seguro_per` (`id_usuario_seguro_per`),
  KEY `id_requisito_per` (`id_requisito_per`),
  CONSTRAINT `requisito_seguro_ibfk_1` FOREIGN KEY (`id_usuario_seguro_per`) REFERENCES `usuario_seguro` (`id_usuario_seguro`),
  CONSTRAINT `requisito_seguro_ibfk_2` FOREIGN KEY (`id_requisito_per`) REFERENCES `requisito` (`id_requisito`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requisito_seguro`
--

LOCK TABLES `requisito_seguro` WRITE;
/*!40000 ALTER TABLE `requisito_seguro` DISABLE KEYS */;
INSERT INTO `requisito_seguro` VALUES (1,1,1,'la faya',1);
/*!40000 ALTER TABLE `requisito_seguro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seguro`
--

DROP TABLE IF EXISTS `seguro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seguro` (
  `id_seguro` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `precio` varchar(50) NOT NULL,
  `tiempo_pago` varchar(50) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `tipo` smallint NOT NULL,
  PRIMARY KEY (`id_seguro`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seguro`
--

LOCK TABLES `seguro` WRITE;
/*!40000 ALTER TABLE `seguro` DISABLE KEYS */;
INSERT INTO `seguro` VALUES (1,'vida','50','2','nonono',1),(2,'salud','20','3','ejemplo',1),(3,'bdsjadjk','3000','1','jdnj',1),(4,'99984564','35000','12','Poliza de vida',1);
/*!40000 ALTER TABLE `seguro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seguro_beneficio`
--

DROP TABLE IF EXISTS `seguro_beneficio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seguro_beneficio` (
  `id_seguro_beneficio` int NOT NULL AUTO_INCREMENT,
  `id_seguro_per` int NOT NULL,
  `id_beneficio_per` int NOT NULL,
  PRIMARY KEY (`id_seguro_beneficio`),
  KEY `id_seguro_per` (`id_seguro_per`),
  KEY `id_beneficio_per` (`id_beneficio_per`),
  CONSTRAINT `seguro_beneficio_ibfk_1` FOREIGN KEY (`id_seguro_per`) REFERENCES `seguro` (`id_seguro`),
  CONSTRAINT `seguro_beneficio_ibfk_2` FOREIGN KEY (`id_beneficio_per`) REFERENCES `beneficio` (`id_beneficio`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seguro_beneficio`
--

LOCK TABLES `seguro_beneficio` WRITE;
/*!40000 ALTER TABLE `seguro_beneficio` DISABLE KEYS */;
INSERT INTO `seguro_beneficio` VALUES (1,1,1);
/*!40000 ALTER TABLE `seguro_beneficio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seguro_requisito`
--

DROP TABLE IF EXISTS `seguro_requisito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seguro_requisito` (
  `id_seguro_requisito` int NOT NULL AUTO_INCREMENT,
  `id_seguro_per` int NOT NULL,
  `id_requisito_per` int NOT NULL,
  PRIMARY KEY (`id_seguro_requisito`),
  KEY `id_seguro_per` (`id_seguro_per`),
  KEY `id_requisito_per` (`id_requisito_per`),
  CONSTRAINT `seguro_requisito_ibfk_1` FOREIGN KEY (`id_seguro_per`) REFERENCES `seguro` (`id_seguro`),
  CONSTRAINT `seguro_requisito_ibfk_2` FOREIGN KEY (`id_requisito_per`) REFERENCES `requisito` (`id_requisito`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seguro_requisito`
--

LOCK TABLES `seguro_requisito` WRITE;
/*!40000 ALTER TABLE `seguro_requisito` DISABLE KEYS */;
INSERT INTO `seguro_requisito` VALUES (1,1,1);
/*!40000 ALTER TABLE `seguro_requisito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `correo` varchar(80) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `tipo` smallint NOT NULL,
  `activo` smallint NOT NULL,
  `cedula` varchar(10) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `rol` varchar(20) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `correo` (`correo`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `cedula` (`cedula`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'alexander@gmail.com','Alex','12345','Alexander','Toa',0,1,'1888888888','0999999999','cliente'),(5,'Alex@gmail.com','sgxhdgj','12345','sgghsgj','hjsghga',1,1,'1111111111','0000000000','Agente'),(12,'maria.lopez@example.com	','jhhhjhjhhj','111111','llll','ghghjhjh',2,1,'1155155155','9999999987','cliente'),(13,'jsjjsjsjsjsjs','ushsushhs','jsjsjsjjs','sisiwiisis','sjsjsjjsjsjs',1,1,'1234567899','1234567899','cliente');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_seguro`
--

DROP TABLE IF EXISTS `usuario_seguro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_seguro` (
  `id_usuario_seguro` int NOT NULL AUTO_INCREMENT,
  `id_usuario_per` int NOT NULL,
  `id_seguro_per` int NOT NULL,
  `fecha_contrato` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `estado` int NOT NULL,
  `estado_pago` int NOT NULL,
  PRIMARY KEY (`id_usuario_seguro`),
  KEY `id_usuario_per` (`id_usuario_per`),
  KEY `id_seguro_per` (`id_seguro_per`),
  CONSTRAINT `usuario_seguro_ibfk_1` FOREIGN KEY (`id_usuario_per`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `usuario_seguro_ibfk_2` FOREIGN KEY (`id_seguro_per`) REFERENCES `seguro` (`id_seguro`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_seguro`
--

LOCK TABLES `usuario_seguro` WRITE;
/*!40000 ALTER TABLE `usuario_seguro` DISABLE KEYS */;
INSERT INTO `usuario_seguro` VALUES (1,1,1,'2020-02-02','2020-03-02',1,20);
/*!40000 ALTER TABLE `usuario_seguro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'seguros'
--

--
-- Dumping routines for database 'seguros'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-03 23:48:52
