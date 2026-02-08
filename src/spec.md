# Specification

## Summary
**Goal:** Replace the current Internet Identity–based admin access with a password-only login and show stored quote/contact submissions after login.

**Planned changes:**
- Update `#/admin` to show a password-only login form (no Internet Identity login, no name/profile prompt) and grant access only when the password matches exactly `harsh600606`.
- Add a backend method to fetch stored contact/quote submissions by validating the provided shared password (`harsh600606`), returning an English error on mismatch.
- Update the admin dashboard to load and display submissions (name, phone, email, message, date) after successful password login, and remove the “Access Denied / Only authorized administrators” blocking state for password-authenticated users.
- Persist the successful admin login for the same browser session (survives refresh/navigation) and add a “Log out” action that clears the session and returns to the password prompt.
- Show English error states for incorrect password and for failed submissions fetch (with retry/refresh guidance).

**User-visible outcome:** Visiting `#/admin` prompts for a single password; entering `harsh600606` opens the admin dashboard and displays quote/contact replies, remains logged in during the same browser session, and provides a logout button.
