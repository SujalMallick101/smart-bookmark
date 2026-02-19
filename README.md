# 🔖 Smart Bookmark Manager (Full Stack)

A modern bookmark management web application that helps users save, organize and access important links from anywhere.
Built using **Next.js, MongoDB, NextAuth (Google OAuth), and Tailwind CSS**.

🌐 **Live Demo:** https://smart-bookmark-4zvl-k6tpa38h3-sujalmallick101s-projects.vercel.app

---

## 🚀 Features

* Google Authentication (Secure Login with Gmail)
* Add new bookmarks with title & URL
* Delete bookmarks
* Personal dashboard (user-specific data)
* Responsive UI (works on mobile & desktop)
* Protected routes (only logged-in users can access dashboard)
* Persistent login sessions
* Cloud database storage (MongoDB Atlas)

---

## 🧑‍💻 Tech Stack

**Frontend**

* Next.js 14 (App Router)
* React.js
* Tailwind CSS

**Backend**

* Next.js Server Actions / API Routes
* NextAuth.js Authentication

**Database**

* MongoDB Atlas
* Mongoose

**Deployment**

* Vercel (Frontend + Backend hosting)

---

## 📸 Application Flow

1. User opens the website
2. User logs in with Google
3. Google verifies and returns user email
4. Session is created using NextAuth
5. User is redirected to dashboard
6. User can add/delete bookmarks
7. Bookmarks are stored in MongoDB
8. Only that user can see their bookmarks

---

## 🔐 Authentication

Authentication is implemented using **NextAuth.js with Google OAuth 2.0**.

Why Google OAuth?

* No password handling required
* Secure authentication
* Industry-standard login
* Prevents fake accounts

---


## 🧪 Problems Faced & How I Solved Them

### 1. Google Login worked locally but failed after deployment

**Problem:**
After deploying to Vercel, login showed `redirect_uri_mismatch` error.

**Cause:**
Google OAuth requires production domain to be registered.

**Solution:**
Added Vercel domain to:

* Authorized JavaScript Origins
* Authorized Redirect URIs
  inside Google Cloud Console.

---

### 2. Users unable to login (App not verified)

**Problem:**
Friends couldn't login and saw "app in testing mode".

**Cause:**
Google OAuth Consent Screen was in Testing Mode.

**Solution:**
Added their Gmail IDs as **Test Users** in OAuth consent screen.

---


### 3. Session lost after refresh

**Problem:**
User logged out automatically after refreshing page.

**Cause:**
NEXTAUTH_URL not configured in production.

**Solution:**
Set `NEXTAUTH_URL=https://your-project-name.vercel.app` in Vercel environment variables.

---

## 🛠️ How to Run Locally

```bash
git clone https://github.com/your-username/smart-bookmark-manager.git

cd smart-bookmark-manager

npm install

npm run dev
```

Open:
http://localhost:3000

---

## 🎯 What I Learned

* Real-world authentication using OAuth
* Secure session management
* Database integration with cloud
* Handling production deployment issues
* Environment variables and secrets management
* Debugging authentication errors

---

## 📌 Future Improvements

* Edit bookmark feature
* Folder/category organization
* Search bookmarks
* Bookmark tags
* Dark mode
* Share bookmarks

---

## 👤 Author

**Sujal Mallick**
BCA Student | Full Stack Developer (MERN & Next.js)

GitHub: https://github.com/SujalMallick101/
LinkedIn: https://www.linkedin.com/in/sujal-mallick-75518a291

---

⭐ If you found this project useful, consider giving it a star!
