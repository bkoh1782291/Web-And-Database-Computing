CREATE TABLE User (
    UserID INT,
    AssignedTasks VARCHAR(255),
    Avaliability VARCHAR(255),
    PRIMARY KEY (UserID)
);

CREATE TABLE Task ( 
    TaskID INT AUTO_INCREMENT, 
    TaskName VARCHAR(64) NOT NULL, 
    UsersResponsible VARCHAR(64) NOT NULL, 
    TaskPriority VARCHAR(32) NOT NULL, 
    TimeLeft VARCHAR (6) NOT NULL,
    Progress INT,
    Complete INT,
    PRIMARY KEY (TaskID)
);

CREATE TABLE ManagerProfile ( 
    managerid INT AUTO_INCREMENT,
    managername VARCHAR(256) NOT NULL,
    password VARCHAR(256) NOT NULL,
    age INT,
    email VARCHAR(100) NOT NULL,
    department VARCHAR(64) NOT NULL,
    sessionflag INT NOT NULL,
    PRIMARY KEY (managerid)
);

CREATE TABLE UserProfile ( 
    userid INT AUTO_INCREMENT,
    username VARCHAR(256) NOT NULL,
    password VARCHAR(256) NOT NULL,
    age INT,
    email VARCHAR(100) NOT NULL,
    department VARCHAR(64) NOT NULL,
    sessionflag INT NOT NULL,
    PRIMARY KEY (userid)
);


/* draft queries */

SELECT UserID FROM UserProfile;
SELECT ManagerID FROM UserProfile;

SELECT AssignedTasks, Avaliability FROM User;
SELECT TaskName, UserResponsible, TaskPriority, TimeLeft, Progress FROM Task;

SELECT Age, ManagerName, ManagePeople FROM ManagerProfile;
SELECT Age, UserName, Department FROM UserProfile;

INSERT INTO Task (TaskName, UserResponsible, TaskPriority, TimeLeft, Progress)
    VALUES ('','','',int,int);

INSERT INTO User (AssignedTasks, Avaliability)
    VALUES ('','');

INSERT INTO UserProfile (userid, username, password, age,email, department)
    VALUES(int,'',int,'','','');

/*
INSERT INTO ManagerProfile (managername, password, age, email, department, sessionflag)
VALUES('winn','winn123',20,'winn@gmail.com','appdevelopment', 0);

INSERT INTO UserProfile (username, password, age, email, department, sessionflag)
VALUES('john','john123',20,'john@gmail.com','appdevelopment', 0);
 */

INSERT INTO Task (TaskName, UsersResponsible, TaskPriority, TimeLeft, Progress, Complete) VALUES (?,?,?,?,?,0);

INSERT INTO ManagerProfile (ManagerID, Age, ManagerName, ManagerPassword)
    VALUES (int,int,'','');





