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
VALUES ('johndoe', 'password123', 'johndoe@example.com', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', 'Madrid, Spain', 'John', 'Smith'),
       ('janedoe', 'password456', 'janedoe@example.com', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', 'London, England', 'Jane', 'Hartford'),
       ('bobsmith', 'password789', 'bobsmith@example.com', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', 'Barcelona, Spain', 'Bob', 'Villanueva');

-- inital data for services
INSERT INTO services (service_type, service_category, skills, description, languages, hourly_rate, resume, github_url, linkedin_url, other_url, images, user_id)
VALUES ('Web Design', 'Full Stack', 'communication, frontend', 'I create beautiful, responsive websites', 'HTML, CSS, JavaScript', 75.00, 'resume.pdf','github.com/johndoe', 'linkedin.com/in/johndoe', 'johndoeportfolio.com', NULL, 1),
       ('Graphic Design', 'Product Management', 'research, marketing', 'I design logos, flyers, and more', 'Photoshop, Illustrator', 50.00, NULL,'github.com/janedoe', 'linkedin.com/in/janedoe', 'janedoeportfolio.com', 'design1.jpg, design2.jpg', 2),
       ('Back end', 'Data Science', 'research, data science', 'I design databases', 'Spanish, English', 25.00, 'resume.pdf', 'github.com/bobsmith', 'linkedin.com/in/bobsmith', 'bobsmithportfolio.com', NULL, 3);
