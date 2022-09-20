CREATE TABLE `pessoa` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome_fantasia` varchar(150) DEFAULT NULL,
  `sobrenome_razao` varchar(120) DEFAULT NULL,
  `cpf_cnpj` varchar(30) DEFAULT NULL,
  `rg_ie` varchar(45) DEFAULT NULL,
  `nascimento_fundacao` date DEFAULT NULL,
  `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci