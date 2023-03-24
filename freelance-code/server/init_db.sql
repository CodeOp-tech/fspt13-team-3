DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS user_table;

CREATE TABLE user_table (
user_id INT PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
avatar VARCHAR(255),
location VARCHAR(255), 
firstname VARCHAR(255) NOT NULL,
lastname VARCHAR(255) NOT NULL
);

CREATE TABLE services (
service_id INT PRIMARY KEY AUTO_INCREMENT,
service_type VARCHAR(255) NOT NULL,
service_category VARCHAR(255) NOT NULL,
description TEXT,
skills VARCHAR(255),
languages VARCHAR(255),
hourly_rate DECIMAL(10, 2),
resume VARCHAR(255),
github_url VARCHAR(255),
linkedin_url VARCHAR(255),
other_url VARCHAR(255),
images VARCHAR(255),
user_id INT NOT NULL,
FOREIGN KEY (user_id) REFERENCES user_table(user_id) ON DELETE CASCADE
);

-- inital data for user_table
INSERT INTO user_table (username, password, email, avatar, location, firstname, lastname)
VALUES ('johndoe', '$2b$10$XdIcML5WvAW3qfoFvlVbv.C.deZFMNfbASe6A2s3wN165I.UyIT3.', 'johndoe@example.com', 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80', 'Spain', 'John', 'Smith'),
       ('janedoe', '$2b$10$XdIcML5WvAW3qfoFvlVbv.C.deZFMNfbASe6A2s3wN165I.UyIT3.', 'janedoe@example.com', 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'United Kingdom', 'Jane', 'Hartford'),
       ('oliviasmith', '$2b$10$XdIcML5WvAW3qfoFvlVbv.C.deZFMNfbASe6A2s3wN165I.UyIT3.', 'oliviasmith@example.com', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'Spain', 'Olivia', 'Villanueva'),
       ('justinelee', '$2b$10$XdIcML5WvAW3qfoFvlVbv.C.deZFMNfbASe6A2s3wN165I.UyIT3.', 'justineleeh@example.com', 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=689&q=80', 'Germany', 'Justine', 'Lee'),
       ('frankiethompson', '$2b$10$XdIcML5WvAW3qfoFvlVbv.C.deZFMNfbASe6A2s3wN165I.UyIT3.', 'frankiethompsonh@example.com', 'https://images.unsplash.com/photo-1584362562886-9b9002d5e493?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80', 'United States', 'Frankie', 'Thompson'),
       ('camilleedwards', '$2b$10$XdIcML5WvAW3qfoFvlVbv.C.deZFMNfbASe6A2s3wN165I.UyIT3.', 'camilleedwardsh@example.com', 'https://images.unsplash.com/photo-1554727242-741c14fa561c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA3fHx3b21hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60', 'France', 'Camille', 'Edwards');



-- inital data for services
INSERT INTO services (service_type, service_category, skills, description, languages, hourly_rate, resume, github_url, linkedin_url, other_url, images, user_id)
VALUES ('Full Stack Developer', 'Full Stack', 'JavaScript, HTML, CSS', 'I create beautiful, responsive websites', 'English, Spanish', 75.00, 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf','github.com/johndoe', 'linkedin.com/in/johndoe', 'johndoeportfolio.com', NULL, 1),
       ('Product Manager', 'Product Management', 'HTML, CSS, ReactJS, NextJS', 'I develop products', 'English', 50.00, 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf','github.com/janedoe', 'linkedin.com/in/janedoe', 'janedoeportfolio.com', 'design1.jpg, design2.jpg', 2),
       ('Data Scientist', 'Data Science', 'HTML, CSS, ReactJS, NextJS, MySQL', 'I turn raw data into meaningful information that organisations can use to improve their businesses', 'Spanish, English', 25.00, 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 'github.com/oliviasmith', 'linkedin.com/in/oliviasmith', 'oliviasmithportfolio.com', NULL, 3),
       ('Full Stack Developer', 'Full Stack', 'JavaScript, HTML, CSS, MySQL', 'I create accessible websites', 'English, German', 75.00, 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf','github.com/justinelee', 'linkedin.com/in/justinelee', 'justineleeportfolio.com', NULL, 4),
       ('Product Manager', 'Product Management', 'HTML, CSS, ReactJS, NextJS', 'I develop products', 'English, French', 50.00, 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf','github.com/frankiethompson', 'linkedin.com/in/frankiethompson', 'frankiethompsonportfolio.com', 'design1.jpg, design2.jpg', 5),
       ('Data Scientist', 'Data Science', 'HTML, CSS, ReactJS, NextJS, MySQL', 'I turn raw data into meaningful information that organisations can use to improve their businesses', 'Spanish, English, French', 70.00, 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 'github.com/camilleedwards', 'linkedin.com/in/camilleedwards', 'camilleedwardsportfolio.com', NULL, 6);

