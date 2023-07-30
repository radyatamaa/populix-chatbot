INSERT INTO `populix_bot`.`card_type` (`id`, `name`, `key`) VALUES (1, 'Text', 'text');
INSERT INTO `populix_bot`.`card_type` (`id`, `name`, `key`) VALUES (2, 'Form Builder', 'formbuilder');
INSERT INTO `populix_bot`.`card_type` (`id`, `name`, `key`) VALUES (3, 'Get List Movie Latest', 'listmovielatest');
INSERT INTO `populix_bot`.`card_type` (`id`, `name`, `key`) VALUES (4, 'Search Movie', 'searchmovie');
INSERT INTO `populix_bot`.`card_type` (`id`, `name`, `key`) VALUES (5, 'Continue to block', 'continuetoblock');
INSERT INTO `populix_bot`.`card_type` (`id`, `name`, `key`) VALUES (6, 'Get List Movie Now Playing', 'listmovienowplaying');
INSERT INTO `populix_bot`.`card_type` (`id`, `name`, `key`) VALUES (7, 'Get List Movie Popular', 'listmoviepopular');
INSERT INTO `populix_bot`.`card_type` (`id`, `name`, `key`) VALUES (8, 'Get List Movie Top Rated', 'listmovietoprated');
INSERT INTO `populix_bot`.`card_type` (`id`, `name`, `key`) VALUES (9, 'Get List Movie Upcoming', 'listmovieupcoming');



INSERT INTO `populix_bot`.`content` (`id`, `title`, `keywords`) VALUES (1, 'Welcome Message', 'Hi,Hello,Hey');
INSERT INTO `populix_bot`.`content` (`id`, `title`, `keywords`) VALUES (2, 'List Keywoards', '');
INSERT INTO `populix_bot`.`content` (`id`, `title`, `keywords`) VALUES (3, 'default_response', '');
INSERT INTO `populix_bot`.`content` (`id`, `title`, `keywords`) VALUES (4, 'List Movie Action', 'List movie Action');
INSERT INTO `populix_bot`.`content` (`id`, `title`, `keywords`) VALUES (5, 'Check Movie Name', 'Check {{movie_name}}');
INSERT INTO `populix_bot`.`content` (`id`, `title`, `keywords`) VALUES (6, 'List Movie Action Latest', '');
INSERT INTO `populix_bot`.`content` (`id`, `title`, `keywords`) VALUES (7, 'List Movie Action Now Playing', '');
INSERT INTO `populix_bot`.`content` (`id`, `title`, `keywords`) VALUES (8, 'List Movie Action Popular', '');
INSERT INTO `populix_bot`.`content` (`id`, `title`, `keywords`) VALUES (9, 'List Movie Action Top Rated', '');
INSERT INTO `populix_bot`.`content` (`id`, `title`, `keywords`) VALUES (10, 'List Movie Action Upcoming', '');


INSERT INTO `populix_bot`.`card` (`id`, `subtitle`, `card_type`, `image_url`, `quick_replies`, `content_id`, `sort`) VALUES (1, 'Hello {{customer_first_name}} {{customer_last_name}} ', 'text', '', '', 1, 1);
INSERT INTO `populix_bot`.`card` (`id`, `subtitle`, `card_type`, `image_url`, `quick_replies`, `content_id`, `sort`) VALUES (2, '{\"completed_message\": \"Thank You , you have fill phone number and email completed\",\"completed_redirect_content_id\": 2,\"save_to_customer\": [{\"field_name\": \"phoneNumber\",\"message\": \"Whats your Phone Number ?\",\"error_message\": \"Phone Number Invalid please input again\"},{\"field_name\": \"email\",\"message\": \"Whats your Email ?\",\"error_message\": \"Email Invalid please input again\"}]}', 'formbuilder', '', '', 1, 3);
INSERT INTO `populix_bot`.`card` (`id`, `subtitle`, `card_type`, `image_url`, `quick_replies`, `content_id`, `sort`) VALUES (3, 'Before Start Please fill your phone number and email', 'text', '', '', 1, 2);
INSERT INTO `populix_bot`.`card` (`id`, `subtitle`, `card_type`, `image_url`, `quick_replies`, `content_id`, `sort`) VALUES (4, 'List Keywoards Available now :\r\n- list movie action : this is for your check list movie action\r\n- check {{movie_name}} : this is for your check detail movie', 'text', '', '', 2, 1);
INSERT INTO `populix_bot`.`card` (`id`, `subtitle`, `card_type`, `image_url`, `quick_replies`, `content_id`, `sort`) VALUES (6, 'sorry i dont understand i`m still learning ', 'text', '', '', 3, 1);
INSERT INTO `populix_bot`.`card` (`id`, `subtitle`, `card_type`, `image_url`, `quick_replies`, `content_id`, `sort`) VALUES (7, '2', 'continuetoblock', '', '', 3, 2);
INSERT INTO `populix_bot`.`card` (`id`, `subtitle`, `card_type`, `image_url`, `quick_replies`, `content_id`, `sort`) VALUES (8, 'Choose Your List Movie Action', 'text', '', '{\"quick_replies\": [{\"type\": \"text\",\"label\": \"Latest\",\"value\": \"Latest\",\"redirect_content_id\": 6},{\"type\": \"text\",\"label\": \"Now Playing\",\"value\": \"Now Playing\",\"redirect_content_id\": 7},{\"type\": \"text\",\"label\": \"Popular\",\"value\": \"Popular\",\"redirect_content_id\": 8},{\"type\": \"text\",\"label\": \"Top Rated\",\"value\": \"Top Rated\",\"redirect_content_id\": 9},{\"type\": \"text\",\"label\": \"Upcoming\",\"value\": \"Upcoming\",\"redirect_content_id\": 10}]}', 4, 1);
INSERT INTO `populix_bot`.`card` (`id`, `subtitle`, `card_type`, `image_url`, `quick_replies`, `content_id`, `sort`) VALUES (9, '', 'searchmovie', '', '', 5, 1);
INSERT INTO `populix_bot`.`card` (`id`, `subtitle`, `card_type`, `image_url`, `quick_replies`, `content_id`, `sort`) VALUES (10, '', 'listmovielatest', '', '', 6, 1);
INSERT INTO `populix_bot`.`card` (`id`, `subtitle`, `card_type`, `image_url`, `quick_replies`, `content_id`, `sort`) VALUES (11, '', 'listmovienowplaying', '', '', 7, 1);
INSERT INTO `populix_bot`.`card` (`id`, `subtitle`, `card_type`, `image_url`, `quick_replies`, `content_id`, `sort`) VALUES (12, '', 'listmoviepopular', '', '', 8, 1);
INSERT INTO `populix_bot`.`card` (`id`, `subtitle`, `card_type`, `image_url`, `quick_replies`, `content_id`, `sort`) VALUES (13, '', 'listmovietoprated', '', '', 9, 1);
INSERT INTO `populix_bot`.`card` (`id`, `subtitle`, `card_type`, `image_url`, `quick_replies`, `content_id`, `sort`) VALUES (14, '', 'listmovieupcoming', '', '', 10, 1);

