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
description TEXT,
skills VARCHAR(255),
languages VARCHAR(255),
hourly_rate DECIMAL(10, 2),
resume VARCHAR(255),
images TEXT,
user_id INT NOT NULL,
FOREIGN KEY (user_id) REFERENCES user_table(user_id) ON DELETE CASCADE
);

-- inital data for user_table
INSERT INTO user_table (username, password, email, avatar, location, firstname, lastname)
VALUES ('johndoe', 'password123', 'johndoe@example.com', 'avatar.png', 'Madrid, Spain', 'John', 'Smith'),
       ('janedoe', 'password456', 'janedoe@example.com', NULL, 'London, England', 'Jane', 'Hartford'),
       ('bobsmith', 'password789', 'bobsmith@example.com', 'bob_avatar.png', 'Barcelona, Spain', 'Bob', 'Villanueva');

-- inital data for services
INSERT INTO services (service_type, skills, description, languages, hourly_rate, resume, images, user_id)
VALUES ('Web Design', 'communication, frontend', 'I create beautiful, responsive websites', 'HTML, CSS, JavaScript', 75.00, 'resume.pdf', NULL, 1),
       ('Graphic Design',
        'research, marketing', 'I design logos, flyers, and more', 'Photoshop, Illustrator', 50.00, NULL, 'design1.jpg, design2.jpg', 2),
       ('Back end', 'research, data science', 'I design databases', 'Spanish, English', 25.00, 'resume.pdf', NULL, 3);
