# mITU — ITU Student Social Network

A web application designed to support social integration among international students at the IT University of Copenhagen.

The platform enables students to discover peers with shared interests, initiate low-pressure social interactions, and manage their personal profile.

## 1. Purpose

mITU addresses a recurring challenge identified in user research: many international students arrive in Denmark without an established social network and have difficulty forming connections, especially with peers outside their nationality group. The application supports:

- Discovery of students with shared interests
- A lightweight, "low-pressure" mechanism for initiating contact - "bumps"
- Profile customization and selective contact-information visibility
- A structured, interest-driven feed designed to lower cognitive load for newcomers

## 2. Features

### Core Functionality

- Interest-based profile feed grouped visually by categories.
- Profile pages with programme, semester, country, interests, and optional WhatsApp visibility.
- Bump interaction model, providing a non-formal way to signal interest in connecting.
- Notification center for received and sent bump requests.
- Edit Profile interface for modifying interests and privacy settings.

## 3. Tech Stack

- **Frontend**: React 19.1, Vite 7.1
- **Routing**: React Router DOM 7.9
- **Backend**: Parse Server (Back4App)
- **Database**: Parse Cloud Database
- **Languages**: JavaScript (ES6+)
- **Styling**: CSS

## 4. Prerequisites

- Node.js ≥ 18
- npm

## 5. Installation and Setup

### Clone the repository

```bash
git clone https://github.com/TID-A25/mITU.git
cd mITU
```

### Install dependencies

```bash
npm install
```

### Start application on local server

```bash
npm run dev
```

## 6. Project Structure

```
mITU/
├── src/
│   ├── assets/               # Images, icons
│   ├── components/           # Modular UI components
│   ├── constants/            # App-wide configuration
│   ├── data/                 # Mock data for testing
│   ├── hooks/                # Data-fetching & logic abstraction
│   ├── pages/                # App views/screens
│   ├── services/             # Parse queries & data mappers
│   ├── styles/               # Global styling
│   ├── App.jsx               # Root component
│   └── main.jsx              # Entry point
├── public/                   
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

## 7. Authors

Caroline Bjørner, Jakob Thalbitzer Thiberg, Sine Ergin, Victoria Emilova Vardina

IT University of Copenhagen — Group 10
