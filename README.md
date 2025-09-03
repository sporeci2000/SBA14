Secure Web Portal API   
This project is a secure backend API built with Node.js, Express, and MongoDB, providing user authentication and bookmark management. It supports both local authentication with email/password and GitHub OAuth, using JWTs for secure access to protected routes. Users can create, read, update, and delete their own bookmarks, while all endpoints are protected by authentication and ownership-based authorization. The project demonstrates full-stack backend security best practices, including password hashing, token-based authentication, and OAuth integration.

Features   
Authentication    
Local Authentication: Register and log in using email and password.   
Third-Party Authentication: GitHub OAuth login.   
JWT-based Authentication: All protected routes require a valid JWT.   

Bookmark Management  
Create, Read, Update, Delete (CRUD) bookmarks.   
Ownership-based Authorization: Users can only view or modify their own bookmarks.   
Secure Endpoints: All bookmark endpoints protected by authentication middleware.  