-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 03, 2024 at 04:42 PM
-- Server version: 10.6.19-MariaDB-log
-- PHP Version: 8.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vizitkeb_bpikd`
--

-- --------------------------------------------------------

--
-- Table structure for table `about`
--

CREATE TABLE `about` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `publishTime` text DEFAULT NULL,
  `scheduledPublishTime` datetime DEFAULT NULL,
  `externalSource` varchar(255) DEFAULT NULL,
  `visibility` varchar(255) DEFAULT NULL,
  `isPublished` tinyint(1) DEFAULT NULL,
  `featured` varchar(255) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `category` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `about`
--

INSERT INTO `about` (`id`, `title`, `content`, `publishTime`, `scheduledPublishTime`, `externalSource`, `visibility`, `isPublished`, `featured`, `createdBy`, `created_at`, `updated_at`, `category`) VALUES
(24, 'What is Bpikd?', '<p>BPIKD objavljiva poznate ličnosti.</p>', 'NaN-NaN-NaN NaN:NaN:NaN.NaN', '2024-04-30 13:44:01', NULL, 'Public', 1, NULL, 'admin', '2024-04-20 17:35:18', '2024-06-21 19:04:06', 'About');

-- --------------------------------------------------------

--
-- Table structure for table `button1`
--

CREATE TABLE `button1` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `publishTime` text DEFAULT NULL,
  `scheduledPublishTime` datetime DEFAULT NULL,
  `externalSource` varchar(255) DEFAULT NULL,
  `visibility` varchar(255) DEFAULT NULL,
  `isPublished` tinyint(1) DEFAULT NULL,
  `featured` varchar(255) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `category` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `button1`
--

INSERT INTO `button1` (`id`, `title`, `content`, `publishTime`, `scheduledPublishTime`, `externalSource`, `visibility`, `isPublished`, `featured`, `createdBy`, `created_at`, `updated_at`, `category`) VALUES
(1, 'Donate Bpikd', '<p>Donate to our fondation</p>', 'NaN-NaN-NaN NaN:NaN:NaN.NaN', '2024-06-11 00:21:26', NULL, 'Public', 1, NULL, 'admin', '2024-06-10 20:21:47', '2024-06-21 19:06:35', 'Button1');

-- --------------------------------------------------------

--
-- Table structure for table `button2`
--

CREATE TABLE `button2` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `publishTime` text DEFAULT NULL,
  `scheduledPublishTime` datetime DEFAULT NULL,
  `externalSource` varchar(255) DEFAULT NULL,
  `visibility` varchar(255) DEFAULT NULL,
  `isPublished` tinyint(1) DEFAULT NULL,
  `featured` varchar(255) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `category` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `button2`
--

INSERT INTO `button2` (`id`, `title`, `content`, `publishTime`, `scheduledPublishTime`, `externalSource`, `visibility`, `isPublished`, `featured`, `createdBy`, `created_at`, `updated_at`, `category`) VALUES
(1, 'Submit Document ', '<p>BPIKD publishes documents of political or historical importance that are censored or otherwise suppressed. We specialise in strategic global publishing and large archives.</p><p>The following is the address of our secure site where you can anonymously upload your documents to WikiLeaks editors. You can only access this submissions system through Tor. (See our Tor tab for more information.) We also advise you to read our tips for sources before submitting.</p>', 'Now', '2024-06-21 23:05:29', NULL, 'Public', 1, NULL, 'admin', '2024-04-21 10:26:43', '2024-06-21 19:05:43', 'Button2');

-- --------------------------------------------------------

--
-- Table structure for table `footer_companies`
--

CREATE TABLE `footer_companies` (
  `id` int(11) NOT NULL,
  `company` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `src` varchar(255) DEFAULT NULL,
  `last_updated` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `footer_companies`
--

INSERT INTO `footer_companies` (`id`, `company`, `description`, `url`, `src`, `last_updated`) VALUES
(1, 'Wikileaks', 'WL Research Community - user contributed research based on documents published by WikiLeaks.', 'https://wikileaks.org/ ', 'https://bpikd.vizitke.ba/api/uploads/footer/companyImage-0.png', '2024-06-11 11:36:37'),
(2, 'Tor ', 'Tor is an encrypted anonymising network that makes it harder to intercept internet communications, or see where communications are coming from or going to.', 'https://www.torproject.org/', 'https://bpikd.vizitke.ba/api/uploads/footer/companyImage-1.png', '2024-06-11 11:36:37'),
(3, 'Tails', ' Tails is a live operating system, that you can start on almost any computer from a DVD, USB stick, or SD card. It aims at preserving your privacy and anonymity.', 'https://tails.net/', 'https://bpikd.vizitke.ba/api/uploads/footer/companyImage-2.png', '2024-06-11 11:36:37'),
(4, 'Courage', ' Tails is a live operating system, that you can start on almost any computer from a DVD, USB stick, or SD card. It aims at preserving your privacy and anonymity.', 'https://www.couragefound.org/', 'https://bpikd.vizitke.ba/api/uploads/footer/companyImage-3.png', '2024-06-11 11:36:37'),
(5, 'Bitcoin', 'Bitcoin uses peer-to-peer technology to operate with no central authority or banks; managing transactions and the issuing of bitcoins is carried out collectively by the network.', 'https://bitcoin.org/', 'https://bpikd.vizitke.ba/api/uploads/footer/companyImage-4.png', '2024-06-11 11:36:37');

-- --------------------------------------------------------

--
-- Table structure for table `footer_config`
--

CREATE TABLE `footer_config` (
  `id` int(11) NOT NULL,
  `companies` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`companies`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `header_config`
--

CREATE TABLE `header_config` (
  `id` int(11) NOT NULL,
  `routes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`routes`)),
  `buttons` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`buttons`)),
  `logo_img_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `header_config`
--

INSERT INTO `header_config` (`id`, `routes`, `buttons`, `logo_img_path`) VALUES
(1, '\"{\\\"person\\\":\\\"Person of Interest\\\",\\\"news\\\":\\\"News\\\",\\\"about\\\":\\\"About\\\",\\\"partners\\\":\\\"Partners\\\",\\\"shop\\\":\\\"Shop\\\",\\\"soon\\\":\\\"Coming\\\"}\"', '\"{\\\"button1\\\":\\\"Donate\\\",\\\"button2\\\":\\\"Submit\\\"}\"', 'https://bpikd.site/uploads/header/logo.png');

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `id` int(11) NOT NULL,
  `work_id` int(11) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `fileType` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `media`
--

INSERT INTO `media` (`id`, `work_id`, `url`, `name`, `fileType`, `type`) VALUES
(432, 309, 'https://bpikd.site/person-of-interest/dr.-nele-karajlic/najnoviji/documents/2024-05-27_uoaeno-za-korekturu.docx', '2024-05-27_uoÄeno za korekturu.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'documents'),
(434, 309, 'https://bpikd.site/person-of-interest/dr.-nele-karajlic/najnoviji/documents/worklog.pdf', 'worklog.pdf', 'application/pdf', 'documents'),
(436, 310, 'https://bpikd.site/person-of-interest/bruce-lee/19401958-early-roles-schooling-and-martial-arts-initiation/documents/akreditacije-ekipa-2024.pdf', 'Akreditacije ekipa 2024.pdf', 'application/pdf', 'documents');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `content` longtext DEFAULT NULL,
  `publishTime` text DEFAULT 'Now',
  `scheduledPublishTime` datetime DEFAULT NULL,
  `externalSource` varchar(255) DEFAULT NULL,
  `visibility` varchar(255) DEFAULT NULL,
  `isPublished` tinyint(1) DEFAULT 1,
  `featured` varchar(255) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `category`, `title`, `content`, `publishTime`, `scheduledPublishTime`, `externalSource`, `visibility`, `isPublished`, `featured`, `createdBy`, `created_at`, `updated_at`) VALUES
(34, 'News', 'Halo im here ', '<p>Where am I</p>', 'Now', '2024-05-29 12:22:49', NULL, 'Public', 1, NULL, 'admin', '2024-05-29 12:22:51', '2024-05-29 12:22:51'),
(35, 'News', 'Example story ', '<h2>The anatomy of a news story</h2><p>The following article (which can be&nbsp;<a href=\"https://www.imperial.ac.uk/news/189612/quicker-safer-test-could-accurately-detect/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(0, 110, 175);\">read in full on the News site</a>) is, in many ways, a ‘typical’ Imperial research story. Take a look through the News site and you will see many structured just like it.</p>', 'Now', '2024-05-29 12:35:31', NULL, 'Public', 1, NULL, 'admin', '2024-05-29 12:35:37', '2024-05-29 12:35:37');
INSERT INTO `news` (`id`, `category`, `title`, `content`, `publishTime`, `scheduledPublishTime`, `externalSource`, `visibility`, `isPublished`, `featured`, `createdBy`, `created_at`, `updated_at`) VALUES
(36, 'News', 'Bill Gates', '<p>2024-06-22 - Bill Gates&nbsp;napušta Microsoft Corporation.</p><p><img src=\"data:image/png;base64,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\"></p><p><img src=\"data:image/jpeg;base64,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\"></p>', 'Now', '2024-07-01 07:41:57', NULL, 'Public', 1, NULL, 'admin', '2024-06-21 19:02:41', '2024-07-01 05:42:01');
INSERT INTO `news` (`id`, `category`, `title`, `content`, `publishTime`, `scheduledPublishTime`, `externalSource`, `visibility`, `isPublished`, `featured`, `createdBy`, `created_at`, `updated_at`) VALUES
(42, 'News', 'Example story 2', '<p><span style=\"color: rgb(0, 0, 0);\">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></p><p><span style=\"color: rgb(0, 0, 0);\">﻿</span></p>', 'Now', '2024-06-26 09:48:36', NULL, 'Public', 1, 'https://bpikd.vizitke.ba/api/uploads/featuredImage-1719388126918.jpg', 'admin', '2024-06-24 08:52:27', '2024-06-26 07:48:46'),
(43, 'News', 'Example story 3', '<p>FANHEADS BY VOYAGEPRINT. Not fat, our heads are P.h.a.t. Comes with Stick. Super High Quality Unleash the fun at your next event with our custom \"Head on a Stick\" cut outs!</p>', 'Now', '2024-06-26 18:19:52', NULL, 'Public', 1, NULL, 'admin', '2024-06-26 16:19:54', '2024-06-26 16:19:54'),
(44, 'News', 'Example story 4', '<p>FANHEADS BY VOYAGEPRINT. Not fat, our heads are P.h.a.t. Comes with Stick. Super High Quality Unleash the fun at your next event with our custom \"Head on a Stick\" cut outs!</p>', 'Now', '2024-07-25 10:16:42', NULL, 'Public', 1, NULL, 'admin', '2024-06-26 16:20:44', '2024-07-25 08:16:45'),
(45, 'About', 'About page ', '<p>About page opis</p>', 'Now', '2024-06-30 10:49:57', NULL, 'Public', 1, 'https://bpikd.vizitke.ba/api/uploads/featuredImage-1719737399001.jpg', 'admin', '2024-06-30 08:49:59', '2024-06-30 08:49:59'),
(46, 'Button2', 'Button 2 page', '<p>Button 2 page example</p>', 'Now', '2024-06-30 10:50:09', NULL, 'Public', 1, NULL, 'admin', '2024-06-30 08:50:21', '2024-06-30 08:50:21'),
(47, 'Button1', 'Button 1 page ', '<p>Button 1 page example</p>', 'Now', '2024-06-30 10:50:46', NULL, 'Public', 1, 'https://bpikd.vizitke.ba/api/uploads/featuredImage-1719737448706.jpeg', 'admin', '2024-06-30 08:50:48', '2024-06-30 08:50:48'),
(48, 'Shop', 'Shop page 1', '<p>Shop page no 1 </p>', 'Now', '2024-06-30 10:51:38', NULL, 'Public', 1, 'https://bpikd.vizitke.ba/api/uploads/featuredImage-1719737502055.jpg', 'admin', '2024-06-30 08:51:42', '2024-06-30 08:51:42'),
(50, 'About', 'Esmeralda', '<p>Esmeralda je meksička telenovela produkcijske kuće Televisa koja se 1998. i 1999. prikazivala u Hrvatskoj. Glavne uloge imali su Leticia Calderón i Fernando Colunga. Jedne olujne noći, Dominga porađa dječaka, čija majka nedugo zatim umire. U međuvremenu, na imanju obitelji Peñarreal, Blanca De Velasco de Peñarreal također rađa. Njen suprug, Don Rodolfo Peñarreal, nestrpljivo čeka kraj poroda u nadi da će dobiti sina. Njihov liječnik ne stiže na imanje jer je oluja prejaka. Obitelj stoga poziva Domingu, koja im donosi dijete.</p>', 'Now', '2024-06-30 12:00:40', NULL, 'Public', 1, NULL, 'admin', '2024-06-30 10:00:42', '2024-06-30 10:00:42'),
(54, 'About', 'Esmeralda 4', '<p>To je ta esmeralda</p>', 'Now', '2024-07-01 07:42:32', NULL, 'Public', 1, NULL, 'admin', '2024-07-01 05:42:27', '2024-07-01 05:42:35'),
(55, 'Soon', 'Xena', '<p><span style=\"color: rgb(4, 33, 0);\">Xena: Princeza ratnica</span></p>', 'Now', '2024-07-29 07:50:13', NULL, 'Public', 1, 'https://bpikd.site//uploads/featuredImage-1722239416611.jpeg', 'admin', '2024-07-29 07:50:16', '2024-07-29 07:50:16');

-- --------------------------------------------------------

--
-- Table structure for table `partners`
--

CREATE TABLE `partners` (
  `id` int(11) NOT NULL,
  `imagePath` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `partners`
--

INSERT INTO `partners` (`id`, `imagePath`, `createdAt`, `url`) VALUES
(237, 'https://bpikd.vizitke.ba/api/uploads/partners/partnersImages-0.png', '2024-06-21 18:54:42', 'https://www.paypal.com/'),
(238, 'https://bpikd.vizitke.ba/api/uploads/partners/partnersImages-1.png', '2024-06-21 18:54:42', 'https://www.couragefound.org/');

-- --------------------------------------------------------

--
-- Table structure for table `persons`
--

CREATE TABLE `persons` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `aboutPerson` text DEFAULT NULL,
  `featured` varchar(255) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `category` varchar(255) DEFAULT NULL,
  `visibility` varchar(255) DEFAULT NULL,
  `fullName` varchar(255) GENERATED ALWAYS AS (concat(`firstName`,' ',`lastName`)) STORED,
  `externalSource` varchar(255) DEFAULT NULL,
  `scheduledPublishTime` datetime DEFAULT current_timestamp(),
  `view_count` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `persons`
--

INSERT INTO `persons` (`id`, `firstName`, `lastName`, `aboutPerson`, `featured`, `createdBy`, `created_at`, `updated_at`, `category`, `visibility`, `externalSource`, `scheduledPublishTime`, `view_count`) VALUES
(173, 'Bruce', 'Lee', 'Bruce Lee[b] (born Lee Jun-fan;[c] November 27, 1940 – July 20, 1973) was a Hong Kong-American martial artist and actor. He was the founder of Jeet Kune Do, a hybrid martial arts philosophy drawing from different combat disciplines that is sometimes credited with paving the way for the combat sport mixed martial arts (MMA).[3] Lee is considered by some commentators and martial artists to be the most influential martial artist of all time and a pop culture icon of the 20th century, who bridged the gap between East and West. He is credited with promoting Hong Kong action cinema and helping to change the way Chinese people were presented in American films.[4]', 'https://bpikd.vizitke.ba/api/featured/person-173.jpeg', 'admin', '2024-06-11 09:39:05', '2024-09-03 10:44:27', 'Person of Interest', 'Public', NULL, '2024-06-11 11:39:05', 155),
(174, 'Arnold', 'Schwarzenegger', 'Arnold Alois Schwarzenegger (born July 30, 1947) is an Austrian and American actor, businessman, filmmaker, former politician, and former professional bodybuilder known for his roles in high-profile action movies. He served as the 38th governor of California from 2003 to 2011 and was among Time\'s 100 most influential people in the world in 2004 and 2007.[5][6]', 'https://bpikd.vizitke.ba/api/featured/person-arnold.jpeg', 'admin', '2024-06-11 09:42:16', '2024-09-03 09:00:37', 'Person of Interest', 'Public', NULL, '2024-06-11 11:42:16', 48),
(175, 'Zdravko', 'Čolić', 'Rođen je 30. svibnja 1951. godine u Sarajevu, a djetinjstvo je proveo na Grbavici. Kao dijete se više zanimao za sport nego za glazbu. Najprije je bio golman u juniorima \"Željezničara\", da bi ubrzo shvatio kako mu atletika više leži. Na jednom natjecanju osvojio je drugo mjesto, odmah iza tadašnje atletske zvijezde Nenada Stekića.', 'https://bpikd.vizitke.ba/api/featured/person-ZdravkoColic.jpg', 'admin', '2024-06-11 10:53:51', '2024-09-03 09:38:10', 'Person of Interest', 'Public', NULL, '2024-06-11 12:53:51', 48),
(176, 'Jim', 'Carrey', 'James Eugene Carrey (/ˈkæri/; born January 17, 1962)[2] is a Canadian-American actor and comedian known for his energetic slapstick performances.[3] After spending the 1980s honing his stand-up comedy act and portraying mostly supporting roles in films, Carrey gained wide recognition in 1990 when he was cast in the American sketch comedy television series In Living Color (1990–1994). ', 'https://bpikd.vizitke.ba/api/featured/person-Screenshot_13.jpg', 'admin', '2024-06-11 10:55:35', '2024-09-03 10:42:29', 'Person of Interest', 'Public', NULL, '2024-06-11 12:55:35', 66),
(177, 'Dr. Nele', 'Karajlić', 'Nenad Janković alias Nele Karajlić (Sarajevo, 11. prosinca 1962.), bosanskohercegovački rock and roll glazbenik, skladatelj, glumac i nekadašnji televizijski direktor u Bosni i Hercegovini. Najpoznatiji kao bivši pjevač Zabranjenog pušenja.', 'https://bpikd.vizitke.ba/api/featured/person-images (1).jpg', 'admin', '2024-06-11 10:58:45', '2024-09-03 10:42:26', 'Person of Interest', 'Public', NULL, '2024-06-11 12:58:45', 151);

-- --------------------------------------------------------

--
-- Table structure for table `person_views`
--

CREATE TABLE `person_views` (
  `person_id` int(11) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `viewed_on` datetime DEFAULT current_timestamp(),
  `view_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `second_row_items`
