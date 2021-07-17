-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 17, 2021 at 12:21 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quizz`
--

-- --------------------------------------------------------

--
-- Table structure for table `answer`
--

CREATE TABLE `answer` (
  `IDAnswer` int(11) NOT NULL,
  `questionID` int(11) NOT NULL,
  `description` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  `is_correct` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `answer`
--

INSERT INTO `answer` (`IDAnswer`, `questionID`, `description`, `is_correct`) VALUES
(1, 1, 'Osijek', 0),
(2, 1, 'Split', 0),
(3, 1, 'Zadar', 0),
(4, 1, 'Zagreb', 1),
(5, 2, 'Zadar', 0),
(6, 2, 'Osijek', 0),
(7, 2, 'Slavonski Brod', 0),
(8, 2, 'Vukovar', 0),
(9, 2, 'Ilok', 1),
(10, 3, 'React', 0),
(11, 3, 'Angular', 0),
(12, 3, 'Vue', 1),
(13, 3, 'IONIC', 0);

-- --------------------------------------------------------

--
-- Table structure for table `guests`
--

CREATE TABLE `guests` (
  `IDGuest` int(11) NOT NULL,
  `nickname` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `guest_answers`
--

CREATE TABLE `guest_answers` (
  `ID` int(11) NOT NULL,
  `quizID` int(11) DEFAULT NULL,
  `questionID` int(11) DEFAULT NULL,
  `questID` int(11) DEFAULT NULL,
  `correct` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `IDQuestion` int(11) NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `difficulty` int(11) DEFAULT 3,
  `quizID` int(11) NOT NULL,
  `time` int(11) DEFAULT 30,
  `answered` tinyint(4) DEFAULT 0,
  `question_order` int(11) DEFAULT NULL,
  `started` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`IDQuestion`, `description`, `difficulty`, `quizID`, `time`, `answered`, `question_order`, `started`) VALUES
(1, 'Glavni grad Hrvatske je ?', 3, 1, 10, 0, 1, 0),
(2, 'Najistočniji grad Hrvatske je?', 3, 1, 10, 0, 2, 0),
(3, 'Kojim frameworkom je izrađena aplikacija ? ', 3, 1, 10, 0, 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `quiz`
--

CREATE TABLE `quiz` (
  `IDQuiz` int(11) NOT NULL,
  `title` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `userID` int(11) NOT NULL,
  `pin` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `active` tinyint(4) DEFAULT 0,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `quiz`
--

INSERT INTO `quiz` (`IDQuiz`, `title`, `userID`, `pin`, `active`, `created_at`) VALUES
(1, 'Kviz 1 ', 1, '123123', 0, '2021-07-17 11:41:09');

-- --------------------------------------------------------

--
-- Table structure for table `quiz_guests`
--

CREATE TABLE `quiz_guests` (
  `ID` int(11) NOT NULL,
  `quizID` int(11) DEFAULT NULL,
  `guestID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `IDUser` int(11) NOT NULL,
  `email` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`IDUser`, `email`, `username`, `password`) VALUES
(1, 'ivanvk95@gmail.com', 'admin1', '$2b$10$Ss03CUZBT2hQHhhgQbOgAeSYNE2AFvE9M6JvpOfFc9t.WA9Ts3J2m'),
(2, 'test@test.com', 'guest', '$2b$10$0OQ5bJIVBuEg8nhS9kef5.ymZfdMzjkOioz/4rr4AsaLzQnCNFgQu');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answer`
--
ALTER TABLE `answer`
  ADD PRIMARY KEY (`IDAnswer`),
  ADD KEY `dwawdawd_idx` (`questionID`);

--
-- Indexes for table `guests`
--
ALTER TABLE `guests`
  ADD PRIMARY KEY (`IDGuest`);

--
-- Indexes for table `guest_answers`
--
ALTER TABLE `guest_answers`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`IDQuestion`),
  ADD KEY `quizID` (`quizID`);

--
-- Indexes for table `quiz`
--
ALTER TABLE `quiz`
  ADD PRIMARY KEY (`IDQuiz`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `quiz_guests`
--
ALTER TABLE `quiz_guests`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `quiz` (`quizID`),
  ADD KEY `guest` (`guestID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`IDUser`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD UNIQUE KEY `username_UNIQUE` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answer`
--
ALTER TABLE `answer`
  MODIFY `IDAnswer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `guests`
--
ALTER TABLE `guests`
  MODIFY `IDGuest` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `guest_answers`
--
ALTER TABLE `guest_answers`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `IDQuestion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `quiz`
--
ALTER TABLE `quiz`
  MODIFY `IDQuiz` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `quiz_guests`
--
ALTER TABLE `quiz_guests`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `IDUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answer`
--
ALTER TABLE `answer`
  ADD CONSTRAINT `answer_ibfk_1` FOREIGN KEY (`questionID`) REFERENCES `question` (`IDQuestion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `question_ibfk_1` FOREIGN KEY (`quizID`) REFERENCES `quiz` (`IDQuiz`);

--
-- Constraints for table `quiz`
--
ALTER TABLE `quiz`
  ADD CONSTRAINT `quiz_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`IDUser`);

--
-- Constraints for table `quiz_guests`
--
ALTER TABLE `quiz_guests`
  ADD CONSTRAINT `guest` FOREIGN KEY (`guestID`) REFERENCES `guests` (`IDGuest`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `quiz` FOREIGN KEY (`quizID`) REFERENCES `quiz` (`IDQuiz`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
