# 🚀 Guide: Push to GitHub & Deploy to Production

This guide walks you through pushing your secured, premium Deep Cuts Salon website to GitHub and deploying it live.

---

## 📦 Part 1: Push Code to GitHub

Since git is not in the sandbox PATH, you can run these commands directly in **your local computer's terminal** (PowerShell, Command Prompt, or VS Code terminal):

### Step 1: Open Your Terminal
Make sure you are in your project directory:
```bash
cd c:\Users\Hashim\Downloads\deep-cuts-salon-homepage
```

### Step 2: Initialize Git (If not already initialized)
If you haven't initialized git in this directory yet, run:
```bash
git init
```

### Step 3: Add the Files & Create Initial Commit
Add all files to stage and commit them:
```bash
git add .
git commit -m "chore: initial commit with security hardening and premium UI updates"
```

### Step 4: Rename Branch to Main
It's recommended to use `main` as your default branch:
```bash
git branch -M main
```

### Step 5: Link Your GitHub Repository
Run this command to tell Git where your repository is hosted:
```bash
git remote add origin https://github.com/hash-j/Deep-Cuts-Salon.git
```
*(If you already have a remote named origin, you can change it with: `git remote set-url origin https://github.com/hash-j/Deep-Cuts-Salon.git`)*

### Step 6: Push Code to GitHub
Push your local code up to the remote repository:
```bash
git push -u origin main
```

---

## 🌐 Part 2: Deploy to Production (Vercel)

Vercel is the creator of Next.js and provides the absolute best, fastest, and most secure hosting platform for it. It is 100% free for personal/hobby projects.

### Step 1: Create a Vercel Account
1. Go to [vercel.com](https://vercel.com) and click **Sign Up**.
2. Select **Continue with GitHub** to link your accounts.

### Step 2: Import Your Project
1. Once logged in, click **Add New...** → **Project**.
2. You will see a list of your GitHub repositories. Find **Deep-Cuts-Salon** and click **Import**.

### Step 3: Configure Project Settings
- **Framework Preset**: Next.js (automatically detected)
- **Root Directory**: `./` (automatically detected)
- **Build & Development Settings**: Keep defaults
- **Environment Variables**: None needed! (The app is fully self-contained and pre-configured)

### Step 4: Click Deploy 🚀
Click the **Deploy** button. Vercel will:
1. Pull your code from GitHub.
2. Run `npm run build` (which compiles and minifies the page).
3. Provide you with a live preview URL (e.g. `deep-cuts-salon.vercel.app`).

### Step 5: Connect Custom Domain (Optional)
If your client has a domain (like `deepcutssalon.com`):
1. In Vercel, go to your project → **Settings** → **Domains**.
2. Type in your domain name and click **Add**.
3. Update your domain registrar's DNS records (e.g., GoDaddy, Namecheap) with the A record or CNAME record provided by Vercel.

---

## ⚡ Part 3: Deploy to Production (Alternative: Netlify)

If you prefer to use Netlify:
1. Go to [netlify.com](https://netlify.com) and log in with GitHub.
2. Click **Add new site** → **Import an existing project**.
3. Choose **GitHub** and authorize access.
4. Select **Deep-Cuts-Salon**.
5. Keep defaults (Netlify will auto-detect Next.js runtime settings).
6. Click **Deploy site**.
