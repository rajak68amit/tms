-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 29, 2023 at 06:43 PM
-- Server version: 8.0.32-0ubuntu0.22.04.2
-- PHP Version: 8.1.2-1ubuntu2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tmsdev`
--

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `id` int NOT NULL,
  `userid` int NOT NULL,
  `addressone` varchar(100) NOT NULL,
  `addresstwo` varchar(100) NOT NULL,
  `state` int NOT NULL,
  `country` int NOT NULL,
  `city` varchar(100) NOT NULL,
  `district` varchar(100) NOT NULL,
  `pincode` int NOT NULL,
  `landmark` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `isDelete` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`id`, `userid`, `addressone`, `addresstwo`, `state`, `country`, `city`, `district`, `pincode`, `landmark`, `isActive`, `createdAt`, `updatedAt`, `isDelete`) VALUES
(1, 11, 'new ashok nagar', 'new delhi', 22, 1, 'north east', 'nort east', 110096, 'school', 1, '2023-02-24 12:54:19', '2023-03-21 09:10:34', 1),
(2, 15, 'new ashok nagar', 'a block', 13, 1, 'delhi', 'south delhi', 110056, 'school', 1, '2023-02-24 12:54:19', '2023-03-21 06:20:53', 0),
(6, 17, 'new ashok nagar', 'new delhi', 22, 1, 'north east', 'nort east', 110096, 'school', 1, '2023-02-24 12:54:19', '2023-03-21 09:44:51', 1),
(5, 40, 'amit', 'amit', 21, 1, 'amit', 'amit', 111111, NULL, 1, '2023-03-20 03:50:28', '2023-03-21 09:44:24', 1),
(7, 43, 'amit', 'amit', 21, 1, 'amit', 'amit', 1111111, NULL, 1, '2023-03-20 14:17:52', '2023-03-21 09:47:02', 1);

-- --------------------------------------------------------

--
-- Table structure for table `blocks`
--

CREATE TABLE `blocks` (
  `id` int NOT NULL,
  `pid` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isDelete` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `blocks`
--

INSERT INTO `blocks` (`id`, `pid`, `name`, `isActive`, `createdAt`, `updatedAt`, `isDelete`) VALUES
(1, 1, 'TELKOI', 1, '2023-02-21 06:45:04', '2023-02-21 06:45:04', 0),
(2, 1, 'SAHARAPADA', 1, '2023-02-21 06:45:04', '2023-02-21 06:45:04', 0),
(3, 2, 'PATNA', 1, '2023-02-21 06:45:04', '2023-02-21 06:45:04', 0),
(4, 2, 'KEONJHAR', 1, '2023-02-21 06:45:04', '2023-02-21 06:45:04', 0),
(5, 2, 'JODA', 1, '2023-02-21 06:45:04', '2023-02-21 06:45:04', 0),
(6, 1, 'JHUMPURA', 1, '2023-02-21 06:45:04', '2023-02-21 06:45:04', 0),
(7, 1, 'HC PUR', 1, '2023-02-21 06:45:04', '2023-02-21 06:45:04', 0),
(8, 2, 'HATADIHI', 1, '2023-02-21 06:45:04', '2023-02-21 06:45:04', 0),
(9, 0, 'GHASIPURA', 1, '2023-02-21 06:45:04', '2023-02-21 06:45:04', 0),
(10, 0, 'CHAMPUA', 1, '2023-02-21 06:45:04', '2023-02-21 06:45:04', 0),
(11, 0, 'BANSPAL', 1, '2023-02-21 06:45:04', '2023-02-21 06:45:04', 0),
(12, 0, 'ANANDAPUR', 1, '2023-02-21 06:45:04', '2023-02-21 06:45:04', 0);

-- --------------------------------------------------------

--
-- Table structure for table `citys`
--

