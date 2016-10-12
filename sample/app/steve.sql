USE DATABASE msis;

-- MySQL only
SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS AllTheSteves;
CREATE TABLE AllTheSteves (
    id INT AUTO_INCREMENT PRIMARY KEY ,
    firstName VARCHAR(24) NOT NULL DEFAULT '',
    lastName VARCHAR(24) NOT NULL DEFAULT '',
    email VARCHAR(36) NOT NULL DEFAULT '',
    description varchar(256) NOT NULL DEFAULT ''
);

INSERT INTO AllTheSteves (id, firstName, lastName, email, description)
VALUES (1, "Steve", "McQueen", "cool@example.com", "Fast cars and great movies.");

INSERT INTO AllTheSteves (id, firstName, lastName, email, description)
VALUES (2, "Steve", "Rogers", "shield@example.com", "Don't forget Bucky.");

INSERT INTO AllTheSteves (id, firstName, lastName, email, description)
VALUES (3, "Steve", "Jobs", "magic@example.com", "Invented the iPhone. Probably had some help.");

INSERT INTO AllTheSteves (id, firstName, lastName, email, description)
VALUES (4, "Stephen", "Fry", "awesome@example.com", "Half of Fry & Laurie.");

INSERT INTO AllTheSteves (id, firstName, lastName, email, description)
VALUES (5, "Stephen", "Hawking", "physics@example.com", "He should be your idol.");

INSERT INTO AllTheSteves (id, firstName, lastName, email, description)
VALUES (6, "Stephen", "King", "horror@example.com", "I've never read any of his books.");

INSERT INTO AllTheSteves (id, firstName, lastName, email, description)
VALUES (7, "Stephen", "Colbert", "funny@example.com", "No one is really sure how his surname is properly pronounced.");

INSERT INTO AllTheSteves (id, firstName, lastName, email, description)
VALUES (8, "Steve", "Balmer", "chairs@example.com", "Threw chairs. Might have changed his name to be more like the other Steve.");

INSERT INTO AllTheSteves (id, firstName, lastName, email, description)
VALUES (9, "Stephen", "Strange", "agamatto@example.com", "Cumberbatch seems like a good choice.");

----
-- SteveNumbers
----

CREATE TABLE SteveNumbers (
    sid INT NOT NULL,
    date DATE NOT NULL,
    value int NOT NULL DEFAULT 0,
    FOREIGN KEY (sid) REFERENCES AllTheSteves(id) ON DELETE CASCADE,
    PRIMARY KEY (sid, date)
);


-- MySQL only
SET FOREIGN_KEY_CHECKS=0;
