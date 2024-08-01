# 👟MERN Ecommerce Store Application
[![Instagram](https://img.shields.io/badge/-Instagram-E4405F?logo=instagram&logoColor=white&style=flat-square)](https://www.instagram.com/ishanjarwal)
[![GitHub](https://img.shields.io/badge/-GitHub-181717?logo=github&logoColor=white&style=flat-square)](https://github.com/ishanjarwal)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?logo=linkedin&logoColor=white&style=flat-square)](https://www.linkedin.com/in/ishanjarwal)

Welcome to the Ecommerce Store Application! This repository contains the code for a full-featured ecommerce store built using ReactJS and ExpressJS with MongoDB as the database. This readme file provides an overview of the project's features, technology stack, uniqueness, and how to get started.

![Screenshot 2024-07-26 172602](https://github.com/user-attachments/assets/8e0e72b8-65c4-4027-a2de-d30f47fb9e34)

## 🔗LIVE LINK :  [mern-sneaker-store.vercel.app](https://mern-sneaker-store.vercel.app)

## ✅Features

- **User Authentication**: Secure login and registration with JWT authentication.
- **Product Management**: Add, edit, delete, and view products with images and descriptions.
- **Shopping Cart**: Add items to the cart, update quantities, and remove items.
- **Shopping Cart Updation**: Auto updates out of stock items before checkout.
- **Order Management**: Place orders, view order history, and track order status.
- **Payment Integration**: Secure payment processing with Razorpay.
- **Responsive Design**: Mobile-friendly layout for an optimal user experience.
- **Admin Panel**: Manage products, orders, and users from an intuitive admin interface.
- **Search and Filtering**: Easily search and filter products by category, price, and ratings.

## 💻Tech Stack

- **Frontend**: 
  ![ReactJS](https://img.shields.io/badge/-ReactJS-61DAFB?logo=react&logoColor=white&style=flat-square)
  ![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white&style=flat-square)
- **Backend**: 
  ![ExpressJS](https://img.shields.io/badge/-ExpressJS-000000?logo=express&logoColor=white&style=flat-square)
  ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white&style=flat-square)
- **Database**: 
  ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white&style=flat-square)
- **Authentication**: 
  ![JWT](https://img.shields.io/badge/-JWT-000000?logo=json-web-tokens&logoColor=white&style=flat-square)
- **File Uploads**: 
  ![Multer](https://img.shields.io/badge/-Multer-20232A?logo=multer&logoColor=white&style=flat-square)
  ![Cloudinary](https://img.shields.io/badge/-Cloudinary-3448C5?logo=cloudinary&logoColor=white&style=flat-square)
- **Payment Gateway**: 
  ![Razorpay](https://img.shields.io/badge/-Razorpay-02042B?logo=razorpay&logoColor=white&style=flat-square)

## 🎖️Unique Selling Points

- **Scalable Architecture**: Built with scalability in mind to handle a growing number of users and products.
- **Modern UI/UX**: Clean and modern user interface designed with TailwindCSS for a seamless shopping experience.
- **Real-time Updates**: Real-time updates for cart and order status.
- **Extensive Admin Panel**: Comprehensive admin panel for managing the entire store effectively.
- **Secure Transactions**: Secure and reliable payment processing with Razorpay integration.

## ❓Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB database setup
- Razorpay account for payment integration
- Cloudinary account for image storage

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/ecommerce-store.git
   ```
2. **Install the Dependencies:**
   ```bash
    cd api
    npm install

    cd ../client
    npm install
   ```
## Prepare the .env file
  ```env
    DB_URL=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    CLOUDINARY__ROOT=your_cloudinary_root_folder
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    RAZORPAY_KEY_ID=your_razorpay_key_id
    RAZORPAY_SECRET_KEY=your_razorpay_key_secret
    MAIL_ID=email_id
    MAIL_PASSWORD=email_password_authorized
  ```
## Folder Structure
  ```bash
    📦
├─ api
│  ├─ .gitignore
│  ├─ config
│  │  ├─ cloudinary.js
│  │  └─ razorpay.js
│  ├─ connection.js
│  ├─ constants
│  │  └─ constants.js
│  ├─ controllers
│  ├─ dist
│  ├─ middlewares
│  │  ├─ handleValidationErrors.js
│  │  ├─ isAdmin.js
│  │  └─ isAuth.js
│  ├─ models
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ routes
│  ├─ utils
│  │  ├─ handleUploads.js
│  │  ├─ randomString.js
│  │  └─ sendEmails.js
│  └─ validators
├─ client
│  ├─ .eslintrc.cjs
│  ├─ .gitignore
│  ├─ README.md
│  ├─ data.json
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postcss.config.js
│  ├─ src
│  │  ├─ App.css
│  │  ├─ App.jsx
│  │  ├─ apis
│  │  ├─ app
│  │  │  ├─ constants.js
│  │  │  └─ store.js
│  │  ├─ components
│  │  ├─ hooks
│  │  ├─ index.css
│  │  ├─ layouts
│  │  ├─ main.jsx
│  │  ├─ pages
│  │  │  └─ admin
│  │  ├─ slices
│  │  └─ utils
│  ├─ tailwind.config.js
│  ├─ test.html
│  └─ vite.config.js
└─ vercel.json
  ```
## Project Snapshots

![Screenshot 2024-07-26 172539](https://github.com/user-attachments/assets/f04a087e-676b-444a-86be-5071f324afac)
![Screenshot 2024-07-26 172822](https://github.com/user-attachments/assets/f4f4a4b1-355e-49f7-824f-b67081b7452b)
![Screenshot 2024-07-26 172837](https://github.com/user-attachments/assets/3eaf23ce-9bc7-4332-b6fa-9024597b5440)
![Screenshot 2024-07-26 172722](https://github.com/user-attachments/assets/9f77b550-057f-47b6-98a5-fba622cea593)
![Screenshot 2024-07-26 172743](https://github.com/user-attachments/assets/ee3c02b1-6485-4a9a-a4e8-a50425a0ae11)
![Screenshot 2024-07-26 172754](https://github.com/user-attachments/assets/821d17e3-d89e-4340-870d-18d925401bb3)
![Screenshot 2024-07-26 172807](https://github.com/user-attachments/assets/5d1a14b3-74c8-4b1d-ba7c-55808eb79b59)
![Screenshot 2024-07-26 172852](https://github.com/user-attachments/assets/92d2f0ab-5105-414d-b35d-3ae39e903b49)

## Admin Panel

![Screenshot 2024-07-26 172920](https://github.com/user-attachments/assets/6aaff460-4757-40c9-95d2-d1f986e52d42)
![Screenshot 2024-07-26 172926](https://github.com/user-attachments/assets/7f702a25-1fcb-48e8-8856-7a12dc1d7434)
![Screenshot 2024-07-26 172940](https://github.com/user-attachments/assets/090c237d-7706-48b8-9277-6f8854c1b2c7)
![Screenshot 2024-07-26 173003](https://github.com/user-attachments/assets/f08c4fe5-de58-4cda-b857-c892c52fc493)

[![Instagram](https://img.shields.io/badge/-Instagram-E4405F?logo=instagram&logoColor=white&style=flat-square)](https://www.instagram.com/ishanjarwal)
[![GitHub](https://img.shields.io/badge/-GitHub-181717?logo=github&logoColor=white&style=flat-square)](https://github.com/ishanjarwal)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?logo=linkedin&logoColor=white&style=flat-square)](https://www.linkedin.com/in/ishanjarwal)