--

CREATE TABLE `second_row_items` (
  `id` int(11) NOT NULL,
  `sortItem_id` int(11) DEFAULT NULL,
  `personId` int(11) DEFAULT NULL,
  `placeholder` tinyint(1) DEFAULT 0,
  `text` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `second_row_items`
--

INSERT INTO `second_row_items` (`id`, `sortItem_id`, `personId`, `placeholder`, `text`) VALUES
(514, 19, 173, 0, NULL),
(515, 19, 177, 0, NULL),
(516, 19, 176, 0, NULL),
(517, 19, 175, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `maintenance` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `maintenance`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `shop`
--

CREATE TABLE `shop` (
  `id` int(11) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `content` longtext DEFAULT NULL,
  `publishTime` text DEFAULT NULL,
  `scheduledPublishTime` datetime DEFAULT NULL,
  `externalSource` varchar(255) DEFAULT NULL,
  `visibility` varchar(255) DEFAULT NULL,
  `isPublished` tinyint(1) DEFAULT NULL,
  `featured` varchar(255) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shop`
--

INSERT INTO `shop` (`id`, `category`, `title`, `content`, `publishTime`, `scheduledPublishTime`, `externalSource`, `visibility`, `isPublished`, `featured`, `createdBy`, `created_at`, `updated_at`) VALUES
(1, 'Shop', 'Shop page example ', '<p><br></p><p>We can make a big shop for you</p><p><br></p><p><img src=\"data:image/png;base64,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\"></p>', 'Now', '2024-04-21 18:53:54', NULL, 'Public', 1, NULL, 'admin', '2024-04-21 14:52:45', '2024-04-30 09:40:23');

-- --------------------------------------------------------

--
-- Table structure for table `soon`
--

CREATE TABLE `soon` (
  `id` int(11) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `publishTime` text DEFAULT NULL,
  `scheduledPublishTime` datetime DEFAULT NULL,
  `externalSource` varchar(255) DEFAULT NULL,
  `visibility` varchar(255) DEFAULT NULL,
  `isPublished` tinyint(1) DEFAULT NULL,
  `featured` varchar(255) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `soon`
--

INSERT INTO `soon` (`id`, `category`, `title`, `content`, `publishTime`, `scheduledPublishTime`, `externalSource`, `visibility`, `isPublished`, `featured`, `createdBy`, `created_at`, `updated_at`) VALUES
(1, 'Soon', 'Im gonna be happy', '<p><br></p><p><strong>WikiLeaks publishes documents of political or historical importance that are censored or otherwise suppressed. We specialise in strategic global publishing and large archives.</strong></p><p>The following is the address of our secure site where you can anonymously upload your documents to WikiLeaks editors. You can only access this submissions system through Tor. (See our&nbsp;<a href=\"https://wikileaks.org/-Partners-.html#submit_help_tor\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent; color: rgb(0, 120, 198);\">Tor tab</a>&nbsp;for more information.) We also advise you to read our&nbsp;<a href=\"https://wikileaks.org/-Partners-.html#submit_help_tips\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent; color: rgb(0, 120, 198);\">tips for sources</a>&nbsp;before submitting.</p><p>And i am a very good</p>', 'Now', '2024-05-01 02:24:17', NULL, 'Public', 1, NULL, 'admin', '2024-04-21 12:50:22', '2024-05-01 00:24:19');

-- --------------------------------------------------------

--
-- Table structure for table `sort_items`
--

CREATE TABLE `sort_items` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `firstRowItem` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sort_items`
--

INSERT INTO `sort_items` (`id`, `userId`, `firstRowItem`) VALUES
(19, 1, 177);

-- --------------------------------------------------------

--
-- Table structure for table `text_settings`
--

CREATE TABLE `text_settings` (
  `id` int(11) NOT NULL DEFAULT 1,
  `isPlaying` tinyint(1) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `text` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `text_settings`
--

INSERT INTO `text_settings` (`id`, `isPlaying`, `active`, `text`) VALUES
(1, 0, 1, 'HELLO MY FRIEND THIS IS NOT POSIBLE TO DO WITHOUT YOU');

-- --------------------------------------------------------

--
-- Table structure for table `theme_settings`
--

CREATE TABLE `theme_settings` (
  `id` int(11) NOT NULL,
  `headerColor` varchar(7) DEFAULT NULL,
  `footerColor` varchar(7) DEFAULT NULL,
  `headerTextColor` varchar(7) DEFAULT NULL,
  `footerTextColor` varchar(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `theme_settings`
--

INSERT INTO `theme_settings` (`id`, `headerColor`, `footerColor`, `headerTextColor`, `footerTextColor`) VALUES
(1, '#fff', '#ebebeb', '#495f69', '#555555');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `verified` tinyint(1) DEFAULT 0,
  `password` varchar(255) NOT NULL,
  `role` enum('owner','admin','editor') NOT NULL DEFAULT 'editor',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `nickname`, `username`, `email`, `verified`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Ahmet', 'Pašalić', 'ahmo', 'ahmo', 'ahmo@example.com', 0, '$2a$10$GYv/mfWkhWOV7brNcsnIH.eZSjpNYiF80U04bVDYp73Ts7tEyVLgC', 'owner', '2024-04-14 21:00:44', '2024-05-20 18:57:09'),
(6, 'Kenan', 'Halilović', 'keno', 'admin', 'admin@example.com', 0, '$2a$10$84UXssbezohqs96EsTgewOT0au8bILOgP3EHQSf0dn.43kfCMbgpC', 'admin', '2024-04-15 15:49:50', '2024-07-29 10:05:22'),
(8, 'Samir', 'Pašalić', 'samirpasalic', 'samir123', 'samirpasalic@example.com', 0, '$2a$10$6ivO4kbCo5OcH9N7BZWwA.OS9cXi51uRwzikBARmZbDDXcLGgxKYu', 'editor', '2024-04-23 08:27:53', '2024-05-22 15:06:32'),
(9, 'Muradif', 'Mahmutović', 'Murga', 'murgadrot', 'muradif@hotmail.com', 0, '$2a$10$MESWIo2pazJn/NwRo1HQrusPJ3yOsT57PCRy.qr2WmXoEdsAgUOaG', 'admin', '2024-04-23 16:33:46', '2024-06-06 18:31:21'),
(14, 'Samir', 'Pašalić', 'samir', 'samirpasalic', 'samir@example.com', 0, '$2a$10$RmjpWgsnSt4r3naIqMEOvuntbUHEZ3NwqylrJIDA.939HobJZjF9S', 'editor', '2024-05-22 13:05:46', '2024-06-10 20:16:17');

-- --------------------------------------------------------

--
-- Table structure for table `visitors`
--

CREATE TABLE `visitors` (
  `id` int(11) NOT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `system_info` varchar(255) DEFAULT NULL,
  `count` bigint(20) DEFAULT 1,
  `last_visit` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `browser_name` varchar(255) DEFAULT NULL,
  `os` varchar(255) DEFAULT NULL,
  `platform` varchar(255) DEFAULT NULL,
  `is_mobile` tinyint(1) DEFAULT NULL,
  `is_tablet` tinyint(1) DEFAULT NULL,
  `is_desktop` tinyint(1) DEFAULT NULL,
  `device` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `visitors`
--

INSERT INTO `visitors` (`id`, `ip_address`, `system_info`, `count`, `last_visit`, `browser_name`, `os`, `platform`, `is_mobile`, `is_tablet`, `is_desktop`, `device`) VALUES
(8361, '109.163.175.170', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36', 3, '2024-06-24 19:49:52', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'M2101K6G'),
(8457, '5.161.225.238', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36', 4, '2024-06-25 08:42:52', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(8461, '109.175.109.19', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 20, '2024-06-25 10:11:17', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(8462, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 7, '2024-06-26 20:58:42', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(8482, '109.175.111.168', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 49, '2024-06-25 18:21:38', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(8496, '51.158.200.68', 'Mozilla/5.0 (Windows NT 10.0; rv:120.0) Gecko/20100101 Firefox/120.0', 37, '2024-06-25 18:19:57', 'Firefox', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(8568, '109.175.110.189', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36', 23, '2024-06-26 07:57:07', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(8582, '109.175.111.21', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:127.0) Gecko/20100101 Firefox/127.0', 10, '2024-06-26 07:28:14', 'Firefox', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(8601, '109.175.38.218', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36', 8, '2024-06-26 22:35:05', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'M2101K6G'),
(8603, '109.175.111.45', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 6, '2024-06-26 12:49:57', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(8609, '109.175.109.190', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36', 4, '2024-06-26 18:25:15', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(8610, '89.163.145.224', 'Mozilla/5.0 (Windows NT 10.0; rv:120.0) Gecko/20100101 Firefox/120.0', 5, '2024-06-26 14:50:18', 'Firefox', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(8619, '109.175.108.211', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 17, '2024-06-26 16:50:56', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(8647, '5.161.99.64', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36', 3, '2024-06-27 08:50:30', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(8650, '5.161.180.212', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36', 9, '2024-06-27 09:11:32', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(8658, '5.161.224.248', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36', 2, '2024-06-27 09:02:45', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(8660, '109.175.111.181', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36', 4, '2024-06-27 10:02:50', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(8663, '5.161.118.192', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36', 1, '2024-06-27 09:25:40', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(8666, '65.154.226.167', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.132 Safari/537.36', 2, '2024-06-27 16:12:09', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(8668, '51.159.222.56', 'Mozilla/5.0 (Windows NT 10.0; rv:120.0) Gecko/20100101 Firefox/120.0', 14, '2024-06-27 22:42:16', 'Firefox', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(8682, '51.158.200.67', 'Mozilla/5.0 (Windows NT 10.0; rv:120.0) Gecko/20100101 Firefox/120.0', 9, '2024-06-28 12:10:34', 'Firefox', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(8691, '79.238.222.172', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 2, '2024-06-29 08:11:22', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(8693, '109.163.169.189', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36', 11, '2024-07-01 07:38:45', 'Chrome', 'Linux', 'Unknown', 0, 0, 1, 'Unknown'),
(8701, '176.3.134.129', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 129, '2024-06-30 11:31:13', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(8804, '109.175.110.47', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 70, '2024-06-30 10:41:40', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(8901, '109.236.81.59', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36', 11, '2024-06-30 14:07:41', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(8913, '51.158.200.100', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36', 4, '2024-06-30 16:31:00', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(8917, '51.158.202.228', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', 7, '2024-06-30 18:50:36', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(8924, '5.161.116.95', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36', 3, '2024-06-30 18:53:24', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(8927, '5.161.55.81', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36', 5, '2024-06-30 19:42:25', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(8932, '34.215.97.157', 'Mozilla/5.0 (Linux; Android 13; SM-A037U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Mobile Safari/537.36', 1, '2024-07-01 05:23:51', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(8933, '46.189.28.120', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36', 16, '2024-07-01 06:00:58', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'SM-A145R'),
(8949, '51.158.202.235', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36', 3, '2024-07-01 08:27:33', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(8953, '109.175.38.141', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36', 2, '2024-08-08 06:30:18', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'M2101K6G'),
(8954, '185.100.234.103', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36', 7, '2024-07-25 20:51:49', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(8957, '185.100.234.227', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36', 2, '2024-07-15 19:02:25', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(8958, '89.39.104.212', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36', 2, '2024-07-09 14:04:16', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(8959, '51.158.202.230', 'Mozilla/5.0 (Linux; Android 10; LIO-L29; HMSCore 6.2.0.309) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.93 HuaweiBrowser/11.1.2.332 Mobile Safari/537.36', 1, '2024-07-03 13:26:36', 'Huawei Browser', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(8960, '175.110.115.62', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36', 2, '2024-07-04 08:49:12', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(8962, '5.161.65.213', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36', 2, '2024-07-04 08:53:58', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(8964, '5.161.190.193', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36', 1, '2024-07-04 09:35:36', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(8965, '62.112.11.43', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36', 3, '2024-07-04 19:33:45', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(8968, '62.112.10.28', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36', 1, '2024-07-05 19:00:55', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(8969, '51.158.202.242', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36', 29, '2024-07-19 17:29:39', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(8971, '109.163.168.25', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 9, '2024-07-08 09:41:35', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(8980, '10.10.11.18', 'Mozilla/5.0 (X11; Linux x86_64; rv:125.0) Gecko/20100101 Firefox/125.0', 12, '2024-07-08 10:04:25', 'Firefox', 'Linux', 'Unknown', 0, 0, 1, 'Unknown'),
(8992, '51.158.202.233', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36', 1, '2024-07-09 08:08:13', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(8994, '109.175.111.125', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 1, '2024-07-09 18:10:47', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(8995, '109.175.111.22', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 3, '2024-07-10 18:05:42', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(8998, '82.118.9.27', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 9, '2024-07-18 16:01:59', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9000, '62.54.178.57', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36', 12, '2024-07-11 16:35:52', 'Chrome', 'Linux', 'Unknown', 0, 0, 1, 'Unknown'),
(9014, '51.158.202.225', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36', 5, '2024-07-11 20:43:41', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(9019, '109.175.108.67', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 2, '2024-07-12 21:45:37', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9021, '109.175.110.250', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 109, '2024-09-02 21:32:01', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9033, '91.205.69.4', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 1, '2024-07-13 13:02:16', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9110, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 291, '2024-07-28 15:36:41', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9115, '109.163.169.46', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 10, '2024-07-14 05:38:17', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9121, '89.111.192.101', 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36', 1, '2024-07-13 22:11:45', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(9128, '154.16.192.173', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/122.0.6261.94 Safari/537.36', 1, '2024-07-13 22:15:41', 'Chrome Headless', 'Linux', 'Unknown', 0, 0, 1, 'Unknown'),
(9129, '95.177.180.85', 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1', 1, '2024-07-14 01:40:16', 'Mobile Safari', 'iOS', 'Unknown', 1, 0, 0, 'Unknown'),
(9131, '109.175.108.13', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 34, '2024-07-28 18:30:08', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9233, '13.59.80.231', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.6167.160 Safari/537.36', 1, '2024-07-14 09:31:55', 'Chrome', 'Linux', 'Unknown', 0, 0, 1, 'Unknown'),
(9234, '34.122.147.229', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/92.0.4515.159 Safari/537.36', 1, '2024-07-14 10:37:04', 'Chrome Headless', 'Linux', 'Unknown', 0, 0, 1, 'Unknown'),
(9235, '205.169.39.18', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.132 Safari/537.36', 2, '2024-08-06 17:19:02', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9236, '205.169.39.155', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36', 1, '2024-07-14 10:37:56', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9237, '205.169.39.24', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.132 Safari/537.36', 1, '2024-07-14 10:38:50', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9238, '205.169.39.136', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36', 1, '2024-07-14 10:39:05', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9239, '34.123.170.104', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/117.0.5938.132 Safari/537.36', 3, '2024-08-10 04:17:05', 'Chrome Headless', 'Linux', 'Unknown', 0, 0, 1, 'Unknown'),
(9242, '109.175.38.238', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 26, '2024-07-14 13:14:57', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9280, '109.175.111.27', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 58, '2024-07-14 16:17:42', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9338, '109.175.39.26', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36', 1, '2024-07-14 17:52:56', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'M2101K6G'),
(9339, '109.163.172.194', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36', 7, '2024-07-14 18:15:33', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'M2101K6G'),
(9344, '109.175.111.40', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 8, '2024-07-14 18:01:08', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9353, '40.77.189.217', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm) Chrome/112.0.0.0 Safari/537.36', 1, '2024-07-14 18:11:23', 'Chrome', NULL, 'Unknown', 0, 0, 1, 'Unknown'),
(9355, '109.175.108.171', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 11, '2024-07-15 05:01:12', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9366, '51.158.202.239', 'Mozilla/5.0 (Linux; Android 10; LIO-L29; HMSCore 6.2.0.309) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.93 HuaweiBrowser/11.1.2.332 Mobile Safari/537.36', 3, '2024-07-15 11:19:40', 'Huawei Browser', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(9403, '109.175.111.95', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 18, '2024-07-15 21:57:04', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9447, '178.255.148.165', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.71 Safari/537.36', 1, '2024-07-15 20:34:29', 'Chrome', 'Linux', 'Unknown', 0, 0, 1, 'Unknown'),
(9456, '109.175.39.120', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36', 1, '2024-07-15 21:37:42', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'M2101K6G'),
(9471, '205.169.39.5', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.132 Safari/537.36', 2, '2024-08-10 04:17:05', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9472, '205.169.39.219', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36', 1, '2024-07-16 02:02:03', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9473, '185.213.155.161', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 1, '2024-07-16 02:05:45', 'Chrome', 'Linux', 'Unknown', 0, 0, 1, 'Unknown'),
(9474, '94.102.63.27', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36', 1, '2024-07-16 02:07:33', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9475, '89.248.171.23', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36', 2, '2024-07-16 07:23:33', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9476, '50.17.161.38', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36', 1, '2024-07-16 02:16:40', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9477, '80.82.70.198', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36', 1, '2024-07-16 02:45:33', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9478, '109.175.38.51', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36', 7, '2024-07-16 14:00:58', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'SM-A145R'),
(9480, '109.175.108.143', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 20, '2024-07-16 06:31:44', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9501, '205.169.39.14', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.132 Safari/537.36', 2, '2024-08-02 21:01:58', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9502, '51.158.202.232', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', 5, '2024-07-16 13:52:54', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9512, '109.175.39.87', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36', 1, '2024-07-16 14:05:36', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'M2101K6G'),
(9513, '109.163.169.15', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36', 5, '2024-07-16 14:28:32', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'M2101K6G'),
(9517, '109.175.111.98', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 53, '2024-07-16 17:23:28', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9571, '109.175.108.114', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 1, '2024-07-17 05:24:22', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9572, '109.175.109.46', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36', 21, '2024-07-18 13:10:43', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9593, '178.187.54.37', 'Mozilla/5.0 (Windows NT 10.0; rv:128.0) Gecko/20100101 Firefox/128.0', 2, '2024-07-18 15:39:26', 'Firefox', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9600, '3.21.43.155', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.6167.160 Safari/537.36', 1, '2024-07-19 16:45:39', 'Chrome', 'Linux', 'Unknown', 0, 0, 1, 'Unknown'),
(9604, '34.72.176.129', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/92.0.4515.159 Safari/537.36', 2, '2024-07-25 13:20:26', 'Chrome Headless', 'Linux', 'Unknown', 0, 0, 1, 'Unknown'),
(9605, '205.169.39.22', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.132 Safari/537.36', 1, '2024-07-20 13:10:32', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9606, '205.169.39.149', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36', 1, '2024-07-20 13:10:56', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9607, '212.19.9.31', 'Mozilla/5.0 (Windows NT 10.0; rv:128.0) Gecko/20100101 Firefox/128.0', 7, '2024-07-21 06:56:02', 'Firefox', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9614, '109.175.110.67', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 36, '2024-07-22 07:02:46', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9620, '89.111.192.7', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) QtWebEngine/6.5.3 Chrome/108.0.5359.220 Safari/537.36', 1, '2024-07-22 06:38:24', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9624, '89.111.192.102', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 2, '2024-08-12 12:02:31', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9652, '190.2.154.187', 'Mozilla/5.0 (Windows NT 10.0; rv:120.0) Gecko/20100101 Firefox/120.0', 20, '2024-07-27 09:37:54', 'Firefox', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9668, '109.163.175.82', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36', 5, '2024-07-22 17:48:44', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'M2101K6G'),
(9673, '51.158.202.241', 'Mozilla/5.0 (Windows NT 10.0; rv:120.0) Gecko/20100101 Firefox/120.0', 1, '2024-07-22 17:06:55', 'Firefox', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9676, '168.151.116.199', 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/99.0.4844.47 Mobile/15E148 Safari/604.1', 1, '2024-07-22 22:30:50', 'Chrome', 'iOS', 'Unknown', 1, 0, 0, 'Unknown'),
(9677, '168.151.97.185', 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/99.0.4844.47 Mobile/15E148 Safari/604.1', 1, '2024-07-22 22:31:25', 'Chrome', 'iOS', 'Unknown', 1, 0, 0, 'Unknown'),
(9678, '168.119.68.174', 'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)', 12, '2024-09-01 08:59:15', NULL, NULL, 'Unknown', 0, 0, 1, 'Unknown'),
(9679, '3.15.163.112', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.6167.160 Safari/537.36', 1, '2024-07-24 18:36:34', 'Chrome', 'Linux', 'Unknown', 0, 0, 1, 'Unknown'),
(9686, '109.175.110.123', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 25, '2024-07-25 08:51:22', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9718, '35.165.215.140', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/124.0.0.0 Safari/537.36', 2, '2024-08-22 23:22:33', 'Chrome Headless', 'Linux', 'Unknown', 0, 0, 1, 'Unknown'),
(9719, '109.163.168.126', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36', 9, '2024-07-26 08:41:59', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'M2101K6G'),
(9728, '109.163.169.37', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36', 2, '2024-07-26 11:53:15', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'SM-A145R'),
(9746, '109.175.39.13', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36', 1, '2024-07-26 22:08:47', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'M2101K6G'),
(9750, '109.175.109.28', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 2, '2024-07-27 12:08:45', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9752, '109.175.109.220', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 5, '2024-07-27 18:42:36', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9757, '109.175.38.89', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 23, '2024-07-27 20:21:34', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9847, '::ffff:127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 1, '2024-07-28 09:22:46', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9851, '109.163.168.194', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 60, '2024-07-28 16:15:43', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9883, '109.175.111.76', 'Mozilla/5.0 (Linux; Android 10; LIO-L29; HMSCore 6.2.0.309) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.196 HuaweiBrowser/15.0.4.312 Mobile Safari/537.36', 5, '2024-07-29 08:10:12', 'Huawei Browser', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(9934, '109.175.38.29', 'Mozilla/5.0 (Linux; Android 10; LIO-L29; HMSCore 6.2.0.309) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.196 HuaweiBrowser/15.0.4.312 Mobile Safari/537.36', 1, '2024-07-28 14:10:23', 'Huawei Browser', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(9966, '109.175.108.112', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 81, '2024-07-29 12:52:13', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(9993, '109.175.110.158', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36', 18, '2024-07-29 13:07:02', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(10066, '77.78.207.5', 'Mozilla/5.0 (Linux; Android 10; LIO-L29; HMSCore 6.2.0.309) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.196 HuaweiBrowser/15.0.4.312 Mobile Safari/537.36', 1, '2024-07-29 14:52:08', 'Huawei Browser', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(10067, '109.163.174.232', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36', 1, '2024-07-29 18:49:49', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'M2101K6G'),
(10068, '109.175.111.196', 'Mozilla/5.0 (Linux; Android 10; LIO-L29; HMSCore 6.2.0.309) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.196 HuaweiBrowser/15.0.4.312 Mobile Safari/537.36', 5, '2024-07-29 19:42:29', 'Huawei Browser', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(10073, '205.169.39.16', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.132 Safari/537.36', 1, '2024-07-29 22:03:30', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(10074, '18.224.141.113', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.6167.160 Safari/537.36', 1, '2024-07-30 00:43:16', 'Chrome', 'Linux', 'Unknown', 0, 0, 1, 'Unknown'),
(10075, '66.249.66.23', 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.182 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 4, '2024-09-01 08:52:19', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(10076, '66.249.66.22', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/126.0.6478.182 Safari/537.36', 6, '2024-08-31 06:13:10', 'Chrome', NULL, 'Unknown', 0, 0, 1, 'Unknown'),
(10078, '66.249.66.9', 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.182 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 5, '2024-08-16 06:09:32', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(10079, '66.249.64.171', 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.182 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 2, '2024-07-30 13:55:54', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(10081, '66.249.75.100', 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.182 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 1, '2024-07-30 18:01:16', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(10082, '204.101.161.19', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0', 1, '2024-07-31 03:59:57', 'Edge', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(10083, '109.175.111.139', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', 1, '2024-07-31 14:24:27', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(10084, '109.175.39.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', 1, '2024-07-31 21:23:19', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(10088, '205.169.39.3', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.132 Safari/537.36', 1, '2024-08-02 21:12:52', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(10089, '3.142.218.214', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.6167.160 Safari/537.36', 1, '2024-08-04 03:03:55', 'Chrome', 'Linux', 'Unknown', 0, 0, 1, 'Unknown'),
(10093, '205.169.39.228', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36', 1, '2024-08-06 17:20:06', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(10094, '109.163.169.153', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36', 1, '2024-08-06 18:12:36', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'M2101K6G'),
(10095, '109.175.109.175', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', 3, '2024-08-06 20:27:44', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(10098, '66.249.79.75', 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.182 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 6, '2024-08-30 08:05:07', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(10100, '109.175.110.7', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', 1, '2024-08-07 12:05:02', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(10101, '109.175.109.95', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', 1, '2024-08-07 20:09:31', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(10103, '109.175.108.23', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', 1, '2024-08-08 12:00:49', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(10110, '205.169.39.218', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36', 1, '2024-08-10 04:17:39', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(10113, '167.99.219.177', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36', 7, '2024-08-11 12:51:41', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(10120, '159.223.215.73', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36', 4, '2024-08-11 12:56:45', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(10124, '109.175.39.16', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36', 6, '2024-08-11 19:43:13', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'M2101K6G'),
(10130, '31.176.210.224', 'Mozilla/5.0 (Windows NT 10.0; rv:125.0) Gecko/20100101 Firefox/125.0', 24, '2024-08-12 10:42:35', 'Firefox', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(10154, '109.175.108.160', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', 1, '2024-08-12 12:02:30', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(10156, '66.249.75.108', 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.182 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 4, '2024-08-15 04:46:25', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(10158, '66.249.75.101', 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.182 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 3, '2024-08-15 11:58:18', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(10159, '109.175.111.183', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', 17, '2024-08-13 17:31:16', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(10176, '109.175.38.11', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36', 2, '2024-08-13 17:41:52', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'SM-A145R'),
(10177, '74.125.208.102', 'Mozilla/5.0 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36 (compatible; Google-Read-Aloud; +https://support.google.com/webmasters/answer/1061943)', 1, '2024-08-13 17:40:50', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(10179, '66.102.8.129', 'Mozilla/5.0 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36 (compatible; Google-Read-Aloud; +https://support.google.com/webmasters/answer/1061943)', 1, '2024-08-13 17:41:59', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(10182, '66.249.75.107', 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.182 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 1, '2024-08-14 21:54:48', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(10189, '66.249.66.10', 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.6533.99 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 1, '2024-08-16 08:09:27', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(10190, '66.249.79.68', 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.6533.99 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 2, '2024-08-19 17:00:31', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(10192, '109.175.109.38', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', 2, '2024-08-19 14:08:21', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(10195, '109.175.38.205', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36', 2, '2024-08-20 14:35:24', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'M2101K6G'),
(10197, '113.200.73.7', 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1', 1, '2024-08-21 19:15:50', 'Mobile Safari', 'iOS', 'Unknown', 1, 0, 0, 'Unknown'),
(10199, '66.249.66.1', 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.6533.99 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 1, '2024-08-23 03:45:44', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(10200, '109.175.110.144', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', 1, '2024-08-23 08:01:24', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(10202, '128.140.84.199', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/125.0.0.0 Safari/537.36', 1, '2024-08-23 14:51:53', 'Chrome Headless', 'Linux', 'Unknown', 0, 0, 1, 'Unknown'),
(10203, '168.119.65.126', 'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)', 1, '2024-08-23 15:07:09', NULL, NULL, 'Unknown', 0, 0, 1, 'Unknown'),
(10205, '162.55.167.137', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/125.0.0.0 Safari/537.36', 1, '2024-08-26 13:39:09', 'Chrome Headless', 'Linux', 'Unknown', 0, 0, 1, 'Unknown'),
(10206, '49.13.221.183', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/125.0.0.0 Safari/537.36', 1, '2024-08-26 15:56:11', 'Chrome Headless', 'Linux', 'Unknown', 0, 0, 1, 'Unknown'),
(10207, '49.13.210.90', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/125.0.0.0 Safari/537.36', 1, '2024-08-26 16:55:22', 'Chrome Headless', 'Linux', 'Unknown', 0, 0, 1, 'Unknown'),
(10208, '128.140.86.240', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/125.0.0.0 Safari/537.36', 1, '2024-08-26 17:23:51', 'Chrome Headless', 'Linux', 'Unknown', 0, 0, 1, 'Unknown'),
(10209, '78.46.197.132', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/125.0.0.0 Safari/537.36', 1, '2024-08-26 17:29:24', 'Chrome Headless', 'Linux', 'Unknown', 0, 0, 1, 'Unknown'),
(10210, '109.175.111.179', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', 14, '2024-08-26 18:46:01', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(10224, '77.239.64.69', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 1, '2024-08-26 18:46:04', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(10225, '78.46.237.216', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/125.0.0.0 Safari/537.36', 1, '2024-08-26 19:32:44', 'Chrome Headless', 'Linux', 'Unknown', 0, 0, 1, 'Unknown'),
(10226, '49.13.211.47', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/125.0.0.0 Safari/537.36', 1, '2024-08-27 01:04:39', 'Chrome Headless', 'Linux', 'Unknown', 0, 0, 1, 'Unknown'),
(10227, '138.201.186.179', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/125.0.0.0 Safari/537.36', 1, '2024-08-27 01:32:25', 'Chrome Headless', 'Linux', 'Unknown', 0, 0, 1, 'Unknown'),
(10228, '109.175.108.106', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', 8, '2024-08-27 11:54:58', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(10236, '167.235.201.191', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/125.0.0.0 Safari/537.36', 1, '2024-08-27 17:13:12', 'Chrome Headless', 'Linux', 'Unknown', 0, 0, 1, 'Unknown'),
(10238, '109.175.38.217', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36', 1, '2024-08-28 16:01:17', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'SM-A145R'),
(10239, '74.125.208.109', 'Mozilla/5.0 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36 (compatible; Google-Read-Aloud; +https://support.google.com/webmasters/answer/1061943)', 1, '2024-08-28 16:01:22', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(10240, '66.249.65.74', 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.6533.99 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 2, '2024-08-29 01:28:06', 'Chrome', 'Android', 'Unknown', 1, 0, 0, 'Unknown'),
(10247, '90.156.231.117', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.79 Safari/537.36', 1, '2024-08-30 11:18:11', 'Chrome', 'Mac OS', 'Unknown', 0, 0, 1, 'Unknown'),
(10249, '109.175.110.243', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36', 13, '2024-08-31 12:34:37', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(10285, '109.175.110.58', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0', 70, '2024-09-03 10:44:35', 'Edge', 'Windows', 'Unknown', 0, 0, 1, 'Unknown'),
(10355, '109.175.109.226', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36', 2, '2024-09-03 14:39:38', 'Chrome', 'Windows', 'Unknown', 0, 0, 1, 'Unknown');

-- --------------------------------------------------------

--
-- Table structure for table `works`
--

CREATE TABLE `works` (
  `id` int(11) NOT NULL,
  `person_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `publishTime` varchar(255) DEFAULT 'Now',
  `isPublished` tinyint(1) DEFAULT NULL,
  `scheduledPublishTime` datetime DEFAULT NULL,
  `externalSource` varchar(255) DEFAULT NULL,
  `visibility` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `work_view_count` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `works`
--

INSERT INTO `works` (`id`, `person_id`, `title`, `content`, `publishTime`, `isPublished`, `scheduledPublishTime`, `externalSource`, `visibility`, `category`, `createdBy`, `created_at`, `updated_at`, `work_view_count`) VALUES
(309, 177, 'Najnoviji', '<p>Najnoviji post</p>', 'Now', 1, '2024-07-16 18:29:30', NULL, 'Public', 'Person of Interest', 'admin', '2024-07-16 16:21:17', '2024-09-03 09:37:47', 20),
(310, 173, '1940–1958: Early roles, schooling and martial arts initiation', '<p>Bruce Lee[b] (born Lee Jun-fan;[c] November 27, 1940 – July 20, 1973) was a Hong Kong-American martial artist and actor. He was the founder of Jeet Kune Do, a hybrid martial arts philosophy drawing from different combat disciplines that is sometimes credited with paving the way for the combat sport mixed martial arts (MMA).[3] Lee is considered by some commentators and martial artists to be the most influential martial artist of all time and a pop culture icon of the 20th century, who bridged the gap between East and West. He is credited with promoting Hong Kong action cinema and helping to change the way Chinese people were presented in American films.[4]</p>', 'Now', 1, '2024-07-18 13:10:31', NULL, 'Public', NULL, 'admin', '2024-07-18 13:10:36', '2024-09-03 10:44:19', 20);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about`
--
ALTER TABLE `about`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `button1`
--
ALTER TABLE `button1`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `button2`
--
ALTER TABLE `button2`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `footer_companies`
--
ALTER TABLE `footer_companies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `footer_config`
--
ALTER TABLE `footer_config`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_config` (`id`);

--
-- Indexes for table `header_config`
--
ALTER TABLE `header_config`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`),
  ADD KEY `work_id` (`work_id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `partners`
--
ALTER TABLE `partners`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idx_id` (`id`),
  ADD UNIQUE KEY `idx_imagePath` (`imagePath`);

--
-- Indexes for table `persons`
--
ALTER TABLE `persons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_fullName` (`fullName`);
ALTER TABLE `persons` ADD FULLTEXT KEY `idx_name` (`firstName`,`lastName`);

--
-- Indexes for table `person_views`
--
ALTER TABLE `person_views`
  ADD PRIMARY KEY (`person_id`,`ip_address`,`view_date`);

--
-- Indexes for table `second_row_items`
--
ALTER TABLE `second_row_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sortItem_id` (`sortItem_id`),
  ADD KEY `personId` (`personId`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `soon`
--
ALTER TABLE `soon`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sort_items`
--
ALTER TABLE `sort_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `firstRowItem` (`firstRowItem`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `text_settings`
--
ALTER TABLE `text_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `theme_settings`
--
ALTER TABLE `theme_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `visitors`
--
ALTER TABLE `visitors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_ip` (`ip_address`);

--
-- Indexes for table `works`
--
ALTER TABLE `works`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_person_work` (`person_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about`
--
ALTER TABLE `about`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `button1`
--
ALTER TABLE `button1`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `button2`
--
ALTER TABLE `button2`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `footer_companies`
--
ALTER TABLE `footer_companies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `footer_config`
--
ALTER TABLE `footer_config`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `header_config`
--
ALTER TABLE `header_config`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=437;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `partners`
--
ALTER TABLE `partners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=239;

--
-- AUTO_INCREMENT for table `persons`
--
ALTER TABLE `persons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=210;

--
-- AUTO_INCREMENT for table `second_row_items`
--
ALTER TABLE `second_row_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=518;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `shop`
--
ALTER TABLE `shop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `soon`
--
ALTER TABLE `soon`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sort_items`
--
ALTER TABLE `sort_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `visitors`
--
ALTER TABLE `visitors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10357;

--
-- AUTO_INCREMENT for table `works`
--
ALTER TABLE `works`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=317;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `media`
--
ALTER TABLE `media`
  ADD CONSTRAINT `fk_work_media` FOREIGN KEY (`work_id`) REFERENCES `works` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `media_ibfk_1` FOREIGN KEY (`work_id`) REFERENCES `works` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `person_views`
--
ALTER TABLE `person_views`
  ADD CONSTRAINT `person_views_ibfk_1` FOREIGN KEY (`person_id`) REFERENCES `persons` (`id`);

--
-- Constraints for table `second_row_items`
--
ALTER TABLE `second_row_items`
  ADD CONSTRAINT `second_row_items_ibfk_1` FOREIGN KEY (`sortItem_id`) REFERENCES `sort_items` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `second_row_items_ibfk_2` FOREIGN KEY (`personId`) REFERENCES `persons` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `sort_items`
--
ALTER TABLE `sort_items`
  ADD CONSTRAINT `sort_items_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Constraints for table `works`
--
ALTER TABLE `works`
  ADD CONSTRAINT `fk_person_work` FOREIGN KEY (`person_id`) REFERENCES `persons` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
