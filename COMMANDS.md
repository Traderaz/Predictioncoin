# 📝 Useful Commands Reference

Quick reference for all commands you'll need for Prediction Coin.

## 🚀 Development

### Start Development Server
\`\`\`bash
npm run dev
\`\`\`
Starts the development server at http://localhost:3000

### Build for Production
\`\`\`bash
npm run build
\`\`\`
Creates an optimized production build

### Start Production Server (Local)
\`\`\`bash
npm run start
\`\`\`
Runs the production build locally (must build first)

### Run Linter
\`\`\`bash
npm run lint
\`\`\`
Checks code for errors and style issues

## 📦 Package Management

### Install Dependencies
\`\`\`bash
npm install
\`\`\`
Installs all required packages

### Install Specific Package
\`\`\`bash
npm install package-name
\`\`\`

### Install Dev Dependency
\`\`\`bash
npm install --save-dev package-name
\`\`\`

### Update Packages
\`\`\`bash
npm update
\`\`\`

### Check for Outdated Packages
\`\`\`bash
npm outdated
\`\`\`

## 🔥 Firebase

### Seed Database with Default Polls
\`\`\`bash
npx ts-node scripts/seedData.ts
\`\`\`

### Firebase Login (if using Firebase CLI)
\`\`\`bash
npm install -g firebase-tools
firebase login
firebase init
\`\`\`

### Deploy Firebase Rules
\`\`\`bash
firebase deploy --only firestore:rules
firebase deploy --only storage:rules
\`\`\`

## 📱 Git Commands

### Initialize Repository
\`\`\`bash
git init
\`\`\`

### Add All Files
\`\`\`bash
git add .
\`\`\`

### Commit Changes
\`\`\`bash
git commit -m "Your commit message"
\`\`\`

### Create Main Branch
\`\`\`bash
git branch -M main
\`\`\`

### Add Remote Repository
\`\`\`bash
git remote add origin https://github.com/username/repo.git
\`\`\`

### Push to GitHub
\`\`\`bash
git push -u origin main
\`\`\`

### Check Status
\`\`\`bash
git status
\`\`\`

### View Commit History
\`\`\`bash
git log
\`\`\`

## 🚢 Vercel Deployment

### Install Vercel CLI
\`\`\`bash
npm install -g vercel
\`\`\`

### Deploy to Vercel (CLI)
\`\`\`bash
vercel
\`\`\`

### Deploy to Production
\`\`\`bash
vercel --prod
\`\`\`

### View Deployment Logs
\`\`\`bash
vercel logs
\`\`\`

## 🧹 Cleanup Commands

### Remove node_modules
\`\`\`bash
# Windows
rmdir /s /q node_modules

# Mac/Linux
rm -rf node_modules
\`\`\`

### Remove .next Build Cache
\`\`\`bash
# Windows
rmdir /s /q .next

# Mac/Linux
rm -rf .next
\`\`\`

### Fresh Install
\`\`\`bash
# Windows
rmdir /s /q node_modules
rmdir /s /q .next
npm install

# Mac/Linux
rm -rf node_modules .next
npm install
\`\`\`

## 🔍 Debugging

### Check Node Version
\`\`\`bash
node --version
\`\`\`
Should be v18 or higher

### Check npm Version
\`\`\`bash
npm --version
\`\`\`

### View Installed Packages
\`\`\`bash
npm list
\`\`\`

### View Package Details
\`\`\`bash
npm view package-name
\`\`\`

### Check for Vulnerabilities
\`\`\`bash
npm audit
\`\`\`

### Fix Vulnerabilities
\`\`\`bash
npm audit fix
\`\`\`

## 🎨 Code Quality

### Format Code (if Prettier installed)
\`\`\`bash
npx prettier --write .
\`\`\`

### Type Check
\`\`\`bash
npx tsc --noEmit
\`\`\`

## 🧪 Testing (when tests are added)

### Run Tests
\`\`\`bash
npm test
\`\`\`

### Run Tests in Watch Mode
\`\`\`bash
npm test -- --watch
\`\`\`

### Run Tests with Coverage
\`\`\`bash
npm test -- --coverage
\`\`\`

## 📊 Performance

### Analyze Bundle Size
\`\`\`bash
npm run build
npx @next/bundle-analyzer
\`\`\`

### Check Lighthouse Score (after deployment)
\`\`\`bash
npx lighthouse https://your-site.vercel.app
\`\`\`

## 🔐 Environment Variables

### Create .env.local
\`\`\`bash
# Windows
type nul > .env.local

# Mac/Linux
touch .env.local
\`\`\`

### View Environment Variables (in app)
\`\`\`bash
# In your code:
console.log(process.env)
\`\`\`

## 🛠️ Troubleshooting Commands

### Clear npm Cache
\`\`\`bash
npm cache clean --force
\`\`\`

### Reinstall Dependencies
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

### Reset Everything
\`\`\`bash
rm -rf node_modules .next package-lock.json
npm install
npm run dev
\`\`\`

### Check Port Usage
\`\`\`bash
# Windows
netstat -ano | findstr :3000

# Mac/Linux
lsof -i :3000
\`\`\`

### Kill Process on Port 3000
\`\`\`bash
# Windows
taskkill /PID <PID> /F

# Mac/Linux
kill -9 <PID>
\`\`\`

## 📱 Mobile Testing

### Open on Network (find IP)
\`\`\`bash
# Windows
ipconfig

# Mac/Linux
ifconfig
\`\`\`

Then visit: http://YOUR_IP:3000 on your phone

## 🎯 Common Workflows

### Starting Fresh Each Day
\`\`\`bash
git pull
npm install
npm run dev
\`\`\`

### Deploying New Changes
\`\`\`bash
git add .
git commit -m "Description of changes"
git push
# Vercel auto-deploys from GitHub
\`\`\`

### Creating New Feature Branch
\`\`\`bash
git checkout -b feature-name
# Make changes
git add .
git commit -m "Add feature"
git push origin feature-name
\`\`\`

### Switching Between Branches
\`\`\`bash
git checkout main
git checkout feature-name
\`\`\`

## 💡 Pro Tips

**Tip 1:** Keep dev server running while you work
\`\`\`bash
npm run dev
\`\`\`

**Tip 2:** Use `--help` with any command to see options
\`\`\`bash
npm --help
git --help
vercel --help
\`\`\`

**Tip 3:** Create aliases for common commands (in .bashrc or .zshrc)
\`\`\`bash
alias dev="npm run dev"
alias build="npm run build"
\`\`\`

**Tip 4:** Use `npx` to run packages without installing
\`\`\`bash
npx create-next-app
npx prettier --write .
\`\`\`

## 🔄 Update Dependencies

### Check for Updates
\`\`\`bash
npx npm-check-updates
\`\`\`

### Update All to Latest
\`\`\`bash
npx npm-check-updates -u
npm install
\`\`\`

## 📚 Documentation Commands

### View Markdown Files
\`\`\`bash
# Windows (in browser)
start README.md

# Mac
open README.md

# Linux
xdg-open README.md
\`\`\`

## ⚡ Quick Reference

| Task | Command |
|------|---------|
| Start dev server | `npm run dev` |
| Build for production | `npm run build` |
| Install packages | `npm install` |
| Lint code | `npm run lint` |
| Commit changes | `git add . && git commit -m "message"` |
| Push to GitHub | `git push` |
| Deploy to Vercel | Push to GitHub (auto-deploys) |
| Seed Firebase | `npx ts-node scripts/seedData.ts` |

## 🆘 Emergency Commands

### Site is broken after update?
\`\`\`bash
rm -rf node_modules .next package-lock.json
npm install
npm run dev
\`\`\`

### Git messed up?
\`\`\`bash
git stash
git pull
git stash pop
\`\`\`

### Need to rollback?
\`\`\`bash
git log  # Find commit hash
git reset --hard <commit-hash>
git push --force  # Be careful!
\`\`\`

### Vercel deployment failing?
\`\`\`bash
# Check build locally first
npm run build

# If it works locally, check Vercel logs
vercel logs
\`\`\`

---

**Save this file for quick reference!** 📌

These are all the commands you'll need to build, test, and deploy Prediction Coin.

