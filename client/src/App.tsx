import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentsPage from './pages/StudentsPage';
import EditStudentPage from './pages/EditStudentPage';
import { encryptLevel1, decryptLevel1 } from './utils/crypto';

export interface User {
  id: string;
  fullName: string;
  email: string;
}

const App: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('loggedInUser');
    if (!stored) return null;
    try {
      const decrypted = decryptLevel1(stored);
      return JSON.parse(decrypted);
    } catch {
      localStorage.removeItem('loggedInUser');
      return null;
    }
  });
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLoginSuccess = (user: User) => {
    const encrypted = encryptLevel1(JSON.stringify(user));
    localStorage.setItem('loggedInUser', encrypted);
    setLoggedInUser(user);
  };

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
    setShowLogoutDialog(false);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        <Navbar
          isLoggedIn={!!loggedInUser}
          userName={loggedInUser?.fullName}
          onLogout={handleLogoutClick}
        />

        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
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
                loggedInUser ? <StudentsPage currentUserId={loggedInUser.id} onAccountDeleted={confirmLogout} /> : <Navigate to="/login" replace />
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

        {/* Logout Confirmation Dialog */}
        {showLogoutDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="mx-4 w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-card-foreground">Logout</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Are you sure you want to logout? You will need to sign in again to access the dashboard.
              </p>
              <div className="mt-6 flex gap-3 justify-end">
                <button
                  onClick={() => setShowLogoutDialog(false)}
                  className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
