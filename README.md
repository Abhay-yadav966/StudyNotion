# StudyNotion - EdTech Platform
Study Notion is an ED Tech (Education Technology) web application developed using the MERN stack.
## Introduction
StudyNotion aims to provide a seamless and interactive learning experience for students, making education more accessible and engaging. Additionally, the platform serves as a platform for instructors to showcase their expertise and connect with learners across the globe.

In the following sections, we will cover the technical details of the platform, including the system architecture, API design, installation, usage instructions, and potential future enhancements.
## Features
- User Authentication: Study Notion provides secure user registration and authentication using JWT (JSON Web Tokens). Users can sign up, log in, and manage their profiles with ease.
- Courses and Lessons: Instructors can create and edit created courses. Students can enroll in courses, access course materials, and track their progress.
- Progress Tracking: Study Notion allows students to track their progress in enrolled courses. They can view completed lessons, scores on quizzes and assignments, and overall course progress.
- Payment Integration: Study Notion integrates with Razorpay for payment processing. Users can make secure payments for course enrollment and other services using various payment methods supported by Razorpay.
- Search Functionality: Users can easily search for courses, lessons, and resources using the built-in search feature. This makes it convenient to find relevant content quickly.
- Instructor Dashboard: Instructors have access to a comprehensive dashboard to view information about their courses, students, and income. The dashboard provides charts and visualizations to present data clearly and intuitively. Instructors can monitor the total number of students enrolled in each course, track course performance, and view their income generated from course sales.
## Screenshots
![Screenshot (198)](https://github.com/Abhay-yadav966/StudyNotion/assets/115336330/6db49b68-8323-4f06-9366-98dfac4f932b)
![Screenshot (199)](https://github.com/Abhay-yadav966/StudyNotion/assets/115336330/f79c9653-1c7d-40d3-bb03-0aed4cbd9b51)
![Screenshot (200)](https://github.com/Abhay-yadav966/StudyNotion/assets/115336330/8d65e7a3-94ee-45c8-b28f-d493729a320f)
## Important
- Backend is in the server folder.
- First create the categories e.g. web dev, Python, etc. (without categories courses cannot be added). To create categories create an Admin account and go to dashboard then admin panel.
- To create an Admin account first sign up with a student or instructor account then go to your Database under the users model and change that 'accountType' to 'Admin'.
## Installation
1. Clone the repository to your local machine.
```
    git clone https://github.com/Abhay-yadav966/StudyNotion.git
```
2. Install the required packages.
   ```
   cd StudyNotion
   npm install

   cd server
   npm install
   ```
3. Set up the environment variables:

   Create a .env file in the root directory and /server Add the required environment variables, such as database connection details, JWT secret, and any other necessary configurations check .env.example files for more info.
5. Start the development server.
   ```
    npm run dev
   ```
6. Open the project in your browser at [http://localhost:3000](http://localhost:3000) to view your project.

You can add your own tailwind.config.js file to customize your Tailwind setup.
## Contributing
Contributions are welcome! If you have any suggestions or find any issues, please feel free to open an issue or a pull request. 
