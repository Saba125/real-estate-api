API Endpoints
Authentication
POST /auth/register: Register a new user.
POST /auth/login: Login and receive a JWT token.
POST /auth/logout: Logout and invalidate the token.


Course Endpoints
GET /courses: Get a list of all courses.
GET /courses/:courseId: Get details of a specific course.
POST /courses: Create a new course.
PUT /courses/:courseId: Update a course.
DELETE /courses/:courseId: Delete a course.


Lesson Endpoints
GET /courses/:courseId/lessons: Get all lessons for a specific course.
POST /courses/:courseId/lessons: Add a new lesson to a course.
PUT /courses/:courseId/lessons/:lessonId: Update a lesson.
DELETE /courses/:courseId/lessons/:lessonId: Delete a lesson.

Quiz Endpoints
GET /courses/:courseId/quizzes: Get quizzes for a specific course.
POST /courses/:courseId/quizzes: Add a new quiz to a course.
PUT /courses/:courseId/quizzes/:quizId: Update a quiz.
DELETE /courses/:courseId/quizzes/:quizId: Delete a quiz.

Video Uploading Endpoints
POST /courses/:courseId/videos: Upload a video for a course.
Certificate Generation
GET /courses/:courseId/certificate: Generate and download a PDF certificate for a student who completed the course.
