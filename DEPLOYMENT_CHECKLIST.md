# 🚀 Deployment Checklist

Use this checklist before deploying to production!

## 📋 Pre-Deployment

### Code Quality
- [ ] Run `npm run build` locally - builds successfully
- [ ] Run `npm run lint` - no errors
- [ ] All pages load without errors
- [ ] Test on mobile viewport
- [ ] Test on tablet viewport
- [ ] Test on desktop viewport

### Firebase Setup
- [ ] Firestore Database created and enabled
- [ ] Firebase Storage created and enabled
- [ ] Firestore security rules published
- [ ] Storage security rules published
- [ ] Firebase config copied to `.env.local`
- [ ] Test vote creation works locally
- [ ] Test image upload works locally
- [ ] Test poll creation works locally

### Content
- [ ] Add at least 3-5 default polls (run seed script)
- [ ] Test voting on all polls
- [ ] Create at least 1 test meme with the generator
- [ ] Verify all images display correctly
- [ ] Check all text for typos

### Configuration
- [ ] Update `SITE_CONFIG.url` in `lib/constants.ts`
- [ ] Update `baseUrl` in `app/sitemap.ts`
- [ ] Update Twitter handle if different from @predictcnsol
- [ ] Update `robots.txt` sitemap URL
- [ ] Verify all environment variables in `.env.local`

## 🔐 Security

- [ ] `.env.local` is in `.gitignore`
- [ ] No API keys committed to Git
- [ ] Firebase rules tested and working
- [ ] Storage rules prevent abuse
- [ ] Rate limiting considered (Firebase quotas)

## 📱 GitHub Setup

- [ ] Repository created on GitHub
- [ ] `.gitignore` configured correctly
- [ ] Code pushed to main branch
- [ ] Repository is public or private (your choice)
- [ ] README.md is clear and helpful

```bash
git init
git add .
git commit -m "Initial commit: Prediction Coin"
git branch -M main
git remote add origin https://github.com/yourusername/prediction-coin.git
git push -u origin main
```

## ☁️ Vercel Deployment

### Step 1: Connect Repository
- [ ] Sign in to [vercel.com](https://vercel.com)
- [ ] Click "Add New" → "Project"
- [ ] Import your GitHub repository
- [ ] Vercel auto-detects Next.js ✓

### Step 2: Configure Environment Variables
Add these in Vercel Dashboard → Settings → Environment Variables:

- [ ] `NEXT_PUBLIC_FIREBASE_API_KEY`
- [ ] `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- [ ] `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- [ ] `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- [ ] `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- [ ] `NEXT_PUBLIC_FIREBASE_APP_ID`

**Important:** Add to all environments (Production, Preview, Development)

### Step 3: Deploy
- [ ] Click "Deploy"
- [ ] Wait 2-3 minutes
- [ ] Check deployment logs for errors
- [ ] Visit your deployed URL

## ✅ Post-Deployment Testing

### Homepage
- [ ] Visit your production URL
- [ ] Prediction cards display correctly
- [ ] Filter tabs work (All, Volume, Open)
- [ ] Cards have hover effects
- [ ] Navigation links work

### Meme Votes Page
- [ ] Navigate to /meme-votes
- [ ] Polls display correctly
- [ ] Can vote on polls
- [ ] Vote percentages update
- [ ] Can't vote twice on same poll
- [ ] Share button works

### Meme Generator
- [ ] Navigate to /meme-generator
- [ ] Can upload an image
- [ ] Preview updates in real-time
- [ ] Can download meme
- [ ] Can publish poll
- [ ] New poll appears in Meme Votes

### Mobile Testing
- [ ] Open site on phone
- [ ] All pages are responsive
- [ ] Touch interactions work
- [ ] Images load properly
- [ ] Navigation is usable

### Performance
- [ ] Run Lighthouse test (aim for 90+ scores)
- [ ] Check loading speed (should be < 3s)
- [ ] Images load quickly
- [ ] No console errors
- [ ] No 404 errors

## 🌐 Domain Setup (Optional)

If using custom domain:
- [ ] Purchase domain
- [ ] Add domain in Vercel settings
- [ ] Update DNS records
- [ ] Wait for DNS propagation (can take 24-48 hours)
- [ ] Verify SSL certificate issued
- [ ] Update `SITE_CONFIG.url` with new domain
- [ ] Update `sitemap.ts` with new domain
- [ ] Redeploy

## 📊 Analytics Setup (Optional)

### Vercel Analytics
- [ ] Enable Vercel Analytics in dashboard
- [ ] Verify events are tracking

### Google Analytics (Optional)
- [ ] Create GA4 property
- [ ] Add tracking code to `app/layout.tsx`
- [ ] Test events are firing

## 🐛 Troubleshooting

### Build Fails
- [ ] Check build logs in Vercel
- [ ] Verify all dependencies installed
- [ ] Test `npm run build` locally
- [ ] Check for TypeScript errors

### Firebase Errors
- [ ] Verify all env variables are correct
- [ ] Check Firebase console for errors
- [ ] Verify Firestore rules are published
- [ ] Check Storage rules are published
- [ ] Verify billing is enabled (free tier OK)

### Images Not Loading
- [ ] Check Firebase Storage rules
- [ ] Verify images uploaded successfully
- [ ] Check network tab for 403/404 errors
- [ ] Verify image URLs are accessible

### Votes Not Saving
- [ ] Check browser console for errors
- [ ] Verify Firestore rules allow updates
- [ ] Check Firebase quota limits
- [ ] Test with Firebase emulator locally

## 🎯 Launch Checklist

### Before Announcing
- [ ] Everything tested and working
- [ ] Screenshots prepared for Twitter
- [ ] Announcement tweet drafted
- [ ] Consider creating a demo video
- [ ] Have some polls ready to showcase

### Launch Day
- [ ] Monitor Firebase usage
- [ ] Watch for errors in Vercel logs
- [ ] Engage with first users
- [ ] Collect feedback
- [ ] Fix any immediate issues

### First Week
- [ ] Monitor performance
- [ ] Check Firebase quotas
- [ ] Gather user feedback
- [ ] Plan improvements
- [ ] Update documentation if needed

## 📈 Growth Checklist

- [ ] Share on Twitter regularly
- [ ] Create engaging polls
- [ ] Respond to users
- [ ] Cross-promote with other CT accounts
- [ ] Consider adding more features
- [ ] Monitor analytics

## 🔄 Ongoing Maintenance

Weekly:
- [ ] Check Firebase usage
- [ ] Review error logs
- [ ] Update dependencies if needed
- [ ] Create new polls
- [ ] Engage with community

Monthly:
- [ ] Review analytics
- [ ] Plan new features
- [ ] Update documentation
- [ ] Backup Firebase data
- [ ] Check for security updates

## 🎉 You're Ready!

Once all boxes are checked, you're ready to launch! 🚀

**Final Steps:**
1. Take a deep breath
2. Click deploy
3. Test everything one more time
4. Share with the world!

---

**Good luck with your launch!** 🎯

If you encounter issues, check:
- [GETTING_STARTED.md](GETTING_STARTED.md) for setup help
- [SETUP.md](SETUP.md) for Firebase help
- Vercel documentation
- Firebase documentation

**Remember:** It's normal to have small issues on launch day. Stay calm and fix them one at a time!

