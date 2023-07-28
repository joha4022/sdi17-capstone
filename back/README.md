# sdi17-capstone


APIs

Login
Returns userid, firstname, lastname for a verified username/password
		POST request to //localhost:3001/login/  

Meeting

Return all data in meetings table
			GET request to //localhost:3001/meetinglist

Return all users (user_id) attending  a specific meeting
GET request to //localhost:3001/listameeting/:meetingid

Return all meetings a specific user is attending
GET request to //localhost:3001/usermeetings/:userid

Network

Return all data in network table
			GET request to //localhost:3001/network

Add a specific SME to specific user relationship (assigns SME to a user)
POST request to //localhost:3001/network

Removes a specific SME to specific user relationship (deletes SME to a user)

DELETE  request to //localhost:3001/deletenetworkSME
