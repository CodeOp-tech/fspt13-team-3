
-- not sure if we need the ALTER TABLE all the time or not 
ALTER TABLE services DROP FOREIGN KEY services_ibfk_1;
DROP TABLE IF EXISTS user_table;
CREATE TABLE user_table (
user_id INT PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
avatar VARCHAR(255),
firstname VARCHAR(255)
);

DROP TABLE IF EXISTS services;
CREATE TABLE services (
service_id INT PRIMARY KEY AUTO_INCREMENT,
service_type VARCHAR(255) NOT NULL,
description TEXT,
languages VARCHAR(255),
hourly_rate DECIMAL(10, 2),
resume VARCHAR(255),
images TEXT,
user_id INT NOT NULL,
FOREIGN KEY (user_id) REFERENCES user_table(user_id)
);

-- inital data for user_table
INSERT INTO user_table (username, password, email, avatar, firstname)
VALUES ('johndoe', 'password123', 'johndoe@example.com', 'avatar.png', 'John'),
       ('janedoe', 'password456', 'janedoe@example.com', NULL, 'Jane'),
       ('bobsmith', 'password789', 'bobsmith@example.com', 'bob_avatar.png', 'Bob');

-- inital data for services
INSERT INTO services (service_type, description, languages, hourly_rate, resume, images, user_id)
VALUES ('Web Design', 'I create beautiful, responsive websites', 'HTML, CSS, JavaScript', 75.00, 'resume.pdf', NULL, 1),
       ('Graphic Design', 'I design logos, flyers, and more', 'Photoshop, Illustrator', 50.00, NULL, 'design1.jpg, design2.jpg', 2),
       ('Back end', 'I design databases', 'Spanish, English', 25.00, 'resume.pdf', NULL, 3);
