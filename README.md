# 🚀 Modern Portfolio Website

A cutting-edge, responsive portfolio website built with React, TypeScript, and modern web technologies. Features smooth animations, Firebase integration for dynamic content management, and seamless deployment on GitHub Pages.

<!-- Add main portfolio screenshot here -->

![Portfolio Screenshot](./docs/images/portfolio-main.png)

## ✨ Live Demo

🌐 **Live Site**: [https://ashishthakur.me](https://ashishthakur.me)

<!-- Add demo GIF here -->

![Portfolio Demo](./docs/images/portfolio-demo.gif)

---

## 🎯 Features

### 🎨 Core Features

- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **📱 Fully Responsive**: Optimized for all screen sizes (mobile, tablet, desktop)
- **⚡ Performance Optimized**: 60fps animations with excellent performance
- **🌙 Dark/Light Theme**: Automatic theme detection with toggle capability
- **🔧 Admin Panel**: Firebase-authenticated content management system
- **📊 Real-time Data**: Dynamic content via Firestore database
- **🚀 SPA Routing**: Seamless navigation with GitHub Pages support

### 📄 Page Components

1. **🏠 Home/About**: Hero section with animated introduction and personal story
2. **📋 Resume**: Interactive resume with download functionality
3. **💼 Projects**: Showcase with filtering, search, and admin CRUD operations
4. **🛠️ Skills**: Interactive skill visualization with progress indicators
5. **📊 GitHub Repos**: Live GitHub integration with repository showcase
6. **📧 Contact**: Contact form with EmailJS integration and social links

### 🔐 Admin Features

- **Secure Authentication**: Firebase Auth with Google Sign-in
- **Content Management**: Add, edit, delete projects and skills in real-time
- **Form Validation**: Comprehensive client-side validation
- **Mobile Optimized**: Responsive admin controls that don't interfere with content
- **Real-time Updates**: Changes reflect immediately across the site

---

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions

### Backend & Services

- **Firebase** - Authentication, Firestore database, hosting
- **EmailJS** - Contact form email integration
- **GitHub API** - Live repository data fetching

### Development & Deployment

- **ESLint** - Code linting and formatting
- **GitHub Actions** - Automated CI/CD pipeline
- **GitHub Pages** - Free hosting and deployment

---

## 📱 Screenshots

<!-- Add mobile screenshots -->

### Mobile View

![Mobile Home](./docs/images/mobile-home.png)
![Mobile Projects](./docs/images/mobile-projects.png)
![Mobile Admin](./docs/images/mobile-admin.png)

<!-- Add desktop screenshots -->

### Desktop View

![Desktop Home](./docs/images/desktop-home.png)
![Desktop Projects](./docs/images/desktop-projects.png)
![Desktop Admin Panel](./docs/images/desktop-admin.png)

<!-- Add feature screenshots -->

### Key Features

![Admin Panel](./docs/images/admin-panel.png)
![Skills Section](./docs/images/skills-section.png)
![Contact Form](./docs/images/contact-form.png)

---

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/Ashish73653/MyPortfolioReact.git
cd MyPortfolioReact/my-portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the `my-portfolio` directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Admin Configuration
VITE_ADMIN_EMAIL=your_admin_email@gmail.com

# GitHub Integration (Optional)
VITE_GITHUB_USERNAME=your_github_username
VITE_GITHUB_TOKEN=your_github_token

# EmailJS Configuration (Optional)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Google Analytics (Optional)
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the portfolio.

### 5. Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

---

## ⚙️ Configuration

### Firebase Setup

1. **Create Firebase Project**: Go to [Firebase Console](https://console.firebase.google.com/)
2. **Enable Authentication**: Set up Google Sign-in provider
3. **Create Firestore Database**: Set up collections for `skills` and `projects`
4. **Get Configuration**: Copy your Firebase config to `.env` file

Detailed Firebase setup guide: [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

### GitHub Integration

1. **Generate Personal Access Token**: Go to GitHub Settings > Developer settings
2. **Add Token to Environment**: Add `VITE_GITHUB_TOKEN` to your `.env`
3. **Set Username**: Add `VITE_GITHUB_USERNAME` to display your repositories

### EmailJS Setup

1. **Create EmailJS Account**: Go to [EmailJS](https://www.emailjs.com/)
2. **Set up Email Service**: Configure your email provider
3. **Create Template**: Design your email template
4. **Get Credentials**: Add service ID, template ID, and public key to `.env`

### Google Analytics Setup (Free)

1. **Create GA4 Property**: Go to [Google Analytics](https://analytics.google.com/)
2. **Add Property**: Click Admin → Create Property
3. **Configure Website**:
   - Name: Your Portfolio Name
   - URL: `https://ashishthakur.me`
   - Platform: Web
4. **Get Tracking ID**: Copy your measurement ID (e.g., `G-XXXXXXXXXX`)
5. **Add to Environment**: Add `VITE_GA_TRACKING_ID` to your `.env` file
6. **Deploy**: The analytics will be automatically included in production builds

**Note**: Analytics only work on the live site, not in local development.

---

## 🚀 Deployment

### GitHub Pages (Automated)

The project includes automated deployment via GitHub Actions:

1. **Push to Main Branch**: Any push to `main` triggers deployment
2. **Secrets Configuration**: Set up repository secrets for environment variables
3. **GitHub Pages**: Enable GitHub Pages from repository settings

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to your preferred hosting service
# (Vercel, Netlify, Firebase Hosting, etc.)
```

---

## 📁 Project Structure

```
MyPortfolioReact/
├── my-portfolio/                 # Main application directory
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── AdminButton.tsx  # Admin authentication button
│   │   │   ├── Layout.tsx       # Main layout wrapper
│   │   │   ├── Sidebar.tsx      # Navigation sidebar
│   │   │   ├── ProjectForm.tsx  # Project management form
│   │   │   └── SkillForm.tsx    # Skill management form
│   │   ├── pages/               # Main pages
│   │   │   ├── About.tsx        # Home/About page
│   │   │   ├── Projects.tsx     # Projects showcase
│   │   │   ├── Skills.tsx       # Skills visualization
│   │   │   ├── Resume.tsx       # Resume/CV page
│   │   │   ├── GithubRepos.tsx  # GitHub repositories
│   │   │   └── ContactMe.tsx    # Contact form
│   │   ├── config/              # Configuration files
│   │   │   └── firebase.ts      # Firebase configuration
│   │   ├── hooks/               # Custom React hooks
│   │   │   └── useFirebase.ts   # Firebase data hooks
│   │   ├── contexts/            # React contexts
│   │   │   └── AuthContext.tsx  # Authentication context
│   │   └── utils/               # Utility functions
│   ├── public/                  # Static assets
│   │   ├── 404.html            # SPA routing support
│   │   └── .nojekyll           # GitHub Pages configuration
│   ├── .env                    # Environment variables
│   ├── package.json            # Dependencies and scripts
│   ├── tailwind.config.js      # Tailwind CSS configuration
│   └── vite.config.ts          # Vite configuration
├── .github/workflows/          # GitHub Actions
│   └── deploy.yml              # Automated deployment
├── docs/images/                # Documentation images
├── FIREBASE_SETUP.md           # Firebase setup guide
├── EMAIL_ALTERNATIVES.md       # EmailJS alternatives
└── README.md                   # This file
```

---

## 🎨 Customization

### Styling

- **Colors**: Modify `tailwind.config.js` for color schemes
- **Animations**: Customize Framer Motion animations in components
- **Layout**: Adjust responsive breakpoints and spacing

### Content

- **Personal Information**: Update content in page components
- **Social Links**: Modify links in `ContactMe.tsx`
- **Resume**: Replace with your own resume data in `Resume.tsx`

### Features

- **Add New Sections**: Create new page components and add routes
- **Extend Admin Panel**: Add new content types to Firebase collections
- **Integrate APIs**: Add new data sources in the hooks directory

---

## 🐛 Troubleshooting

### Common Issues

**Firebase not configured:**

- Check your `.env` file has all required Firebase variables
- Restart the dev server after updating `.env`

**404 errors on GitHub Pages:**

- Ensure `404.html` is present in the build output
- Check that the base URL is correctly set in `vite.config.ts`

**Admin mode not working:**

- Verify your email in `VITE_ADMIN_EMAIL` matches your Google account
- Check Firestore security rules allow your account

**Build failures:**

- Clear `node_modules` and reinstall dependencies
- Check for TypeScript errors with `npm run type-check`

### Performance Tips

- **Optimize Images**: Use WebP format and appropriate sizes
- **Code Splitting**: Implement lazy loading for large components
- **Bundle Analysis**: Use `npm run build -- --analyze` to check bundle size

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/AmazingFeature`
3. **Commit your changes**: `git commit -m 'Add some AmazingFeature'`
4. **Push to the branch**: `git push origin feature/AmazingFeature`
5. **Open a Pull Request**

### Code Style

- Use TypeScript for type safety
- Follow existing code formatting (ESLint configuration)
- Write meaningful commit messages
- Add comments for complex logic

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Framer Motion** - For smooth animations
- **Tailwind CSS** - For utility-first styling
- **Firebase** - For backend services
- **Vite** - For fast development experience

---

## 📞 Contact

**Ashish Singh**

- 📧 Email: ash1sh.1hakur10@gmail.com
- 🌐 Portfolio: [https://ashish73653.github.io/MyPortfolioReact/](https://ashish73653.github.io/MyPortfolioReact/)
- 💼 LinkedIn: [Your LinkedIn Profile]
- 🐱 GitHub: [@Ashish73653](https://github.com/Ashish73653)

---

⭐ **If you found this project helpful, please give it a star!** ⭐
