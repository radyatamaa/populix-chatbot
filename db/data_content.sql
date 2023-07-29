INSERT INTO `populix_bot`.`card_type` (`id`, `name`, `key`) VALUES (1, 'Text', 'text');
INSERT INTO `populix_bot`.`card_type` (`id`, `name`, `key`) VALUES (2, 'Form Builder', 'formbuilder');
INSERT INTO `populix_bot`.`card_type` (`id`, `name`, `key`) VALUES (3, 'Get List Movie', 'listmovie');
INSERT INTO `populix_bot`.`card_type` (`id`, `name`, `key`) VALUES (4, 'Detail Movie', 'detailmovie');
INSERT INTO `populix_bot`.`card_type` (`id`, `name`, `key`) VALUES (5, 'Continue to block', 'continuetoblock');


INSERT INTO `populix_bot`.`content` (`id`, `title`, `keywords`) VALUES (1, 'Welcome Message', 'Hi,Hello,Hey');
INSERT INTO `populix_bot`.`content` (`id`, `title`, `keywords`) VALUES (2, 'List Keywoards', '');
INSERT INTO `populix_bot`.`content` (`id`, `title`, `keywords`) VALUES (3, 'default_response', '');
INSERT INTO `populix_bot`.`content` (`id`, `title`, `keywords`) VALUES (4, 'List Movie', 'List movie Action');
INSERT INTO `populix_bot`.`content` (`id`, `title`, `keywords`) VALUES (5, 'Check Movie Name', 'Check {{movie_name}}');

INSERT INTO `populix_bot`.`card` (`id`, `subtitle`, `card_type`, `image_url`, `quick_replies`, `content_id`, `sort`) VALUES (1, 'Hello {{customer_first_name}} {{customer_last_name}} ', 'text', '', '', 1, 1);
INSERT INTO `populix_bot`.`card` (`id`, `subtitle`, `card_type`, `image_url`, `quick_replies`, `content_id`, `sort`) VALUES (2, '{\"completed_message\": \"Thank You , you have completed\",\"completed_redirect_content_id\": 1,\"save_to_customer\": [{\"field_name\": \"phone_number\",\"message\": \"Whats your Phone Number ?\",\"error_message\": \"Phone Number Invalid please input again\"},{\"field_name\": \"email\",\"message\": \"Whats your Email ?\",\"error_message\": \"Email Invalid please input again\"}]}', 'formbuilder', '', '', 1, 3);
INSERT INTO `populix_bot`.`card` (`id`, `subtitle`, `card_type`, `image_url`, `quick_replies`, `content_id`, `sort`) VALUES (3, 'Before Start Please fill your phone number and email', 'text', '', '', 1, 2);
INSERT INTO `populix_bot`.`card` (`id`, `subtitle`, `card_type`, `image_url`, `quick_replies`, `content_id`, `sort`) VALUES (4, 'List Keywoards Available now :\r\n- list movie action : this is for your check list movie action\r\n- check {{movie_name}} : this is for your check detail movie', 'text', '', '', 2, 1);
INSERT INTO `populix_bot`.`card` (`id`, `subtitle`, `card_type`, `image_url`, `quick_replies`, `content_id`, `sort`) VALUES (5, '2', 'continuetoblock', '', '', 1, 4);
INSERT INTO `populix_bot`.`card` (`id`, `subtitle`, `card_type`, `image_url`, `quick_replies`, `content_id`, `sort`) VALUES (6, 'sorry i dont understand i`m still learning ', 'text', '', '', 3, 1);
INSERT INTO `populix_bot`.`card` (`id`, `subtitle`, `card_type`, `image_url`, `quick_replies`, `content_id`, `sort`) VALUES (7, '2', 'continuetoblock', '', '', 3, 2);
INSERT INTO `populix_bot`.`card` (`id`, `subtitle`, `card_type`, `image_url`, `quick_replies`, `content_id`, `sort`) VALUES (8, '', 'listmovie', '', '', 4, 1);
INSERT INTO `populix_bot`.`card` (`id`, `subtitle`, `card_type`, `image_url`, `quick_replies`, `content_id`, `sort`) VALUES (9, '', 'detailmovie', '', '', 5, 1);
