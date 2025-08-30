# Instant Portfolio

A modern, full-stack portfolio builder application that allows users to create stunning, professional portfolios with ease. Built with the latest web technologies for optimal performance and user experience.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

## 🌟 Features

### ✨ Core Functionality
- **Drag & Drop Builder**: Intuitive visual editor with drag-and-drop section management
- **Real-time Preview**: Live preview of portfolio changes as you build
- **Responsive Design**: Fully responsive portfolios that look great on all devices
- **Theme System**: Multiple professional themes (Professional, Creative, Elegant)
- **Section Management**: Enable/disable and reorder portfolio sections
- **Auto-save**: Automatic saving of work to prevent data loss

### 🎨 Portfolio Sections
- **About**: Personal information, bio, and profile image
- **Experience**: Work experience with achievements and descriptions
- **Projects**: Showcase projects with images, tech stacks, and links
- **Education**: Academic background and qualifications
- **Skills**: Technical and soft skills with proficiency levels
- **Contact**: Contact information and social media links

### 🔧 Advanced Features
- **Image Upload**: Cloudinary integration for profile and project images
- **Social Links**: Integration with GitHub, LinkedIn, Twitter, and more
- **SEO Optimized**: Built with Next.js for optimal search engine performance
- **Authentication**: Secure user authentication and authorization
- **Data Persistence**: MongoDB for reliable data storage
- **API Documentation**: RESTful API with comprehensive endpoints

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **React Hook Form** - Form management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing

### DevOps & Tools
- **Cloudinary** - Image hosting and optimization
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **MongoDB** (local or cloud instance)
- **Git**
- **npm** or **yarn**

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/mushfiqbh/Instant-Portfolio.git
cd Instant-Portfolio
```

### 2. Install Dependencies

#### Backend Dependencies
```bash
cd backend
npm install
```

#### Frontend Dependencies
```bash
cd ../frontend
npm install
```

### 3. Environment Setup

#### Backend Environment Variables
Create a `.env` file in the `backend` directory:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/instant-portfolio
JWT_SECRET=your-super-secret-jwt-key-here
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

#### Frontend Environment Variables
Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:4000
```

### 4. Database Setup
Make sure MongoDB is running on your system, or update the `MONGO_URI` to point to your cloud MongoDB instance.

### 5. Cloudinary Setup (Optional)
For image uploads to work, you'll need to:
1. Create a Cloudinary account
2. Get your cloud name, API key, and API secret
3. Add them to your backend `.env` file

## 🚀 Running the Application

### Development Mode

#### Start Backend Server
```bash
cd backend
npm run dev
```

#### Start Frontend Server
```bash
cd frontend
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000

### Production Build

#### Build Frontend
```bash
cd frontend
npm run build
npm start
```

#### Build Backend
```bash
cd backend
npm run build
npm start
```

## 📖 Usage

### Creating a Portfolio

1. **Sign Up/Login**: Create an account or log in to existing account
2. **Access Builder**: Navigate to the portfolio builder
3. **Add Personal Info**: Fill in your personal information in the About section
4. **Add Sections**: Add work experience, projects, education, and skills
5. **Upload Images**: Upload profile picture and project screenshots
6. **Customize Theme**: Choose from available themes
7. **Preview & Publish**: Preview your portfolio and save changes

### Managing Sections

- **Reorder Sections**: Drag and drop sections in the section manager
- **Show/Hide Sections**: Toggle section visibility with the eye icon
- **Edit Content**: Click on any section to edit its content
- **Auto-save**: Changes are automatically saved as you work

## 🔌 API Documentation

### Authentication Endpoints

#### POST `/api/users/login`
Authenticate user login
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### POST `/api/users/register`
Register new user
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}
```

### Portfolio Endpoints

#### GET `/api/portfolios`
Get user's portfolio (requires authentication)

#### POST `/api/portfolios`
Create new portfolio (requires authentication)

#### PUT `/api/portfolios`
Update existing portfolio (requires authentication)

#### DELETE `/api/portfolios`
Delete portfolio (requires authentication)

### Upload Endpoints

#### POST `/api/uploads/image`
Upload image file (requires authentication)
- Content-Type: `multipart/form-data`
- Field: `image`

## 🏗️ Project Structure

```
Instant-Portfolio/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── context/
│   │   └── types/
│   ├── package.json
│   ├── next.config.ts
│   └── tailwind.config.js
├── README.md
└── package.json
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure code passes linting

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** for the amazing React framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icon set
- **Cloudinary** for image hosting services
- **MongoDB** for the robust database solution

## 📞 Support

If you have any questions or need help:

- Open an issue on GitHub
- Check the documentation
- Contact the maintainers

---

**Made with ❤️ by [Your Name]**

*Transform your career story into a stunning digital portfolio with Instant Portfolio!* 🚀