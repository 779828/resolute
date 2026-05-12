import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentsPage from './pages/StudentsPage';
import EditStudentPage from './pages/EditStudentPage';

export interface User {
  id: string;
  fullName: string;
  email: string;
}

const App: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const handleLoginSuccess = (user: User) => {
    setLoggedInUser(user);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Navbar
          isLoggedIn={!!loggedInUser}
          userName={loggedInUser?.fullName}
          onLogout={handleLogout}
        />

        <main className="mx-auto max-w-6xl px-6 py-10">
          <Routes>
            <Route
              path="/"
              element={
                loggedInUser ? <Navigate to="/students" replace /> : <LandingPage />
              }
            />
            <Route
              path="/login"
              element={
                loggedInUser ? (
                  <Navigate to="/students" replace />
                ) : (
                  <LoginPage onLoginSuccess={handleLoginSuccess} />
                )
              }
            />
            <Route
              path="/register"
              element={<RegisterPage />}
            />
            <Route
              path="/students"
              element={
                loggedInUser ? <StudentsPage /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/students/edit/:id"
              element={
                loggedInUser ? <EditStudentPage /> : <Navigate to="/login" replace />
              }
            />
          </Routes>
        </main>

        <footer className="border-t border-border py-6 text-center">
          <p className="text-sm text-muted-foreground">
            Resolute &mdash; Student Registration System with 2-Level AES Encryption
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
