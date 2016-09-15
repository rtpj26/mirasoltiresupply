-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 15, 2016 at 09:53 PM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 7.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mirasoltiresupply`
--
CREATE DATABASE IF NOT EXISTS `mirasoltiresupply` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `mirasoltiresupply`;

-- --------------------------------------------------------

--
-- Table structure for table `battery`
--

DROP TABLE IF EXISTS `battery`;
CREATE TABLE `battery` (
  `BATTERY_ID` int(11) NOT NULL,
  `PRODUCT_ID` int(11) NOT NULL,
  `BATTERY_TYPE` varchar(255) NOT NULL,
  `BATTERY_DESCRIPTION` varchar(255) NOT NULL,
  `BATTERY_PLATES` int(11) NOT NULL,
  `BATTERY_IMAGE_FNAME` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `battery`
--

INSERT INTO `battery` (`BATTERY_ID`, `PRODUCT_ID`, `BATTERY_TYPE`, `BATTERY_DESCRIPTION`, `BATTERY_PLATES`, `BATTERY_IMAGE_FNAME`) VALUES
(1, 10, '1', 'Motolite Excel', 11, 'Excel.jpg'),
(2, 11, '2', 'Motolite Gold', 2, 'Gold.jpg'),
(3, 12, '3', 'Motolite LM-Enforcer', 2, 'lm-enforcer.png'),
(4, 13, '6', 'Motolite Truckmaster', 2, 'motolite-truckmaster.png'),
(5, 14, '2', 'Motolite Super Premium', 2, 'super-premium.png');

-- --------------------------------------------------------

--
-- Table structure for table `cheque`
--

DROP TABLE IF EXISTS `cheque`;
CREATE TABLE `cheque` (
  `CHEQUE_ID` int(11) NOT NULL,
  `TRANSACTION_ID` int(11) NOT NULL,
  `CHEQUE_BANK` varchar(255) NOT NULL,
  `CHEQUE_NUMBER` varchar(255) NOT NULL,
  `CHEQUE_DATE_RECEIVED` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `CHEQUE_AMOUNT` decimal(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cheque`
--

INSERT INTO `cheque` (`CHEQUE_ID`, `TRANSACTION_ID`, `CHEQUE_BANK`, `CHEQUE_NUMBER`, `CHEQUE_DATE_RECEIVED`, `CHEQUE_AMOUNT`) VALUES
(1, 0, '111', '1111', '2016-09-12 17:29:40', '111.00');

-- --------------------------------------------------------

--
-- Table structure for table `cod`
--

