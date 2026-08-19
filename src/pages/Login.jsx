import { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GoogleIcon from '../components/GoogleIcon';

function Login() {
  const { isAuthenticated, isInitializing, isSigningIn, error, clearError, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || '/';

  useEffect(() => clearError, [clearError]);

  if (isInitializing) {
    return <div className="auth-splash">Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  const handleSignIn = async () => {
    const signedInUser = await loginWithGoogle();
    if (signedInUser) {
      navigate(redirectTo, { replace: true });
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand" aria-hidden="true">
          <div className="keep-logo">
            <div className="keep-logo-bulb">
              <div className="keep-logo-glow"></div>
            </div>
            <div className="keep-logo-base"></div>
          </div>
          <span className="keep-wordmark">Keep</span>
        </div>

        <h1 className="login-title">Sign in to continue</h1>
        <p className="login-subtitle">
          Use your Google account to access your notes on any device.
        </p>

        <button
          type="button"
          className="google-button"
          onClick={handleSignIn}
          disabled={isSigningIn}
        >
          {isSigningIn ? (
            <>
              <span className="google-button-spinner" aria-hidden="true"></span>
              Signing in...
            </>
          ) : (
            <>
              <GoogleIcon size={20} />
              Continue with Google
            </>
          )}
        </button>

        {error ? (
          <p className="login-error" role="alert">{error}</p>
        ) : null}

        <p className="login-footnote">
          Google sign-in is the only way to access this app.
        </p>
      </div>
    </div>
  );
}

export default Login;
