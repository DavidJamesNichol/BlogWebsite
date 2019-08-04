USE Blog;
CREATE TABLE users 
			(
					userID INT NOT NULL auto_increment,
					fName VARCHAR(20) NOT NULL,
					lName VARCHAR(20) NOT NULL,
					email VARCHAR(50) NOT NULL,
					username VARCHAR(30) NOT NULL,
					password VARCHAR(40) NOT NULL,
					permissionLevel INT NOT NULL,
					UNIQUE KEY(userID),
					UNIQUE KEY(email),
					UNIQUE KEY(username)
			);
			
			desc users;