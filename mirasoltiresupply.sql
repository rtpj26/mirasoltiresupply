-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 31, 2016 at 04:19 AM
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
  `BATTERY_TYPE` int(11) NOT NULL,
  `BATTERY_PLATES` int(11) NOT NULL,
  `BATTERY_CLASSIC_HR` varchar(255) NOT NULL,
  `BATTERY_TRUCKMASTER` varchar(255) NOT NULL,
  `BATTERY_SUPER_PREM` varchar(255) NOT NULL,
  `BATTERY_IMAGE_FNAME` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `battery`
--

INSERT INTO `battery` (`BATTERY_ID`, `PRODUCT_ID`, `BATTERY_TYPE`, `BATTERY_PLATES`, `BATTERY_CLASSIC_HR`, `BATTERY_TRUCKMASTER`, `BATTERY_SUPER_PREM`, `BATTERY_IMAGE_FNAME`) VALUES
(1, 10, 1, 2, 'TEST', 'TEST', 'TEST', 'bat1.png');

-- --------------------------------------------------------

--
-- Table structure for table `cheque`
--

DROP TABLE IF EXISTS `cheque`;
CREATE TABLE `cheque` (
  `CHEQUE_ID` int(11) NOT NULL,
  `TRANSACTION_ID` int(11) NOT NULL,
  `CHEQUE_DATE_ISSUED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `CHEQUE_BANK` varchar(255) NOT NULL,
  `CHEQUE_NUMBER` varchar(255) NOT NULL,
  `CHEQUE_DATE_RECEIVED` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `COMMENT_MESSAGE` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `CC_DATE_ISSUED` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `CC_BANK` varchar(255) NOT NULL,
  `CC_NAME_IN_CARD` varchar(255) NOT NULL,
  `CC_EXPIRATION_DATE` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `CC_CARD_TYPE` int(11) NOT NULL,
  `CC_SECURITY_CODE` varchar(255) NOT NULL,
  `CC_BILLING_ADDRESS` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(6, 1, 5497007.00, 10),
(7, 1, 5564.10, 10),
(8, 1, 6276.12, 10),
(9, 1, 7820.95, 10),
(10, 3, 5625.29, 10),
(11, 1, 7014.38, 10),
(12, 1, 6792.07, 10),
(13, 1, 7068.61, 10),
(14, 1, 7916.84, 10),
(15, 1, 8357.01, 10),
(16, 1, 6980.30, 10),
(17, 1, 8336.89, 10),
(18, 1, 7226.18, 10),
(19, 1, 8063.90, 10),
(20, 1, 7546.03, 10),
(21, 1, 8534.45, 10),
(22, 1, 8056.48, 10),
(23, 1, 8893.03, 10),
(24, 1, 9572.56, 10),
(25, 1, 8552.47, 10);

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
(1, 1, '60R15C', '185', '94/92T', 'Coopertires', 'DISCOVERER HT/3', '', 't1.png'),
(2, 2, '65R15C', '205', '102/100T', 'Coopertires', 'DISCOVERER HT/T3', '', 't1.png'),
(3, 3, '75R15', 'P205', '97S', 'Coopertires', 'DISCOVERER H/T', '', 't1.png'),
(4, 4, '75R15', 'P215', '100S', 'Coopertires', 'DISCOVERER A/T', '', 't1.png'),
(5, 5, '70R15', '225', '100T', 'Coopertires', 'DISCOVERER A/T3', '', 't1.png'),
(6, 6, '70R15', 'P225', '100A', 'Coopertires', 'DISCOVERER H/T', '', 't1.png'),
(7, 7, 'T5R15', 'P225', '102S', 'Coopertires', 'DISCOVERER H/T', '', 't1.png'),
(8, 8, '70R15', 'P235', '102S', 'Coopertires', 'DISCOVERER H/T', '', 't1.png'),
(9, 9, 'T5R15XL', '235', '109T', 'Coopertires', 'DISCOVERER H/T', '', 't1.png');

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
  `TRANSACTION_STATUS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `TD_TOTAL` double(18,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `USER_TYPE_ID` int(11) NOT NULL COMMENT '0-admin | 1-sec | 2- user | 3 -guest'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`USER_ID`, `USER_FNAME`, `USER_LNAME`, `USER_M_INITIAL`, `USER_EMAIL`, `USER_PASSWORD`, `USER_ADDRESS`, `USER_GENDER`, `USER_CONTACT_NO`, `USER_TYPE_ID`) VALUES
(1, 'TEST', 'TEST', '', 'TEST@TEST.COM', 'TEST', '', 0, 'TEST', 2),
(2, 'ciara', 'mirasol', '', 'ceeyawah@gmail.com', 'tQUISO', '', 0, '4320871', 2),
(3, 'Nash', 'Mori', '', 'nashmori@ymail.com', 'Haha1234', '', 0, '09173125621', 2);

-- --------------------------------------------------------

--
-- Table structure for table `wheel`
--

DROP TABLE IF EXISTS `wheel`;
CREATE TABLE `wheel` (
  `WHEEL_ID` int(11) NOT NULL,
  `PRODUCT_ID` int(11) NOT NULL,
  `WHEEL_RIM` varchar(255) NOT NULL,
  `WHEEL_CODE` varchar(255) NOT NULL,
  `WHEEL_COLOR` varchar(255) NOT NULL,
  `WHEEL_HOLES` int(11) NOT NULL,
  `WHEEL_IMAGE_FNAME` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  MODIFY `BATTERY_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `cheque`
--
ALTER TABLE `cheque`
  MODIFY `CHEQUE_ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `cod`
--
ALTER TABLE `cod`
  MODIFY `COD_ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `COMMENT_ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `credit_card`
--
ALTER TABLE `credit_card`
  MODIFY `CC_ID` int(11) NOT NULL AUTO_INCREMENT;
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
-- AUTO_INCREMENT for table `tire`
--
ALTER TABLE `tire`
  MODIFY `TIRE_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `TRANSACTION_ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `transaction_detail`
--
ALTER TABLE `transaction_detail`
  MODIFY `TD_ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `USER_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `wheel`
--
ALTER TABLE `wheel`
  MODIFY `WHEEL_ID` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
