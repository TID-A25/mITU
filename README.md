# mITU - ITU Student Social Network

A social networking application designed for IT University of Copenhagen students to connect based on shared interests, programs, and semesters.

## 🎯 Overview

mITU helps ITU students discover and connect with peers who share similar interests. The app allows students to:
- Browse profiles organized by shared interests
- Send "bump" requests to connect with other students
- Manage their profile with interests, program, semester, and contact information
- View notifications for bump requests and acceptances
- Share contact information based on privacy preferences

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1
- **Build Tool**: Vite 7.1
- **Routing**: React Router DOM 7.9
- **Backend**: Parse Server (Back4App)
- **Database**: Parse/Back4App Cloud Database
- **Styling**: CSS (custom)
- **Languages**: JavaScript (ES6+)

## 📋 Prerequisites

Before running this project, ensure you have:
- Node.js (v18 or higher recommended)
- npm (comes with Node.js)
- A Back4App account with Parse Server configured

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/TID-A25/mITU.git
cd mITU
```

2. Install dependencies:
```bash
npm install
```

3. Configure Parse/Back4App:
   - The Parse configuration is located in `src/constants/parseConfig.js`
   - Update with your Back4App credentials if needed

4. Deploy Cloud Functions:
   - In Back4App Dashboard → Cloud Code → main.js
   - Copy the Cloud Functions from your implementation
   - Deploy the functions

### Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 📁 Project Structure

```
mITU/
├── src/
│   ├── assets/
│   │   └── images/                 # Profile pictures, interest icons
│   ├── components/
│   │   ├── bump/                   # Bump-related components
│   │   ├── buttons/                # Reusable button components
│   │   ├── footer/                 # App footer
│   │   ├── header/                 # App header with navigation
│   │   ├── interestCard/           # Individual interest display
│   │   ├── interestGallery/        # Interest collection display
│   │   ├── profileCard/            # User profile card
│   │   ├── profileGallery/         # Profile collection display
│   │   ├── profileHeader/          # Profile page header
│   │   ├── profileInfo/            # Profile information section
│   │   ├── profileInterests/       # Profile interests display
│   │   ├── profileSection/         # Profile section wrapper
│   │   └── ui/                     # UI components (Toast, etc.)
│   ├── constants/
│   │   ├── parseConfig.js          # Parse/Back4App configuration
│   │   └── currentUser.js          # Current user management
│   ├── data/
│   │   └── mockProfiles.js         # Mock data for testing
│   ├── hooks/
│   │   ├── useProfile.js           # Fetch single profile
│   │   ├── useProfiles.js          # Fetch multiple profiles
│   │   ├── useBumpStatus.js        # Check bump status
│   │   ├── useCreateBump.js        # Create bump requests
│   │   ├── useEditProfile.js       # Edit profile functionality
│   │   └── useNotifications.js     # Fetch notifications
│   ├── pages/
│   │   ├── Home.jsx                # Main feed page
│   │   ├── UserProfile.jsx         # User profile view
│   │   ├── EditProfile.jsx         # Profile editing
│   │   ├── BumpSent.jsx            # Sent bump request page
│   │   ├── BumpReceived.jsx        # Received bump request page
│   │   ├── BumpAccepted.jsx        # Accepted bump page
│   │   ├── Notifications.jsx       # Notifications page
│   │   └── NotFound.jsx            # 404 page
│   ├── services/
│   │   ├── parseQueries.js         # All Parse database queries
│   │   └── profileMapper.js        # Profile data transformation
│   ├── styles/
│   │   └── theme.css               # Global theme variables
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # App entry point
│   └── index.css                   # Global styles
├── public/                         # Static assets
├── index.html                      # HTML template
├── vite.config.js                  # Vite configuration
├── eslint.config.js                # ESLint configuration
└── package.json                    # Dependencies and scripts
```

## 🏗️ Architecture

### Service Layer Pattern
All Parse database operations are centralized in `src/services/parseQueries.js` to maintain separation of concerns:
- **Services**: Handle all data fetching and mutations
- **Hooks**: Manage state and side effects, call service functions
- **Components**: Pure presentation, receive data via props or hooks

### Key Features Implementation

**N+1 Query Optimization**
- Uses bulk queries with lookup maps to minimize database calls
- Fetches all user interests in a single query instead of per-user queries

**Cloud Functions**
- `getDemoUsers`: Fetches user list for demo mode
- `setDemoUser`: Validates and sets current demo user
- Deployed on Back4App for secure server-side operations

**Custom Hooks**
- Encapsulate business logic and state management
- Provide clean API for components
- Handle loading states, errors, and data fetching

## 🎨 Design Features

### Accessibility
- **Colorblind-safe palette**:
  - Error: `#D32F2F` (red)
  - Success: `#2E7D32` (green)
  - Info: `#1976D2` (blue)
  - Warning: `#ED6C02` (orange)
- Centered loading states for visibility
- Clear visual feedback for all actions

### User Experience
- Toast notifications for actions (bump sent, profile updated, etc.)
- Real-time bump status updates
- Privacy controls for phone number visibility
- Shared interest highlighting
- Responsive design

## 🗄️ Database Schema

### Main Tables

**Users**
- `first_name`, `last_name`: User name
- `profile_pic`: Profile picture file
- `programme`: Degree program
- `semester`: Current semester
- `country`: Country of origin
- `phone`: Phone number
- `phone_visibility`: Privacy setting ("all", "bumps", "hidden")

**Interest**
- `interest_name`: Name of the interest
- `interest_pic`: Interest icon

**User_interests** (Join table)
- `user`: Pointer to Users
- `interest`: Pointer to Interest

**Bump_status**
- `userA`, `userB`: Pointers to Users
- `status`: "pending" or "accepted"
- `requestedBy`: Pointer to User who initiated

## 🔐 Security

- Cloud Functions use `useMasterKey` for secure database access
- No hardcoded user IDs in client code
- Server-side validation for user operations
- Privacy controls for contact information

## 📱 Features

### For Students
- ✅ Browse students by shared interests
- ✅ View detailed profiles with interests, program, and semester
- ✅ Send bump requests to connect
- ✅ Accept or decline bump requests
- ✅ Edit profile information and interests
- ✅ Manage contact information privacy
- ✅ View notifications for bumps

### Admin/Demo Features
- 🔄 User switcher for testing different accounts
- 🎯 Demo mode with Cloud Functions

## 🧪 Testing

The app includes a user switcher component for testing:
- Switch between different user accounts
- Test bump functionality from multiple perspectives
- Verify privacy settings work correctly

## 🤝 Contributing

This is a student project for IT University of Copenhagen. If you're contributing:
1. Follow the existing code structure
2. Use the service layer for all database operations
3. Create custom hooks for reusable logic
4. Follow the colorblind-safe color palette
5. Add comments for complex logic

## 📄 License

This project is for educational purposes at IT University of Copenhagen.

## 👥 Authors

- IT University of Copenhagen Students (TID-A25)

## 🐛 Known Issues

- Deployment requires manual Cloud Function setup in Back4App
- Demo mode persists in localStorage (intentional for development)

## 🔮 Future Enhancements

- Real authentication system
- Chat functionality between bumped users
- Event creation and management
- Study group formation
- Course-based filtering