CREATE TABLE `citys` (
  `id` int NOT NULL,
  `sid` int NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `citys`
--

INSERT INTO `citys` (`id`, `sid`, `name`) VALUES
(1, 0, 'name'),
(2, 1, 'Andaman Island'),
(3, 1, 'Anderson Island'),
(4, 1, 'Arainj-Laka-Punga'),
(5, 1, 'Austinabad'),
(6, 1, 'Bamboo Flat'),
(7, 1, 'Barren Island'),
(8, 1, 'Beadonabad'),
(9, 1, 'Betapur'),
(10, 1, 'Bindraban'),
(11, 1, 'Bonington'),
(12, 1, 'Brookesabad'),
(13, 1, 'Cadell Point'),
(14, 1, 'Calicut'),
(15, 1, 'Chetamale'),
(16, 1, 'Cinque Islands'),
(17, 1, 'Defence Island'),
(18, 1, 'Digilpur'),
(19, 1, 'Dolyganj'),
(20, 1, 'Flat Island'),
(21, 1, 'Geinyale'),
(22, 1, 'Great Coco Island'),
(23, 1, 'Haddo'),
(24, 1, 'Havelock Island'),
(25, 1, 'Henry Lawrence Island'),
(26, 1, 'Herbertabad'),
(27, 1, 'Hobdaypur'),
(28, 1, 'Ilichar'),
(29, 1, 'Ingoie'),
(30, 1, 'Inteview Island'),
(31, 1, 'Jangli Ghat'),
(32, 1, 'Jhon Lawrence Island'),
(33, 1, 'Karen'),
(34, 1, 'Kartara'),
(35, 1, 'KYD Islannd'),
(36, 1, 'Landfall Island'),
(37, 1, 'Little Andmand'),
(38, 1, 'Little Coco Island'),
(39, 1, 'Long Island'),
(40, 1, 'Maimyo'),
(41, 1, 'Malappuram'),
(42, 1, 'Manglutan'),
(43, 1, 'Manpur'),
(44, 1, 'Mitha Khari'),
(45, 1, 'Neill Island'),
(46, 1, 'Nicobar Island'),
(47, 1, 'North Brother Island'),
(48, 1, 'North Passage Island'),
(49, 1, 'North Sentinel Island'),
(50, 1, 'Nothen Reef Island'),
(51, 1, 'Outram Island'),
(52, 1, 'Pahlagaon'),
(53, 1, 'Palalankwe'),
(54, 1, 'Passage Island'),
(55, 1, 'Phaiapong'),
(56, 1, 'Phoenix Island'),
(57, 1, 'Port Blair'),
(58, 1, 'Preparis Island'),
(59, 1, 'Protheroepur'),
(60, 1, 'Rangachang'),
(61, 1, 'Rongat'),
(62, 1, 'Rutland Island'),
(63, 1, 'Sabari'),
(64, 1, 'Saddle Peak'),
(65, 1, 'Shadipur'),
(66, 1, 'Smith Island'),
(67, 1, 'Sound Island'),
(68, 1, 'South Sentinel Island'),
(69, 1, 'Spike Island'),
(70, 1, 'Tarmugli Island'),
(71, 1, 'Taylerabad'),
(72, 1, 'Titaije'),
(73, 1, 'Toibalawe'),
(74, 1, 'Tusonabad'),
(75, 1, 'West Island'),
(76, 1, 'Wimberleyganj'),
(77, 1, 'Yadita'),
(78, 2, 'Adilabad'),
(79, 2, 'Anantapur'),
(80, 2, 'Chittoor'),
(81, 2, 'Cuddapah'),
(82, 2, 'East Godavari'),
(83, 2, 'Guntur'),
(84, 2, 'Hyderabad'),
(85, 2, 'Karimnagar'),
(86, 2, 'Khammam'),
(87, 2, 'Krishna'),
(88, 2, 'Kurnool'),
(89, 2, 'Mahabubnagar'),
(90, 2, 'Medak'),
(91, 2, 'Nalgonda'),
(92, 2, 'Nellore'),
(93, 2, 'Nizamabad'),
(94, 2, 'Prakasam'),
(95, 2, 'Rangareddy'),
(96, 2, 'Srikakulam'),
(97, 2, 'Visakhapatnam'),
(98, 2, 'Vizianagaram'),
(99, 2, 'Warangal'),
(100, 2, 'West Godavari'),
(101, 3, 'Anjaw'),
(102, 3, 'Changlang'),
(103, 3, 'Dibang Valley'),
(104, 3, 'East Kameng'),
(105, 3, 'East Siang'),
(106, 3, 'Itanagar'),
(107, 3, 'Kurung Kumey'),
(108, 3, 'Lohit'),
(109, 3, 'Lower Dibang Valley'),
(110, 3, 'Lower Subansiri'),
(111, 3, 'Papum Pare'),
(112, 3, 'Tawang'),
(113, 3, 'Tirap'),
(114, 3, 'Upper Siang'),
(115, 3, 'Upper Subansiri'),
(116, 3, 'West Kameng'),
(117, 3, 'West Siang'),
(118, 4, 'Barpeta'),
(119, 4, 'Bongaigaon'),
(120, 4, 'Cachar'),
(121, 4, 'Darrang'),
(122, 4, 'Dhemaji'),
(123, 4, 'Dhubri'),
(124, 4, 'Dibrugarh'),
(125, 4, 'Goalpara'),
(126, 4, 'Golaghat'),
(127, 4, 'Guwahati'),
(128, 4, 'Hailakandi'),
(129, 4, 'Jorhat'),
(130, 4, 'Kamrup'),
(131, 4, 'Karbi Anglong'),
(132, 4, 'Karimganj'),
(133, 4, 'Kokrajhar'),
(134, 4, 'Lakhimpur'),
(135, 4, 'Marigaon');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int NOT NULL,
  `ticketId` int NOT NULL,
  `userId` int NOT NULL,
  `image` varchar(250) NOT NULL,
  `message` varchar(250) NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `createAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL,
  `isDelete` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `ticketId`, `userId`, `image`, `message`, `isActive`, `createAt`, `updateAt`, `isDelete`) VALUES
(1, 12121, 12, '', 'hello man', 0, '2023-03-29 08:07:53', '2023-03-29 08:07:53', 0);

-- --------------------------------------------------------

--
-- Table structure for table `countrys`
--

CREATE TABLE `countrys` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `isActive` tinyint NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `countrys`
--

INSERT INTO `countrys` (`id`, `name`, `isActive`) VALUES
(1, 'india', 1);

-- --------------------------------------------------------

--
-- Table structure for table `engsupervisermappings`
--

CREATE TABLE `engsupervisermappings` (
  `id` int NOT NULL,
  `seid` int NOT NULL COMMENT ' service engineer id',
  `sid` int NOT NULL COMMENT 'supervisor id'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `engsupervisermappings`
--

INSERT INTO `engsupervisermappings` (`id`, `seid`, `sid`) VALUES
(1, 40, 11),
(2, 43, 15),
(3, 41, 11),
(4, 14, 15);

-- --------------------------------------------------------

--
-- Table structure for table `equipments`
--

CREATE TABLE `equipments` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `invoiceDate` datetime NOT NULL,
  `manufacturerName` varchar(100) NOT NULL,
  `warrantyEndDate` datetime NOT NULL,
  `about` varchar(100) NOT NULL,
  `serialno` varchar(200) NOT NULL,
  `typeId` int NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isDelete` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `equipments`
--

INSERT INTO `equipments` (`id`, `name`, `invoiceDate`, `manufacturerName`, `warrantyEndDate`, `about`, `serialno`, `typeId`, `isActive`, `createdAt`, `updatedAt`, `isDelete`) VALUES
(1, 'Xiaomi Poco C55', '2018-02-14 12:21:00', 'Xiaomi', '2023-03-14 06:51:00', '68.8 x 76.4 x 8.8 mm (6.65 x 3.01 x 0.35 in)\r\nWeight	192 g (6.77 oz)\r\nBuild	Glass front (Panda Glass', '89798798', 1, 1, '2023-02-22 06:51:00', '2023-02-22 06:51:00', 0),
(2, 'amit rajak  ', '2023-12-01 00:00:00', 'lenove', '2024-12-01 00:00:00', 'this is testing purpose', '987987979', 2, 1, '2023-02-22 06:51:00', '2023-03-23 09:07:53', 0),
(3, 'Acer Swift 5 Laptop ', '2018-02-14 12:21:00', 'Acer', '2023-04-07 06:51:00', 'PerformanceCore i5 11th Gen\r\n4.2 Ghz\r\n8 GB LPDDR4 RAM\r\nDesign14 inches (35.56 cm)\r\n1920 x 1080 pixel', '890000', 2, 1, '2023-02-22 06:51:00', '2023-02-22 06:51:00', 0),
(4, 'Acer Swift X Laptop', '2018-02-14 12:21:00', 'Acer', '2025-02-22 06:51:00', 'PerformanceAMD Octa Core Ryzen 7\r\n2.4 Ghz\r\n16 GB LPDDR4X RAM\r\n4 GB Graphics\r\nDesign14 inches (35.56 ', '890001', 2, 1, '2023-02-22 06:51:00', '2023-02-22 06:51:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `equipmenttypes`
--

CREATE TABLE `equipmenttypes` (
  `id` int NOT NULL,
  `details` varchar(250) NOT NULL,
  `type` varchar(250) NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isDelete` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `equipmenttypes`
--

INSERT INTO `equipmenttypes` (`id`, `details`, `type`, `isActive`, `createdAt`, `updatedAt`, `isDelete`) VALUES
(1, 'mobiles', 'mobile', 1, '2023-02-22 06:50:09', '2023-02-22 06:50:09', 0),
(2, 'samsung is very good compnay ', 'samsung ', 1, '2023-02-22 06:50:09', '2023-03-06 09:45:39', 0),
(8, 'samsung', 'phone', 1, '2023-03-09 10:34:23', '2023-03-09 10:34:23', 0),
(6, 'samsung', 'nokia', 1, '2023-03-09 10:29:11', '2023-03-09 10:29:11', 0);

-- --------------------------------------------------------

--
-- Table structure for table `equipmetmappings`
--

CREATE TABLE `equipmetmappings` (
  `id` int NOT NULL,
  `eqpid` int NOT NULL,
  `scode` int NOT NULL COMMENT 'school code',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `equipmetmappings`
--

INSERT INTO `equipmetmappings` (`id`, `eqpid`, `scode`, `createdAt`, `updatedAt`) VALUES
(1, 1, 2, '2023-02-23 06:51:32', '2023-02-23 06:51:32'),
(2, 2, 2, '2023-02-23 06:51:32', '2023-02-23 06:51:32'),
(3, 3, 1, '2023-02-23 06:51:32', '2023-02-23 06:51:32'),
(4, 4, 3, '2023-02-23 06:51:32', '2023-02-23 06:51:32'),
(5, 4, 23, '2023-02-23 06:51:32', '2023-02-23 06:51:32'),
(6, 2, 32, '2023-02-23 06:51:32', '2023-02-23 06:51:32'),
(7, 12, 23, '2023-02-23 06:51:32', '2023-02-23 06:51:32');

-- --------------------------------------------------------

--
-- Table structure for table `forgotpasswords`
--

CREATE TABLE `forgotpasswords` (
  `id` int NOT NULL,
  `uid` int NOT NULL,
  `Epass` varchar(220) NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `forgotpasswords`
--

INSERT INTO `forgotpasswords` (`id`, `uid`, `Epass`, `isActive`, `createdAt`, `updatedAt`) VALUES
(5, 43, 'SaAPNVV_2', 0, '2023-03-28 12:30:09', '2023-03-28 12:30:09');

-- --------------------------------------------------------

--
-- Table structure for table `pmreports`
--

CREATE TABLE `pmreports` (
  `id` int NOT NULL,
  `udiseid` bigint NOT NULL,
  `year` year NOT NULL,
  `qone_date` date NOT NULL,
  `qone_url` varchar(40) NOT NULL,
  `qtwo_date` date NOT NULL,
  `qtwo_url` varchar(40) NOT NULL,
  `qthree_date` int NOT NULL,
  `qthree_url` varchar(40) NOT NULL,
  `qfour_date` date NOT NULL,
  `qfour_url` varchar(40) NOT NULL,
  `createdAt` timestamp NOT NULL,
  `updatedAt` date NOT NULL,
  `isDelete` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pmreports`
--

INSERT INTO `pmreports` (`id`, `udiseid`, `year`, `qone_date`, `qone_url`, `qtwo_date`, `qtwo_url`, `qthree_date`, `qthree_url`, `qfour_date`, `qfour_url`, `createdAt`, `updatedAt`, `isDelete`) VALUES
(1, 21061400301, 2023, '2023-01-01', 'one.pdf', '2023-04-01', 'two.pdf', 0, '', '0000-00-00', '', '0000-00-00 00:00:00', '0000-00-00', 0),
(2, 21061400402, 2023, '2023-01-01', 'one.pdf', '2023-04-01', 'two.pdf', 0, '', '0000-00-00', '', '0000-00-00 00:00:00', '0000-00-00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int NOT NULL,
  `emcdate` date NOT NULL,
  `name` varchar(100) NOT NULL,
  `details` varchar(200) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isDelete` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `emcdate`, `name`, `details`, `startDate`, `endDate`, `isActive`, `createdAt`, `updatedAt`, `isDelete`) VALUES
(1, '2023-03-09', 'new delhi', 'wow delhi projects', '2023-09-12 00:00:00', '2023-12-12 00:00:00', 1, '2023-03-01 09:14:44', '2023-03-23 11:00:40', 0),
(2, '0000-00-00', 'new delhi delhi', 'wow delhi projects', '2023-12-07 00:00:00', '2023-12-12 00:00:00', 1, '2023-03-23 11:14:31', '2023-03-23 11:14:31', 0),
(12, '0000-00-00', 'new delhi mayur', 'wow delhi projects', '2023-12-07 00:00:00', '2023-12-12 00:00:00', 1, '2023-03-23 11:19:43', '2023-03-23 11:19:43', 0),
(13, '2023-12-12', 'new delhi mayur kl', 'wow delhi projects', '2023-12-07 00:00:00', '2023-12-12 00:00:00', 1, '2023-03-23 11:23:51', '2023-03-23 11:23:51', 0);

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int NOT NULL,
  `schoolid` int NOT NULL,
  `file` varchar(250) NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `createAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL,
  `isDelete` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isDelete` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `isActive`, `createdAt`, `updatedAt`, `isDelete`) VALUES
(1, 'admin', 1, '2023-02-20 08:56:44', '2023-02-20 08:56:44', 0),
(2, 'service engineer', 1, '2023-02-20 08:56:44', '2023-03-14 07:28:39', 0),
(3, 'supervisor', 1, '2023-02-20 08:56:44', '2023-02-20 08:56:44', 0),
(4, 'user master', 1, '2023-02-20 08:56:44', '2023-03-25 02:41:10', 0),
(5, 'customer', 1, '2023-02-20 08:56:44', '2023-02-20 08:56:44', 0);

-- --------------------------------------------------------

--
-- Table structure for table `schools`
--

CREATE TABLE `schools` (
  `id` int NOT NULL,
  `userid` int NOT NULL,
  `serviceengid` int NOT NULL,
  `udisecode` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `smartclass` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `district` varchar(100) NOT NULL,
  `pincode` int NOT NULL,
  `blockid` int NOT NULL,
  `pid` int NOT NULL COMMENT 'pid = projects id',
  `isActive` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isDelete` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `schools`
--

INSERT INTO `schools` (`id`, `userid`, `serviceengid`, `udisecode`, `smartclass`, `name`, `state`, `city`, `district`, `pincode`, `blockid`, `pid`, `isActive`, `createdAt`, `updatedAt`, `isDelete`) VALUES
(2, 15, 14, '21061400301', 4, 'B.N. HIGH SCHOOL, ANANDAPUR', '', 'ANANDAPUR ', 'KEONJHAR', 758021, 2, 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(1, 1, 0, '21060102101', 0, 'DHAKOTHA H.S', 'bihar', 'DHAKOTHA ', 'KEONJHAR', 758015, 1, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(3, 3, 14, '21061400402', 12, 'GOVT. GIRLS HIGH SCHOOL, ANANDAPUR', '', 'ANANDAPUR ', 'KEONJHAR', 758021, 3, 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(4, 4, 41, '21060200101', 0, 'BAITARANI HIGH SCHOOL,BANSPAL', '', 'BANSPAL, ', 'KEONJHAR', 758085, 4, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(5, 5, 0, '21060206204', 0, 'BRAHMESWAR GOVT. HIGH SCHOOL, KUNDHEI', '', 'AT - KUNDHEI', 'CHAMPUA', 758014, 5, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(7, 7, 0, '21060309903', 0, 'UTKALMANI GOVT. VIDYAPITHA PARSALA', '', 'PARSALA', 'KEONJHAR', 758047, 6, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(8, 8, 0, '21060312105', 0, 'KB High School, Bhanda', '', 'BHANDA', 'Champua', 758044, 6, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(9, 9, 0, '21061800801', 0, 'MAHATAB H.S., CHAMPUA', '', 'Champua', 'KUSHALESWAR', 758041, 6, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(10, 10, 0, '21060404106', 0, 'KUSHALESWAR NODAL H.S, DEOGAON', '', 'AT - DEOGAON', 'KEONJHAR', 758025, 7, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(11, 11, 0, '21060413101', 0, 'LAXMI NARAYAN NODAL H.S, RAMACHANDRAPUR', '', 'RAMACHANDRAPUR ', 'KEONJHAR', 758043, 8, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(12, 12, 0, '21060502402', 0, 'N.K H.S ,BARHATIPURA', '', 'BARHATIPURA', 'KEONJHAR', 758027, 9, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(13, 13, 0, '21060507104', 0, 'TARINI GIRLS HS', '', 'GHATGAON', 'KEONJHAR', 758027, 10, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(15, 15, 0, '21060716402', 0, 'R.B GOVT HIGH SCHOOL', '', 'SADANG', 'HARICHANDANPUR', 756121, 12, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(16, 16, 0, '21060606101', 0, 'HARICHANDANPUR', '', 'HARICHANDANPUR', 'KEONJHAR', 758028, 12, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(17, 17, 0, '21060606102', 0, 'Govt.GIRLS H.S.', '', 'HARICHANDANPUR', 'PITHAGOLA', 758028, 12, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(18, 18, 0, '21060613301', 0, 'HARICHANDANPUR H.S.', '', 'PITHAGOLA', 'KEONJHAR', 758028, 12, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(19, 19, 0, '21060802801', 0, 'G.P H.S., PITHAGOLA', '', 'BALIBANDHA, VIA-JHUMPURA', 'KEONJHAR', 758031, 12, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(20, 20, 0, '21060804901', 0, 'BALIBANDHA HIGH SCHOOL, BALIBANDHA', '', 'CHAUTHIA, JHUMPURA', 'KEONJHAR', 758044, 8, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(21, 21, 0, '21060805101', 0, 'CB Nodal High School, Chauthia', '', 'KALINGA, VIA - KARANJIA', 'KEONJHAR', 758044, 8, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(22, 22, 0, '21060807102', 0, 'DHABALESWAR NODAL H/S KALINGA', '', 'JHUMPURA, VIA - JHUMPURA', 'KEONJHAHAR', 758031, 8, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(23, 23, 40, '21060903501', 0, 'JHUMPURA HIGH SCHOOL', '', 'KIRIBURU HILL TOP', 'KEONJHAR', 758040, 10, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(24, 24, 41, '21060907002', 0, 'GOVT. HIGH SCHOOL KIRIBURU', '', 'DEOJHAR, VIA - BANEIKALA', 'KEONJHAR', 758038, 10, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(25, 25, 41, '21061501472', 0, 'DHABALESWAR H.S, DEOJHAR', '', 'KALINGA, PO - MATHKAMBEDA', 'KEONJHAR', 758036, 10, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(26, 43, 2, '21061600902', 0, 'KALINGANAGAR H.S., MATKAMBEDA', '', 'JODA', 'KEONJHAR', 758034, 8, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(27, 27, 0, '21061001602', 0, 'JODA H.S.', '', 'BODAPALSA', 'KEONJHAR', 758002, 8, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(28, 28, 0, '21061700303', 0, 'C.S.HIGH SCHOOL, BODAPALASA', '', 'OLD TOWN', 'KEONJHAR', 758002, 8, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(29, 29, 0, '21061700701', 0, 'TOWN GIRLS HIGH SCHOOl', '', 'KEONJHAR', 'KEONJHAR', 758001, 8, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(30, 30, 0, '21061700802', 1, 'D.N. HIGH SCHOOL', '', 'KEONJHARGARH', 'KEONJHAR', 758001, 3, 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(31, 31, 0, '21061701706', 29, 'GOVT GIRLS HIGH SCHOOL', '', 'KEONJHAR', 'KEONJHAR', 758001, 3, 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(32, 32, 40, '21061108903', 0, 'N.S POLICE HIGH SCHOOL', '', 'KENDEIPOSI VIA - RAJNAGAR', 'RAJNAGAR', 758017, 3, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(33, 33, 14, '21061109701', 0, 'PANCHAYT NODAL HIGH SCHOOL, KENDEIPASI', '', 'KHIREITANGIRI', 'KHIREITANGIRI', 758046, 3, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(34, 34, 0, '21061111102', 10, 'KHIREITANGIRI NODALHIGH SCHOOL', '', 'MURUSUAN VIA - RAJNAGAR ', 'KEONJHAR', 758017, 2, 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(35, 35, 0, '21061111701', 19, 'MURUSUAN NODAL HIGH SCHOOL', '', 'MALLIPOSI PO - MUSHAKHORI', 'MUSHAKHORI', 758030, 2, 2, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(36, 36, 0, '21061208601', 23, 'JANATA HIGH SCHOOL, MALLIPOSI', '', 'MACHHAGARH, KJR', 'MACHHAGARH', 758081, 2, 2, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(37, 37, 0, '21061209701', 12, 'GOVT. HIGH SCHOOL MACHHAGARH', '', 'JAMUDA, VIA - UDAYAPUR, KJR', 'KJR', 758045, 2, 2, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(38, 38, 0, '21061211403', 0, 'GOPABANDHUGOVT. H.S., JAMUDA', '', '', 'SAHARPADA', 758016, 12, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(39, 39, 0, '21061303003', 0, 'SAHARPADA H.S., SAHARPADA', '', 'Telkoi ', 'Keonjhar', 758019, 12, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(40, 40, 0, '21061312203', 0, 'RADHA KRISHNA GOVT H/S DEULADIHA', '', 'SIRIGIDA, PS - TELKOI', 'KEONJHAR', 758076, 12, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(41, 41, 0, '21061314303', 0, 'GOVT. HIGH SCHOOL SIRIGIDA', '', 'TELKOI', 'KEONJHAR', 758019, 12, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(42, 14, 11, 'jdh877s', 12, 'sun rise', 'delhi', 'mohan nagar', 'north east', 78787887, 2, 2, 0, '2023-03-10 10:38:12', '2023-03-10 10:38:12', 0),
(43, 14, 11, 'jdh8772', 45, 'sun rise', 'delhi', 'mohan nagar', 'north east', 78787887, 2, 2, 0, '2023-03-10 10:40:11', '2023-03-10 10:40:11', 0),
(44, 0, 0, 'jdhd8772', 0, 'sun rise', 'delhi', 'mohan nagar', 'north east', 78787887, 2, 0, 0, '2023-03-23 09:55:50', '2023-03-23 09:55:50', 0);

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `lastActive` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `id` int NOT NULL,
  `cid` int NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `states`
--

INSERT INTO `states` (`id`, `cid`, `name`) VALUES
(1, 1, 'ANDAMAN AND NICOBAR ISLANDS'),
(2, 1, 'ANDHRA PRADESH'),
(3, 1, 'ARUNACHAL PRADESH'),
(4, 1, 'ASSAM'),
(5, 1, 'BIHAR'),
(6, 1, 'CHATTISGARH'),
(7, 1, 'CHANDIGARH'),
(8, 1, 'DAMAN AND DIU'),
(9, 1, 'DELHI'),
(10, 1, 'DADRA AND NAGAR HAVELI'),
(11, 1, 'GOA'),
(12, 1, 'GUJARAT'),
(13, 1, 'HIMACHAL PRADESH'),
(14, 1, 'HARYANA'),
(15, 1, 'JAMMU AND KASHMIR'),
(16, 1, 'JHARKHAND'),
(17, 1, 'KERALA'),
(18, 1, 'KARNATAKA'),
(19, 1, 'LAKSHADWEEP'),
(20, 1, 'MEGHALAYA'),
(21, 1, 'MAHARASHTRA'),
(22, 1, 'MANIPUR'),
(23, 1, 'MADHYA PRADESH'),
(24, 1, 'MIZORAM'),
(25, 1, 'NAGALAND'),
(26, 1, 'ORISSA'),
(27, 1, 'PUNJAB'),
(28, 1, 'PONDICHERRY'),
(29, 1, 'RAJASTHAN'),
(30, 1, 'SIKKIM'),
(31, 1, 'TAMIL NADU'),
(32, 1, 'TRIPURA'),
(33, 1, 'UTTARAKHAND'),
(34, 1, 'UTTAR PRADESH'),
(35, 1, 'WEST BENGAL'),
(36, 1, 'TELANGANA');

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` int NOT NULL,
  `userid` int NOT NULL,
  `details` varchar(100) NOT NULL,
  `scode` int NOT NULL COMMENT 'school code',
  `ticketid` int NOT NULL,
  `supervisorid` int NOT NULL,
  `serviceengid` int NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isDelete` tinyint(1) NOT NULL,
  `status` enum('open','pending','resolved','closed') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`id`, `userid`, `details`, `scode`, `ticketid`, `supervisorid`, `serviceengid`, `isActive`, `createdAt`, `updatedAt`, `isDelete`, `status`) VALUES
(1, 17, 'my lap top is not working since jan 23', 1, 123, 20, 17, 1, '2023-02-23 04:18:45', '2023-02-23 04:18:45', 0, 'open'),
(2, 1, '7', 2, 12, 11, 14, 1, '2023-02-23 04:18:45', '2023-02-23 04:18:45', 0, 'open'),
(3, 7, 'my lap top is not working since jan 23', 1, 1234, 11, 14, 1, '2023-02-23 04:18:45', '2023-02-23 04:18:45', 0, 'open'),
(4, 7, 'my lap top is not working since jan 23', 1, 1235, 11, 17, 1, '2023-02-23 04:18:45', '2023-02-23 04:18:45', 0, 'open'),
(14, 14, 'hello man', 42, 4262, 12, 17, 1, '2023-03-10 13:19:46', '2023-03-10 13:19:46', 0, 'open');

-- --------------------------------------------------------

--
-- Table structure for table `trainings`
--

CREATE TABLE `trainings` (
  `id` int NOT NULL,
  `scode` int NOT NULL COMMENT 'school id',
  `subject` varchar(100) NOT NULL,
  `date` datetime NOT NULL,
  `isActive` tinyint NOT NULL,
  `isDelete` tinyint NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `trainings`
--

INSERT INTO `trainings` (`id`, `scode`, `subject`, `date`, `isActive`, `isDelete`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'lap top ', '2023-02-24 04:39:07', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 1, 'lap top projects ', '2023-02-24 04:39:07', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 2, 'tv ', '2023-02-24 04:39:07', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 2, 'internet', '2023-02-24 04:39:07', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 14, 'my laptop issues', '2023-12-01 18:30:00', 1, 0, '2023-03-09 12:17:28', '2023-03-09 12:17:28');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `roleid` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` bigint NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(250) NOT NULL,
  `token` text NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `lastlogin` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isDelete` tinyint(1) DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `roleid`, `name`, `phone`, `email`, `password`, `token`, `isActive`, `lastlogin`, `createdAt`, `updatedAt`, `isDelete`) VALUES
(17, 5, 'rahul kumar', 111111143, 'customer@gmail.com', '$2a$10$HqU6swLnQvPIocCrcM8SNOea4Txk2sKd2kEaXcdHmWUduXXek1osO', '', 1, '2023-03-20 14:24:30', '2023-02-28 06:18:43', '2023-03-21 09:44:51', 0),
(15, 3, 'rahul mane n', 2147483647, 'amitrajka@gmail.com', '$2a$10$cYfe/F/8V/B8l8HUi1mBSeSb2Bxr9JfIjjpty540U2.LR8iubf0Va', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTY4MDA2NDI2MCwiZXhwIjoxNjgwMjM3MDYwfQ.mJpG7sotcj0TO0X5ulyIlp4crcBIKvhCgEE1Id-6SRI', 1, '2023-03-29 10:01:00', '2023-02-28 04:13:51', '2023-03-29 04:31:00', 0),
(11, 3, 'gokul', 111111116, 'admin6@gmail.com', '$2a$10$SAduzkYIM9OD7XNrQd7P8e0mus2bysff9Y5ubhIqwuwP9KI5uqDee', '', 1, '2023-03-23 14:53:25', '2023-02-21 08:21:45', '2023-03-23 09:23:25', 0),
(14, 2, 'service eng rahul kumar', 551111143, 'serviceeng1@gmail.com', '$2a$10$l1QrlQPlBPxH1IFYW3G2aeXAnzlMccBBmyxUzYBMHB0NeSmdrmYHO', '', 1, '2023-03-22 12:27:10', '2023-02-28 06:18:43', '2023-03-22 06:57:10', 0),
(40, 2, 'amit rajak', 908098908, 'amitbadanak9@gmail.com', '$2a$10$cYfe/F/8V/B8l8HUi1mBSeSb2Bxr9JfIjjpty540U2.LR8iubf0Va', '', 1, '2023-03-20 14:04:47', '2023-03-20 03:50:28', '2023-03-21 09:44:24', 0),
(41, 2, 'sunil rajak', 908098909, 'sunil9@gmail.com', '$2a$10$cYfe/F/8V/B8l8HUi1mBSeSb2Bxr9JfIjjpty540U2.LR8iubf0Va', '', 1, '2023-03-20 14:04:47', '2023-03-20 03:50:28', '2023-03-20 08:35:58', 0),
(43, 1, 'admin', 78787878, 'amidtbadanak9@gmail.com', '$2a$10$YcDJZJ6wCRUe9RRsUZ2ygeRughhq9kzUit7MEfgmNVkJV/pYXDvPS', '', 1, '2023-03-28 16:27:30', '2023-03-20 14:17:52', '2023-03-29 04:27:02', 1);

-- --------------------------------------------------------

--
-- Stand-in structure for view `view_sch_complains`
-- (See below for the actual view)
--
CREATE TABLE `view_sch_complains` (
`userid` int
,`status` enum('open','pending','resolved','closed')
,`ticketid` int
,`created_date` datetime
,`block_name` varchar(100)
,`schools_name` varchar(100)
,`issues_details` varchar(100)
,`assignTo` varchar(100)
,`isActive` tinyint(1)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `view_sch_eqps`
-- (See below for the actual view)
--
CREATE TABLE `view_sch_eqps` (
`id` int
,`equipmentName` varchar(100)
,`udisecode` varchar(100)
,`brandName` varchar(100)
,`projectsname` varchar(100)
,`warrantyEndDate` datetime
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `view_sch_projects`
-- (See below for the actual view)
--
CREATE TABLE `view_sch_projects` (
`amc_date` datetime
,`projects_id` int
,`projects_name` varchar(100)
,`total_school` bigint
,`total_class` decimal(32,0)
);

-- --------------------------------------------------------

--
-- Structure for view `view_sch_complains`
--
DROP TABLE IF EXISTS `view_sch_complains`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_sch_complains`  AS SELECT `tickets`.`userid` AS `userid`, `tickets`.`status` AS `status`, `tickets`.`ticketid` AS `ticketid`, `tickets`.`createdAt` AS `created_date`, `schools->block`.`name` AS `block_name`, `schools`.`name` AS `schools_name`, `tickets`.`details` AS `issues_details`, `users`.`name` AS `assignTo`, `tickets`.`isActive` AS `isActive` FROM ((((select `tickets`.`id` AS `id`,`tickets`.`status` AS `status`,`tickets`.`createdAt` AS `createdAt`,`tickets`.`userid` AS `userid`,`tickets`.`details` AS `details`,`tickets`.`ticketid` AS `ticketid`,`tickets`.`serviceengid` AS `serviceengid`,`tickets`.`scode` AS `scode`,`tickets`.`isActive` AS `isActive` from `tickets` where (`tickets`.`isActive` = 1)) `tickets` left join `schools` on((`tickets`.`scode` = `schools`.`id`))) left join `blocks` `schools->block` on((`schools`.`id` = `schools->block`.`id`))) join `users` on((`users`.`id` = `tickets`.`serviceengid`))) ;

-- --------------------------------------------------------

--
-- Structure for view `view_sch_eqps`
--
DROP TABLE IF EXISTS `view_sch_eqps`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_sch_eqps`  AS SELECT `equipments`.`id` AS `id`, `equipments`.`name` AS `equipmentName`, `schools`.`udisecode` AS `udisecode`, `equipments`.`manufacturerName` AS `brandName`, `projects`.`name` AS `projectsname`, `equipments`.`warrantyEndDate` AS `warrantyEndDate` FROM (((`equipments` join `equipmetmappings` on((`equipmetmappings`.`eqpid` = `equipments`.`id`))) join `schools` on((`schools`.`id` = `equipmetmappings`.`scode`))) join `projects` on((`projects`.`id` = `schools`.`pid`))) ;

-- --------------------------------------------------------

--
-- Structure for view `view_sch_projects`
--
DROP TABLE IF EXISTS `view_sch_projects`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_sch_projects`  AS SELECT `projects`.`createdAt` AS `amc_date`, `projects`.`id` AS `projects_id`, `projects`.`name` AS `projects_name`, count(`schools`.`id`) AS `total_school`, sum(`schools`.`smartclass`) AS `total_class` FROM (`projects` join `schools` on((`schools`.`pid` = `projects`.`id`))) GROUP BY `projects`.`id` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userid` (`userid`);

--
-- Indexes for table `blocks`
--
ALTER TABLE `blocks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `citys`
--
ALTER TABLE `citys`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `countrys`
--
ALTER TABLE `countrys`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `engsupervisermappings`
--
ALTER TABLE `engsupervisermappings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `equipments`
--
ALTER TABLE `equipments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `equipmenttypes`
--
ALTER TABLE `equipmenttypes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `equipmetmappings`
--
ALTER TABLE `equipmetmappings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `forgotpasswords`
--
ALTER TABLE `forgotpasswords`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pmreports`
--
ALTER TABLE `pmreports`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `udiseid` (`udiseid`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `udisecode` (`udisecode`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trainings`
--
ALTER TABLE `trainings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `blocks`
--
ALTER TABLE `blocks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `citys`
--
ALTER TABLE `citys`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `countrys`
--
ALTER TABLE `countrys`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `engsupervisermappings`
--
ALTER TABLE `engsupervisermappings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `equipments`
--
ALTER TABLE `equipments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `equipmenttypes`
--
ALTER TABLE `equipmenttypes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `equipmetmappings`
--
ALTER TABLE `equipmetmappings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `forgotpasswords`
--
ALTER TABLE `forgotpasswords`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `pmreports`
--
ALTER TABLE `pmreports`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `schools`
--
ALTER TABLE `schools`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `states`
--
ALTER TABLE `states`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `trainings`
--
ALTER TABLE `trainings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
