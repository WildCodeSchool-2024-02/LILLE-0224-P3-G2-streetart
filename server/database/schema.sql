CREATE TABLE user (
  id_user INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
  firstname VARCHAR(25) NOT NULL, 
  lastname VARCHAR(25) NOT NULL, 
  pseudo VARCHAR(15) NOT NULL, 
  city VARCHAR(50) NOT NULL, 
  postcode VARCHAR(5) NOT NULL, 
  avatar TEXT NOT NULL, 
  birthdate DATE NOT NULL, 
  points INT NOT NULL
);

CREATE TABLE admin (
  id_admin INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
  firstname VARCHAR(25) NOT NULL, 
  lastname VARCHAR(25) NOT NULL, 
  pseudo VARCHAR(15) NOT NULL
);

CREATE TABLE account (
  id_account INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(15) NOT NULL,
  id_user_fk INT UNSIGNED NOT NULL,
  FOREIGN KEY (id_user_fk) REFERENCES user(id_user) ON DELETE SET NULL,
  id_admin_fk INT UNSIGNED NOT NULL,
  FOREIGN KEY (id_admin_fk) REFERENCES admin(id_admin) ON DELETE SET NULL
);
   
CREATE TABLE artwork (
  id_artwork INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
  title VARCHAR(45) NOT NULL,
  picture TEXT NOT NULL, 
  date DATE NOT NULL,
  longitude DECIMAL NOT NULL, 
  latitude DECIMAL NOT NULL, 
  validation BOOLEAN NOT NULL
);

CREATE TABLE operation (
  id_operation INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
  type VARCHAR(25) NOT NULL,
  description TEXT NULL, 
  date DATE NOT NULL, 
  id_account_fk INT UNSIGNED NOT NULL,
  FOREIGN KEY (id_account_fk) REFERENCES account(id_account) ON DELETE SET NULL,
  id_artwork_fk INT UNSIGNED NOT NULL,
  FOREIGN KEY (id_artwork_fk) REFERENCES artwork(id_artwork) ON DELETE SET NULL
);


