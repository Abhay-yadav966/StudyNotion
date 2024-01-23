# StudyNotion
Study Notion is an ED Tech (Education Technology) web application developed using the MERN stack. StudyNotion is an innovative EdTech platform where instructors can upload their courses and track their progress through visually appealing pie charts created using the Chart.js npm package. The website is built on ReactJS, TailwindCSS, and with backend support provided by NodeJS (ExpressJs) and MongoDB. For payment processing, StudyNotion utilizes Razorpay. Media data is securely stored on Cloudinary servers. Additionally, the website integrates Dicebear's API to automatically generate unique profile pictures for users.
## Note
This project is intended as a learning tool and can be used as a project for educational or personal projects.
## Features
- User Authentication: Study Notion provides secure user registration and authentication using JWT (JSON Web Tokens). Users can sign up, log in, and manage their profiles with ease.
- Courses and Lessons: Instructors can create and edit created courses. Students can enroll in courses, access course materials, and track their progress.
- Progress Tracking: Study Notion allows students to track their progress in enrolled courses. They can view completed lessons, scores on quizzes and assignments, and overall course progress.
- Payment Integration: Study Notion integrates with Razorpay for payment processing. Users can make secure payments for course enrollment and other services using various payment methods supported by Razorpay.
- Search Functionality: Users can easily search for courses, lessons, and resources using the built-in search feature. This makes it convenient to find relevant content quickly.
- Instructor Dashboard: Instructors have access to a comprehensive dashboard to view information about their courses, students, and income. The dashboard provides charts and visualizations to present data clearly and intuitively. Instructors can monitor the total number of students enrolled in each course, track course performance, and view their income generated from course sales.
## Technologies Used
- Frontend: ReactJS, TailwindCSS
- Backend: ExpressJS, NodeJS, MongoDB
- Payment Processing: Razorpay
- Frontend Hosting: Vercel
- Backend Hosting: Render
- Media Data Storage: Cloudinary
- Profile Picture Generation: Dicebear API
## Screenshots
![Screenshot (198)](https://github.com/Abhay-yadav966/StudyNotion/assets/115336330/9412db4c-0d21-405b-967c-3e39c5c5c534)
![Screenshot (199)](https://github.com/Abhay-yadav966/StudyNotion/assets/115336330/6106d60f-c0c1-43cc-8da5-f88e28d9bd4d)
![Screenshot (200)](https://github.com/Abhay-yadav966/StudyNotion/assets/115336330/b4e0d291-ff35-4332-98c5-6d2f174fe58d)
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

   Create a .env file in the root directory and /server Add the required environment variables, such as database connection details, JWT secret, and any other necessary configurations.
4. Start the development server.
   ```
     npm run dev
   ```
5. Open the project in your browser at [http://localhost:3000](http://localhost:3000) to view your project.

You can add your own tailwind.config.js file to customize your Tailwind setup.
## Contributions
Contributions are welcome! If you have any suggestions or find any issues, please feel free to open an issue or a pull request.
