---
name: testing-firebase-auth
description: How to run and test the Google Keep clone locally, including how to exercise Google-only Firebase auth without a real Google account (Firebase Auth emulator).
---

# Testing the Keep clone + Firebase Google auth

## Running the app
- `npm install` (node_modules is committed but ships win32 binaries — a Linux install is required).
- `npm run dev` serves on port 3000; if that port is taken vite silently picks 3001+ — read the
  actual URL from the vite output instead of assuming 3000.
- Routes: `/login` (public), `/` (protected dashboard), anything else redirects to `/`.

## Testing sign-in without a Google account
The real `signInWithPopup` opens accounts.google.com against the live Firebase project
`keep-clone-706a6`. Without a test Google account you can still verify:
- the popup opens and the button switches to a disabled "Signing in..." spinner;
- closing the popup surfaces "Sign-in popup was closed before finishing. Please try again."
  Firebase detects the closed popup by polling — allow ~8-12 seconds before judging it hung.

To reach the authenticated dashboard, use the Firebase Auth emulator (no Google account needed):
1. `npx -y firebase-tools@13 emulators:start --only auth --project demo-keep` (listens on 127.0.0.1:9099).
2. Temporarily add an env-gated hook in `src/firebase/firebase.js` after `getAuth(app)`:
   `if (env.VITE_AUTH_EMULATOR_URL) connectAuthEmulator(auth, env.VITE_AUTH_EMULATOR_URL, { disableWarnings: true });`
3. Run a second server: `VITE_AUTH_EMULATOR_URL=http://127.0.0.1:9099 npx vite --port 3002 --strictPort`.
4. Click "Continue with Google" -> emulator widget -> "Add new account" -> fill Email, Display name
   and Profile photo URL to exercise the header account menu (photo/name/email/Sign out).
5. `git checkout -- src/firebase/firebase.js` afterwards. Keep the un-emulated instance running in
   parallel so the real popup path can still be tested.

## Responsive checks
Resize the real window with `wmctrl -r :ACTIVE: -e 0,0,0,<w>,<h>` (display is 1600x1200; Chrome
refuses to go narrower than ~500 CSS px, so a true 390px mobile width is not reachable this way).
Note `.keep-wordmark { display: none }` at `max-width: 850px` also hides the wordmark on the
login card, not just in the header — expect the login brand to show only the bulb logo on narrow
screens.

## Devin Secrets Needed
None. A Google test account would be needed to complete a real end-to-end Google sign-in.
