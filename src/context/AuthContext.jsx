import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/firebase';

const AuthContext = createContext(null);

const authErrorMessage = (error) => {
  switch (error?.code) {
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed before finishing. Please try again.';
    case 'auth/cancelled-popup-request':
      return 'Another sign-in popup is already open.';
    case 'auth/popup-blocked':
      return 'Your browser blocked the sign-in popup. Allow popups and try again.';
    case 'auth/network-request-failed':
      return 'Network error. Check your connection and try again.';
    case 'auth/unauthorized-domain':
      return 'This domain is not authorized in the Firebase console.';
    case 'auth/operation-not-allowed':
      return 'Google sign-in is not enabled for this Firebase project.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    default:
      return error?.message || 'Unable to sign in with Google right now.';
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setIsInitializing(false);
    });

    return unsubscribe;
  }, []);

  const clearError = useCallback(() => setError(''), []);

  const loginWithGoogle = useCallback(async () => {
    setError('');
    setIsSigningIn(true);
    try {
      const credential = await signInWithPopup(auth, googleProvider);
      return credential.user;
    } catch (signInError) {
      setError(authErrorMessage(signInError));
      return null;
    } finally {
      setIsSigningIn(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setError('');
    try {
      await signOut(auth);
    } catch (signOutError) {
      setError(authErrorMessage(signOutError));
    }
  }, []);

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    isInitializing,
    isSigningIn,
    error,
    clearError,
    loginWithGoogle,
    logout
  }), [user, isInitializing, isSigningIn, error, clearError, loginWithGoogle, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
