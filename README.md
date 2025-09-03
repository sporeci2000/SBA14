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

The most challenging part of this project was implementing a secure authentication and authorization system that combines both local JWT-based login and GitHub OAuth login. Handling JWTs correctly required ensuring tokens were signed properly during registration and login, verified on every protected route, and set to expire appropriately. Integrating GitHub OAuth added complexity, as it involved registering the app on GitHub, managing client credentials, handling callback URLs, and creating new users on the fly if they didn’t already exist. On top of that, securing the Bookmark API endpoints required implementing strict authorization checks so that users could only access, update, or delete their own bookmarks. Balancing these multiple layers of security, while maintaining smooth user experience and proper middleware flow, was the most difficult but crucial aspect of the project.

REFERENCES:
https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/mongoose
https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
