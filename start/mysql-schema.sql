USE 



CREATE TABLE `natural_text` (
  `id` int(10) UNSIGNED NOT NULL,
  `date` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `image` varchar(255) COLLATE utf8_general_ci DEFAULT NULL,
  `text` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `recognition_image` (
  `id` int(10) UNSIGNED NOT NULL,
  `date` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `image` varchar(255) COLLATE utf8_general_ci DEFAULT NULL,
  `text` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;