DROP TABLE IF EXISTS `cod`;
CREATE TABLE `cod` (
  `COD_ID` int(11) NOT NULL,
  `TRANSACTION_ID` int(11) NOT NULL,
  `COD_CAREOF` varchar(255) NOT NULL,
  `COD_STATUS` int(11) NOT NULL,
  `COD_DATE_RECEIVED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `COD_DATE_ISSUED` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `COMMENT_ID` int(11) NOT NULL,
  `COMMENT_NAME` varchar(255) NOT NULL,
  `COMMENT_EMAIL` varchar(255) NOT NULL,
  `COMMENT_MESSAGE` longtext NOT NULL,
  `COMMENT_CONTACT_NUM` int(11) NOT NULL,
  `COMMENT_STATUS` int(11) NOT NULL DEFAULT '1' COMMENT '1=UNREAD | 2= READ'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`COMMENT_ID`, `COMMENT_NAME`, `COMMENT_EMAIL`, `COMMENT_MESSAGE`, `COMMENT_CONTACT_NUM`, `COMMENT_STATUS`) VALUES
(1, 'TEST', 'TEST@TEST.COM', 'TRDSTSDSAF', 2147483647, 2),
(2, '123', '123@13.123', '123123', 13, 2);

-- --------------------------------------------------------

--
-- Table structure for table `credit_card`
--

DROP TABLE IF EXISTS `credit_card`;
CREATE TABLE `credit_card` (
  `CC_ID` int(11) NOT NULL,
  `TRANSACTION_ID` int(11) NOT NULL,
  `CC_DATE_RECEIVED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `CC_CARD_NO` int(11) NOT NULL,
  `CC_NAME_IN_CARD` varchar(255) NOT NULL,
  `CC_EXPIRATION_MONTH` int(11) NOT NULL,
  `CC_EXPIRATION_YEAR` int(11) NOT NULL,
  `CC_SECURITY_CODE` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `credit_card`
--

INSERT INTO `credit_card` (`CC_ID`, `TRANSACTION_ID`, `CC_DATE_RECEIVED`, `CC_CARD_NO`, `CC_NAME_IN_CARD`, `CC_EXPIRATION_MONTH`, `CC_EXPIRATION_YEAR`, `CC_SECURITY_CODE`) VALUES
(1, 0, '2016-09-11 19:33:25', 1, '1', 1, 2016, '123'),
(2, 0, '2016-09-11 19:50:39', 123, '123', 11, 1231, '123'),
(3, 0, '2016-09-11 20:10:23', 1, '1', 1, 2016, '123'),
(4, 0, '2016-09-12 07:23:21', 1111, '1111', 11, 1111, '1111'),
(5, 0, '2016-09-12 07:25:37', 11111, '111', 11, 1111, '1111'),
(6, 0, '2016-09-12 07:26:32', 1111, '111', 11, 1111, '1111'),
(7, 0, '2016-09-12 07:28:25', 11111, '1111', 11, 1111, '1111'),
(8, 0, '2016-09-12 07:29:30', 11111, '11111', 11, 1111, '1111'),
(9, 0, '2016-09-12 07:44:36', 11111, '111', 1111, 1111, '11111'),
(10, 0, '2016-09-12 09:48:58', 2147483647, '2222222', 11, 1111, '111111111'),
(11, 0, '2016-09-12 10:16:26', 11111, '222222', 11, 1111, '1111111'),
(12, 0, '2016-09-15 06:24:19', 2131231, '123123123', 11, 2312, '12321312'),
(13, 0, '2016-09-15 06:25:27', 123, '123', 11, 1111, '123'),
(14, 0, '2016-09-15 06:26:32', 123213, '123123', 11, 1111, '123213'),
(15, 0, '2016-09-15 06:38:20', 123123, '123123', 11, 2222, '123123'),
(16, 0, '2016-09-15 06:40:14', 123, '123', 11, 1233, '13'),
(17, 0, '2016-09-15 07:24:16', 123123, '123123', 12, 1223, '123123'),
(18, 0, '2016-09-15 08:01:20', 1111, '1111', 11, 11, '1111'),
(19, 0, '2016-09-15 08:02:38', 121212, '112122', 11, 1111, '2122'),
(20, 0, '2016-09-15 08:02:41', 121212, '112122', 11, 1111, '2122'),
(21, 0, '2016-09-15 08:09:57', 111111, '1111111', 11, 1111, '1111'),
(22, 0, '2016-09-15 08:14:56', 123123123, '21313', 111, 123123, '1312321'),
(23, 0, '2016-09-15 09:18:38', 1232213, '13321', 11, 1232, '123123'),
(24, 0, '2016-09-15 09:42:56', 123123213, '1232133', 11, 1123, '1231232132'),
(25, 0, '2016-09-15 09:43:35', 8098908, 'ugsuidyuwqy', 3, 2019, '90990'),
(26, 0, '2016-09-15 09:45:51', 0, '123123', 11, 1111, '123213'),
(27, 0, '2016-09-15 09:45:52', 98098098, 'Jon Jan', 8, 2019, '0909'),
(28, 0, '2016-09-15 10:13:31', 908098097, 'Jon Jan', 9, 2019, '2939'),
(29, 0, '2016-09-15 17:12:43', 123123, '123123', 11, 1231, '123123');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `PRODUCT_ID` int(11) NOT NULL,
  `PRODUCT_TYPE` int(11) NOT NULL COMMENT '1=TIRE | 2=WHEEL | 3=BATTERY',
  `PRODUCT_COST_PER_UNIT` double(18,2) NOT NULL,
  `PRODUCT_STOCK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`PRODUCT_ID`, `PRODUCT_TYPE`, `PRODUCT_COST_PER_UNIT`, `PRODUCT_STOCK`) VALUES
(1, 1, 6314.01, 10),
(2, 1, 6799.70, 10),
(3, 1, 5528.97, 10),
(4, 1, 6309.34, 10),
(5, 1, 5457.24, 10),
(6, 1, 5497.00, 10),
(7, 1, 5564.10, 10),
(8, 1, 6276.12, 10),
(9, 1, 7820.95, 10),
(10, 3, 5625.29, 10),
(11, 3, 7014.38, 10),
(12, 3, 6792.07, 10),
(13, 3, 7068.61, 10),
(14, 3, 7916.84, 10),
(15, 2, 8357.01, 10),
(16, 2, 6980.30, 10),
(17, 2, 8336.89, 10),
(18, 2, 7226.18, 10),
(19, 2, 8063.90, 10),
(20, 2, 7546.03, 10),
(21, 2, 8534.45, 10),
(22, 2, 8056.48, 10),
(23, 2, 8893.03, 10),
(24, 2, 9572.56, 10),
(25, 2, 8552.47, 10);

-- --------------------------------------------------------

--
-- Table structure for table `rescue`
--

DROP TABLE IF EXISTS `rescue`;
CREATE TABLE `rescue` (
  `RESCUE_ID` int(11) NOT NULL,
  `TRANSACTION_ID` int(11) NOT NULL,
  `RESCUE_NAME` varchar(255) NOT NULL,
  `RESCUE_CSR_NO` int(11) NOT NULL,
  `RESCUE_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `RESCUE_X_COORDINATE` double(8,8) NOT NULL,
  `RESCUE_Y_COORDINATE` double(8,8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `temp_transaction_detail`
--

DROP TABLE IF EXISTS `temp_transaction_detail`;
CREATE TABLE `temp_transaction_detail` (
  `TEMP_ID` int(11) NOT NULL,
  `TRANSACTION_ID` int(11) NOT NULL,
  `PRODUCT_ID` int(11) NOT NULL,
  `TD_QTY` int(11) NOT NULL,
  `TD_TOTAL` double(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tire`
--

DROP TABLE IF EXISTS `tire`;
CREATE TABLE `tire` (
  `TIRE_ID` int(11) NOT NULL,
  `PRODUCT_ID` int(11) NOT NULL,
  `TIRE_RIM` varchar(255) NOT NULL,
  `TIRE_SIZE` varchar(255) NOT NULL,
  `TIRE_LI_SS` varchar(255) NOT NULL,
  `TIRE_BRAND` varchar(255) NOT NULL,
  `TIRE_DESIGN` varchar(255) NOT NULL,
  `TIRE_NAME` varchar(255) NOT NULL,
  `TIRE_IMAGE_FNAME` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tire`
--

INSERT INTO `tire` (`TIRE_ID`, `PRODUCT_ID`, `TIRE_RIM`, `TIRE_SIZE`, `TIRE_LI_SS`, `TIRE_BRAND`, `TIRE_DESIGN`, `TIRE_NAME`, `TIRE_IMAGE_FNAME`) VALUES
(1, 1, '60R15C', '185', '94/92T', 'Coopertires', 'DISCOVERER HT/3', '', 'Discoverer HT3.png'),
(2, 2, '65R15C', '205', '102/100T', 'Coopertires', 'DISCOVERER HT/T3', '', 'Discoverer MS.png'),
(3, 3, '75R15', 'P205', '97S', 'Coopertires', 'DISCOVERER H/T', '', 'Discoverer ATP.png'),
(4, 4, '75R15', 'P215', '100S', 'Coopertires', 'DISCOVERER A/T', '', 'Discoverer ATW.png'),
(5, 5, '70R15', '225', '100T', 'Coopertires', 'DISCOVERER A/T3', '', 'Discoverer AT3.png'),
(6, 6, '70R15', 'P225', '100A', 'Coopertires', 'DISCOVERER H/T', '', 'Discoverer ST.png'),
(7, 7, 'T5R15', 'P225', '102S', 'Coopertires', 'DISCOVERER H/T', '', 'Discoverer STT PRO.png'),
(8, 8, '70R15', 'P235', '102S', 'Coopertires', 'DISCOVERER H/T', '', 'Discoverer RTX.png'),
(9, 9, 'T5R15XL', '235', '109T', 'Coopertires', 'DISCOVERER H/T', '', 'Discoverer MTP.png');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
CREATE TABLE `transaction` (
  `TRANSACTION_ID` int(11) NOT NULL,
  `USER_ID` int(11) NOT NULL,
  `TRANSACTION_TYPE` int(11) NOT NULL,
  `TEANSACTION_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `TRANSCTION_MOP` int(11) NOT NULL,
  `TRANSACTION_STATUS` int(11) NOT NULL COMMENT '1=PENDING| 2=DONE',
  `TRANSACTION_MOP_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`TRANSACTION_ID`, `USER_ID`, `TRANSACTION_TYPE`, `TEANSACTION_DATE`, `TRANSCTION_MOP`, `TRANSACTION_STATUS`, `TRANSACTION_MOP_ID`) VALUES
(1, 1, 1, '2016-09-12 07:28:29', 1, 1, 0),
(2, 1, 1, '2016-09-12 07:29:35', 1, 1, 0),
(3, 1, 1, '2016-09-12 07:43:38', 3, 1, 0),
(4, 1, 1, '2016-09-12 07:44:39', 1, 1, 0),
(5, 1, 1, '2016-09-12 09:49:08', 1, 1, 0),
(6, 3, 1, '2016-09-12 10:16:35', 1, 1, 0),
(7, 1, 1, '2016-09-15 06:26:36', 1, 1, 14),
(8, 1, 1, '2016-09-15 06:38:24', 1, 1, 15),
(9, 1, 1, '2016-09-15 06:40:18', 1, 1, 16),
(10, 1, 1, '2016-09-15 07:24:20', 1, 1, 17),
(11, 1, 1, '2016-09-15 08:02:46', 1, 1, 20),
(12, 1, 1, '2016-09-15 08:10:04', 1, 1, 21),
(13, 1, 1, '2016-09-15 08:15:01', 1, 1, 22),
(14, 1, 1, '2016-09-15 09:18:44', 1, 1, 23),
(15, 1, 1, '2016-09-15 09:43:44', 1, 1, 24),
(16, 1, 1, '2016-09-15 09:46:01', 1, 1, 26),
(17, 5, 1, '2016-09-15 09:46:03', 1, 1, 27),
(18, 5, 1, '2016-09-15 10:13:55', 1, 1, 28),
(19, 1, 1, '2016-09-15 17:12:48', 1, 1, 29);

-- --------------------------------------------------------

--
-- Table structure for table `transaction_detail`
--

DROP TABLE IF EXISTS `transaction_detail`;
CREATE TABLE `transaction_detail` (
  `TD_ID` int(11) NOT NULL,
  `TRANSACTION_ID` int(11) NOT NULL,
  `PRODUCT_ID` int(11) NOT NULL,
  `TD_QTY` int(11) NOT NULL,
  `TD_TOTAL` double(18,2) NOT NULL,
  `TD_DESCRIPTION` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transaction_detail`
--

INSERT INTO `transaction_detail` (`TD_ID`, `TRANSACTION_ID`, `PRODUCT_ID`, `TD_QTY`, `TD_TOTAL`, `TD_DESCRIPTION`) VALUES
(1, 2, 16, 1, 6980.30, ''),
(2, 2, 18, 1, 7226.18, ''),
(3, 2, 24, 1, 9572.56, ''),
(4, 2, 22, 1, 8056.48, ''),
(5, 3, 16, 1, 6980.30, ''),
(6, 3, 18, 1, 7226.18, ''),
(7, 3, 24, 1, 9572.56, ''),
(8, 3, 22, 1, 8056.48, ''),
(9, 4, 15, 1, 8357.01, ''),
(10, 4, 6, 1, 5497007.00, ''),
(11, 5, 6, 1, 5497007.00, ''),
(12, 5, 14, 1, 7916.84, ''),
(13, 6, 1, 1, 6314.01, ''),
(14, 0, 1, 1, 6314.01, ''),
(15, 0, 2, 1, 6799.70, ''),
(16, 0, 1, 1, 6314.01, ''),
(17, 7, 19, 1, 8063.90, ''),
(18, 8, 1, 1, 6314.01, ''),
(19, 9, 1, 1, 6314.01, ''),
(20, 10, 1, 1, 6314.01, ''),
(21, 11, 1, 1, 6314.01, 'Coopertires 185/60R15C DISCOVERER HT/3'),
(22, 12, 1, 1, 6314.01, 'Coopertires 185/60R15C DISCOVERER HT/3'),
(23, 12, 2, 1, 6799.70, 'Coopertires 205/65R15C DISCOVERER HT/T3'),
(24, 12, 3, 1, 5528.97, 'Coopertires P205/75R15 DISCOVERER H/T'),
(25, 12, 19, 1, 8063.90, '8 Black Full Machine Wheels'),
(26, 12, 11, 1, 7014.38, 'Motolite Gold'),
(27, 12, 13, 1, 7068.61, 'Motolite Truckmaster'),
(28, 13, 1, 1, 6314.01, 'Coopertires 185/60R15C DISCOVERER HT/3'),
(29, 13, 2, 1, 6799.70, 'Coopertires 205/65R15C DISCOVERER HT/T3'),
(30, 14, 1, 1, 6314.01, 'Coopertires 185/60R15C DISCOVERER HT/3'),
(31, 14, 2, 1, 6799.70, 'Coopertires 205/65R15C DISCOVERER HT/T3'),
(32, 0, 1, 1, 6314.01, 'Coopertires 185/60R15C DISCOVERER HT/3'),
(33, 15, 1, 1, 6314.01, 'Coopertires 185/60R15C DISCOVERER HT/3'),
(34, 15, 2, 1, 6799.70, 'Coopertires 205/65R15C DISCOVERER HT/T3'),
(35, 15, 3, 1, 5528.97, 'Coopertires P205/75R15 DISCOVERER H/T'),
(36, 15, 4, 1, 6309.34, 'Coopertires P215/75R15 DISCOVERER A/T'),
(37, 16, 1, 1, 6314.01, 'Coopertires 185/60R15C DISCOVERER HT/3'),
(38, 16, 2, 1, 6799.70, 'Coopertires 205/65R15C DISCOVERER HT/T3'),
(39, 16, 3, 1, 5528.97, 'Coopertires P205/75R15 DISCOVERER H/T'),
(40, 16, 10, 1, 5625.29, 'Motolite Excel'),
(41, 16, 11, 1, 7014.38, 'Motolite Gold'),
(42, 16, 12, 1, 6792.07, 'Motolite LM-Enforcer'),
(43, 17, 1, 1, 6314.01, 'Coopertires 185/60R15C DISCOVERER HT/3'),
(44, 18, 1, 1, 6314.01, 'Coopertires 185/60R15C DISCOVERER HT/3'),
(45, 18, 17, 1, 8336.89, '8 Black Full Machine Wheels'),
(46, 19, 1, 1, 6314.01, 'Coopertires 185/60R15C DISCOVERER HT/3');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `USER_ID` int(11) NOT NULL,
  `USER_FNAME` varchar(255) NOT NULL,
  `USER_LNAME` varchar(255) NOT NULL,
  `USER_M_INITIAL` char(1) NOT NULL,
  `USER_EMAIL` varchar(255) NOT NULL,
  `USER_PASSWORD` varchar(255) NOT NULL,
  `USER_ADDRESS` text NOT NULL,
  `USER_GENDER` int(11) NOT NULL,
  `USER_CONTACT_NO` varchar(255) NOT NULL,
  `USER_TYPE_ID` int(11) NOT NULL COMMENT '0-admin | 1-sec | 2- user | 3 -guest',
  `USER_DELIVERY_NAME` varchar(255) NOT NULL,
  `USER_DELIVERY_DETAIL` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`USER_ID`, `USER_FNAME`, `USER_LNAME`, `USER_M_INITIAL`, `USER_EMAIL`, `USER_PASSWORD`, `USER_ADDRESS`, `USER_GENDER`, `USER_CONTACT_NO`, `USER_TYPE_ID`, `USER_DELIVERY_NAME`, `USER_DELIVERY_DETAIL`) VALUES
(1, 'TEST', 'TEST', '', 'TEST@TEST.COM', 'TEST', '', 0, 'TEST', 2, '', ''),
(2, 'ciara', 'mirasol', '', 'ceeyawah@gmail.com', 'tQUISO', '', 0, '4320871', 2, '', ''),
(3, 'Nash', 'Mori', '', 'nashmori@ymail.com', 'Haha1234', '', 0, '09173125621', 2, '', ''),
(4, 'ADMIN', 'ADMIN', 'A', 'admin@admin.com', 'ADMIN', 'ADMIN ADDRESS', 1, '123456789', 0, '', ''),
(5, 'Jon', 'Jan', '', 'jon@gmail.com', '12345', '', 0, '9808908', 2, '', '');

-- --------------------------------------------------------

--
-- Table structure for table `wheel`
--

DROP TABLE IF EXISTS `wheel`;
CREATE TABLE `wheel` (
  `WHEEL_ID` int(11) NOT NULL,
  `PRODUCT_ID` int(11) NOT NULL,
  `WHEEL_RIM` varchar(255) NOT NULL,
  `WHEEL_BRAND` varchar(255) NOT NULL,
  `WHEEL_COLOR` varchar(255) NOT NULL,
  `WHEEL_HOLES` int(11) NOT NULL,
  `WHEEL_IMAGE_FNAME` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `wheel`
--

INSERT INTO `wheel` (`WHEEL_ID`, `PRODUCT_ID`, `WHEEL_RIM`, `WHEEL_BRAND`, `WHEEL_COLOR`, `WHEEL_HOLES`, `WHEEL_IMAGE_FNAME`) VALUES
(1, 15, '', 'Wheel Master', 'Black Finish Matt', 11, 'wmc.jpg'),
(2, 16, '', 'Wheel Master', 'Black Full Machine', 11, 'wmc.jpg'),
(3, 17, '', 'Wheel Master', 'Black Full Machine', 8, 'wmc.jpg'),
(4, 18, '', 'Wheel Master', 'Black Full Machine', 8, 'WMC 6973 Black Full Machine and MAtt Black = Batch1.jpg'),
(5, 19, '', 'Wheel Master', 'Black Full Machine', 8, 'WMC 6973 Black Full Machine and MAtt Black = Batch1.jpg'),
(6, 20, '', 'Wheel Master', 'Chrome', 8, 'WMC 517 Chrome = Batch2.jpg'),
(7, 21, '', 'Wheel Master', 'Chrome', 8, 'WMC 553 Chrome = Batch2.jpg'),
(8, 22, '', 'Wheel Master', 'Chrome', 8, 'WMC 612 Chrome = Batch2.jpg'),
(9, 23, '', 'Wheel Master', 'Full Silver', 8, 'WMC 8006 Full Silver = Batch2.jpg'),
(10, 24, '', 'Wheel Master', 'Full Silver', 8, 'WMC 8006 Full Silver = Batch2.jpg'),
(11, 25, '', 'Wheel Master', 'Full Silver', 8, 'WMC 8006 Full Silver = Batch2.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `battery`
--
ALTER TABLE `battery`
  ADD PRIMARY KEY (`BATTERY_ID`);

--
-- Indexes for table `cheque`
--
ALTER TABLE `cheque`
  ADD PRIMARY KEY (`CHEQUE_ID`);

--
-- Indexes for table `cod`
--
ALTER TABLE `cod`
  ADD PRIMARY KEY (`COD_ID`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`COMMENT_ID`);

--
-- Indexes for table `credit_card`
--
ALTER TABLE `credit_card`
  ADD PRIMARY KEY (`CC_ID`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`PRODUCT_ID`);

--
-- Indexes for table `rescue`
--
ALTER TABLE `rescue`
  ADD PRIMARY KEY (`RESCUE_ID`);

--
-- Indexes for table `temp_transaction_detail`
--
ALTER TABLE `temp_transaction_detail`
  ADD PRIMARY KEY (`TEMP_ID`);

--
-- Indexes for table `tire`
--
ALTER TABLE `tire`
  ADD PRIMARY KEY (`TIRE_ID`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`TRANSACTION_ID`);

--
-- Indexes for table `transaction_detail`
--
ALTER TABLE `transaction_detail`
  ADD PRIMARY KEY (`TD_ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`USER_ID`);

--
-- Indexes for table `wheel`
--
ALTER TABLE `wheel`
  ADD PRIMARY KEY (`WHEEL_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `battery`
--
ALTER TABLE `battery`
  MODIFY `BATTERY_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `cheque`
--
ALTER TABLE `cheque`
  MODIFY `CHEQUE_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `cod`
--
ALTER TABLE `cod`
  MODIFY `COD_ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `COMMENT_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `credit_card`
--
ALTER TABLE `credit_card`
  MODIFY `CC_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `PRODUCT_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT for table `rescue`
--
ALTER TABLE `rescue`
  MODIFY `RESCUE_ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `temp_transaction_detail`
--
ALTER TABLE `temp_transaction_detail`
  MODIFY `TEMP_ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tire`
--
ALTER TABLE `tire`
  MODIFY `TIRE_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `TRANSACTION_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `transaction_detail`
--
ALTER TABLE `transaction_detail`
  MODIFY `TD_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `USER_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `wheel`
--
ALTER TABLE `wheel`
  MODIFY `WHEEL_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
