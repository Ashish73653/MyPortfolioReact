# Modern Portfolio Website

A cutting-edge portfolio website built with React, TypeScript, and modern web technologies. Features smooth animations, responsive design, and Firebase integration for dynamic content management.

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Routing**: React Router DOM
- **Build Tool**: Vite

## ✨ Features

### Core Features

- 🎨 **Modern UI/UX**: Beautiful, responsive design with smooth animations
- 📱 **Fully Responsive**: Optimized for all screen sizes (mobile, tablet, desktop)
- ⚡ **Performance Optimized**: 60fps animations that feel "feather-light"
- 🌙 **Dark/Light Theme**: Toggle between themes
- 🔧 **Admin Panel**: Firebase-authenticated content management
- 📊 **Real-time Data**: Dynamic content via Firestore

### Page Components

1. **Home** - Hero section with animated introduction
2. **About** - Personal story and achievements
3. **Resume** - Interactive resume with download functionality
4. **GitHub Repos** - Live GitHub integration with repository showcase
5. **Skills** - Interactive skill visualization with progress bars
6. **Projects** - Project showcase with filtering and search
7. **Contact** - Contact form with social media integration

### Advanced Features

- **Sidebar Navigation**: Smooth collapsible sidebar with animations
- **Admin Authentication**: Firebase Auth for content editing
- **CRUD Operations**: Add/edit/delete projects and skills
- **Image Upload**: Firebase Storage integration
- **Form Validation**: Comprehensive form handling
- **SEO Optimized**: Meta tags and structured data
- **PWA Ready**: Progressive Web App capabilities

## 🏗️ Development Phases

### Phase 1: Foundation & Core Infrastructure 🏗️

**Timeline: 1-2 days**

- [x] Firebase Integration & Configuration
- [x] Enhanced Animation System Setup
- [x] UI Foundation & Design System
- [x] Sidebar Navigation with Smooth Animations
- [x] Responsive Layout Structure

### Phase 2: Content Pages Development 📄

**Timeline: 2-3 days**

- [ ] Home Page with Hero Section
- [ ] About Page with Timeline
- [ ] Resume Page with Interactive Viewer
- [ ] Page Transition Animations

### Phase 3: Dynamic Content & GitHub Integration 🔧

**Timeline: 2-3 days**

- [ ] GitHub API Integration
- [ ] Skills Page with Interactive Charts
- [ ] Projects Page with CRUD Operations
- [ ] Search and Filter Functionality

### Phase 4: Admin System & Contact 🔐

**Timeline: 2-3 days**

- [ ] Firebase Authentication System
- [ ] Admin Panel for Content Management
- [ ] Contact Form with Firestore Integration
- [ ] File Upload System

### Phase 5: Polish & Performance 🚀

**Timeline: 1-2 days**

- [ ] Performance Optimization
- [ ] Mobile Enhancement
- [ ] SEO Implementation
- [ ] PWA Features

## 🔥 Firebase Structure

### Collections Schema

```javascript
// projects
{
  id: string,
  title: string,
  description: string,
  technologies: string[],
  images: string[],
  liveUrl?: string,
  githubUrl?: string,
  featured: boolean,
  createdAt: timestamp,
  updatedAt: timestamp
}

// skills
{
  id: string,
  name: string,
  category: string, // 'frontend' | 'backend' | 'tools' | 'languages'
  level: number, // 1-100
  icon?: string,
  description?: string
}

// settings
{
  theme: 'light' | 'dark',
  contactEmail: string,
  socialLinks: {
    github?: string,
    linkedin?: string,
    twitter?: string
  },
  aboutText: string,
  resumeUrl?: string
}
```

## 🎨 Animation Philosophy

### Performance-First Approach

- **60fps Target**: All animations optimized for smooth performance
- **GPU Acceleration**: Transform and opacity-based animations
- **Reduced Motion**: Respects user accessibility preferences
- **Lazy Loading**: Components load animations only when visible

### Animation Types

- **Entrance Effects**: Staggered reveal animations
- **Hover Interactions**: Subtle scale and shadow effects
- **Page Transitions**: Smooth route change animations
- **Micro-interactions**: Button feedback and form validation
- **Loading States**: Skeleton loaders and progress indicators

## 📱 Responsive Design

### Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1439px
- **Ultra-wide**: 1440px+

### Layout Strategy

- **Mobile-First**: Progressive enhancement approach
- **Flexible Sidebar**: Collapsible navigation optimized for each screen size
- **Touch-Friendly**: Large tap targets and gesture support
- **Content Adaptation**: Responsive typography and spacing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd my-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Firebase Setup**

   ```bash
   # Create .env file with Firebase config
   cp .env.example .env
   # Add your Firebase configuration
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### Environment Variables

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_ADMIN_EMAIL=your_admin_email@domain.com
```

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

## 🎯 Features in Detail

### Admin Panel

- **Secure Authentication**: Firebase Auth with email verification
- **Content Management**: Add, edit, delete projects and skills
- **Image Upload**: Drag-and-drop file upload to Firebase Storage
- **Real-time Updates**: Changes reflect immediately across the site
- **Form Validation**: Comprehensive client-side and server-side validation

### GitHub Integration

- **Live Repository Data**: Fetches repositories via GitHub API
- **Language Statistics**: Visual representation of coding languages
- **Activity Visualization**: Contribution graphs and statistics
- **Automatic Updates**: Regular sync with GitHub data

### Performance Optimizations

- **Code Splitting**: Route-based and component-based splitting
- **Image Optimization**: WebP format with fallbacks
- **Bundle Analysis**: Webpack bundle analyzer integration
- **Caching Strategy**: Service worker for offline functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Framer Motion** for smooth animations
- **Tailwind CSS** for utility-first styling
- **Firebase** for backend services
- **React** ecosystem for robust development experience

---

**Built with ❤️ using modern web technologies**
{
files: ['**/*.{ts,tsx}'],
extends: [
// Other configs...
// Enable lint rules for React
reactX.configs['recommended-typescript'],
// Enable lint rules for React DOM
reactDom.configs.recommended,
],
languageOptions: {
parserOptions: {
project: ['./tsconfig.node.json', './tsconfig.app.json'],
tsconfigRootDir: import.meta.dirname,
},
// other options...
},
},
])

```

```
