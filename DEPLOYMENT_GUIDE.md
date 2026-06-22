# Deployment Guide — Nash Francis Portfolio

## 🚀 Pre-Deployment Checklist

### Code Quality
- ✅ **Linting**: Run `npm run lint` — all files pass ESLint
- ✅ **Dependencies**: Run `npm audit` — no critical vulnerabilities
- ✅ **Performance**: Compression enabled, caching headers configured
- ✅ **Security**: Helmet CSP, rate limiting, input validation active

### Testing
- ✅ **Manual Routes**: All 6 routes tested (home, about, skills, projects, experience, contact)
- ✅ **Responsive Design**: Verified on mobile (320px), tablet (768px), desktop (1920px)
- ✅ **Form Validation**: Contact form validation + error handling tested
- ✅ **Rate Limiting**: Verified — 429 error on 6th request to /contact

### SEO & Assets
- ✅ **Meta Tags**: Dynamic titles, descriptions, OG tags on all pages
- ✅ **Sitemap**: `public/sitemap.xml` created and configured
- ✅ **Robots.txt**: `public/robots.txt` configured for search engines
- ✅ **Manifest.json**: PWA manifest with icons and theme colors
- ✅ **Favicon**: Favicon and apple-touch-icon links present
- ✅ **Mobile Friendly**: Viewport meta tag and responsive CSS configured

### Performance
- ✅ **Gzip Compression**: Compression middleware enabled in `app.js`
- ✅ **Static Asset Caching**: 1-year cache headers for `/public/*`
- ✅ **Script Optimization**: Scripts load with `defer` attribute (non-blocking)
- ✅ **Font Optimization**: Preconnect to Google Fonts, dns-prefetch to CDN
- ✅ **Code Cleanup**: Unused files removed, no dead code

### Configuration
- ✅ **Environment Variables**: `.env.example` created with all required vars
- ✅ **Port Configuration**: Default port 3000, customizable via `PORT` env var
- ✅ **Node Version**: Requires Node.js 18+
- ✅ **npm Scripts**: `start` (production) and `dev` (development) configured

---

## 📋 Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Application
NODE_ENV=production
PORT=3000

# Owner Information (displayed on site)
OWNER_NAME=Nash Francis
OWNER_EMAIL=your-email@example.com

# SMTP Configuration (for contact form emails)
SMTP_HOST=smtp.gmail.com          # or your email provider's SMTP host
SMTP_PORT=587                     # typically 587 for TLS
SMTP_USER=your-email@gmail.com    # your email address
SMTP_PASS=your-app-password       # app-specific password (not regular password)

# SMTP From Address (shows in email inbox)
SMTP_FROM_NAME=Nash Francis Portfolio
SMTP_FROM_EMAIL=noreply@nashfrancis.dev

# Email Recipient (where contact form submissions go)
CONTACT_EMAIL_RECIPIENT=your-email@example.com
```

### SMTP Setup Guide
- **Gmail**: Use [App Passwords](https://support.google.com/accounts/answer/185833) (not your regular password)
- **SendGrid**: Use `apikey` as username and API key as password
- **Mailgun**: Use SMTP credentials from Mailgun dashboard

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended) ⭐
**Best for**: Zero-config, automatic deployments, serverless, free tier available

#### Steps:
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Configure environment variables in Vercel dashboard:
   - Go to **Settings** → **Environment Variables**
   - Add all variables from `.env`

4. Configure domains:
   - Vercel automatically assigns a domain
   - Add custom domain in **Settings** → **Domains**

#### Advantages:
- ✅ Automatic HTTPS/SSL
- ✅ Global CDN (47+ regions)
- ✅ Automatic deployments on Git push
- ✅ Built-in analytics
- ✅ Serverless functions supported
- ✅ Free tier: 100 GB bandwidth/month
- ✅ Auto-scaling

#### Configuration:
Vercel auto-detects Node.js and uses `npm start` by default. No additional config needed.

---

### Option 2: Render
**Best for**: Traditional servers, persistent databases, more control

#### Steps:
1. Connect your GitHub repository to [Render](https://render.com)

2. Create new Web Service:
   - Select your repository
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: `Node`
   - Plan: Free (sleeps after 15 min inactivity) or Paid

3. Add environment variables:
   - Go to **Environment** tab
   - Add all `.env` variables

4. Deploy:
   - Click **Create Web Service**
   - Deployment starts automatically

#### Advantages:
- ✅ Full Node.js server control
- ✅ PostgreSQL included (future CMS use)
- ✅ Persistent storage
- ✅ Custom domains
- ✅ Free tier available (with 15-min auto-sleep)
- ✅ Easy database integration

#### Limitations:
- Free tier instances sleep after 15 minutes of inactivity
- Cold start time: ~10 seconds when waking up

---

### Option 3: Railway
**Best for**: Docker support, PostgreSQL, pay-as-you-go pricing

#### Steps:
1. Connect your GitHub repository to [Railway](https://railway.app)

2. Railway auto-detects Node.js:
   - Start Command: `npm start`
   - Environment detected automatically

3. Add environment variables:
   - Go to **Variables** tab
   - Add all `.env` variables

4. Deploy:
   - Click **Deploy**
   - Automatic deployment on Git push

#### Advantages:
- ✅ Simple UI
- ✅ PostgreSQL integration
- ✅ Docker support
- ✅ Pay-as-you-go ($5 free credit monthly)
- ✅ No auto-sleep

---

### Option 4: DigitalOcean / Linode / AWS (Self-Hosted VPS)
**Best for**: Full control, custom configurations, multiple services

#### Steps:
1. Provision a VPS:
   - Recommended: Ubuntu 22.04 LTS
   - Minimum specs: 512 MB RAM, 1 GB storage

2. SSH into your server:
   ```bash
   ssh root@your-vps-ip
   ```

3. Install Node.js 18+:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. Clone repository and setup:
   ```bash
   cd /var/www
   git clone https://github.com/Nash-Francis/nash-portfolio.git
   cd nash-portfolio
   npm install
   ```

5. Create `.env` file:
   ```bash
   nano .env
   # Paste environment variables and save
   ```

6. Install PM2 (process manager):
   ```bash
   npm install -g pm2
   ```

7. Start application:
   ```bash
   pm2 start server.js --name "nash-portfolio"
   pm2 startup
   pm2 save
   ```

8. Setup Nginx (reverse proxy):
   ```bash
   sudo apt-get install -y nginx
   ```

   Create `/etc/nginx/sites-available/nash-portfolio`:
   ```nginx
   server {
     listen 80;
     server_name your-domain.com www.your-domain.com;

     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

   Enable site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/nash-portfolio /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

9. Setup SSL with Let's Encrypt:
   ```bash
   sudo apt-get install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

10. Setup auto-renewal:
    ```bash
    sudo systemctl enable certbot.timer
    ```

#### Advantages:
- ✅ Full server control
- ✅ No auto-sleep
- ✅ Custom configurations
- ✅ Multiple applications on same server
- ✅ Database can be on same or different server

#### Disadvantages:
- ❌ Manual configuration required
- ❌ Server maintenance responsibility
- ❌ No automatic scaling

---

## 🔄 Deployment Workflow

### Using Git (Recommended for all platforms)
1. Commit your changes:
   ```bash
   git add .
   git commit -m "feat: prepare for deployment"
   git push origin main
   ```

2. **Vercel**: Automatically deploys on push to main
3. **Render**: Automatically deploys on push to main
4. **Railway**: Automatically deploys on push to main
5. **VPS**: Pull latest changes manually or setup Git hooks for auto-deploy

### Testing After Deployment
```bash
# Test the deployed URL
curl https://your-deployed-url.com

# Check specific routes
curl https://your-deployed-url.com/about
curl https://your-deployed-url.com/projects
curl https://your-deployed-url.com/contact

# Test API health
curl -I https://your-deployed-url.com
```

---

## 🛡️ Security Best Practices

### Before Deployment
- ✅ Ensure `.env` is in `.gitignore` (never commit secrets)
- ✅ Set `NODE_ENV=production` in your deployment platform
- ✅ Use strong, unique SMTP passwords
- ✅ Enable HTTPS on all platforms (all recommended platforms do this)

### After Deployment
- ✅ Monitor error logs in platform dashboard
- ✅ Setup error alerts (Vercel, Render, Railway support this)
- ✅ Regularly run `npm audit` and update dependencies
- ✅ Test contact form with spam/injection attempts
- ✅ Monitor rate limiting: check logs for 429 responses

### Domain Security
- ✅ Point domain to deployment platform
- ✅ Enable automatic HTTPS renewal
- ✅ Add SPF/DKIM records for email authentication

---

## 📊 Monitoring & Maintenance

### Uptime Monitoring
- Setup free uptime monitoring with [Uptime Robot](https://uptimerobot.com)
- Add your deployed URL
- Get alerts if site goes down

### Performance Monitoring
- **Vercel**: Built-in analytics dashboard
- **Render**: Monitor tab shows CPU/memory usage
- **Railway**: Resources tab shows usage metrics
- **Google Search Console**: Monitor indexing and SEO performance

### Log Monitoring
- Check deployment platform's logging dashboard
- Look for errors, warnings, and rate limit triggers
- Set up alerts for critical errors

---

## 🆘 Troubleshooting

### Site Not Loading
1. Check environment variables are set correctly
2. Verify SMTP credentials (contact form might be failing silently)
3. Check deployment platform logs
4. Verify port is accessible (Vercel/Render/Railway don't require port config)

### Contact Form Not Working
1. Verify SMTP credentials in `.env`
2. Check "Less secure apps" setting if using Gmail
3. Verify from/to email addresses are correct
4. Check email spam folder
5. Review logs for error messages

### Rate Limiting Errors
1. Normal — 5th consecutive request to `/contact` returns 429
2. Rate limit is per-IP, resets after 15 minutes
3. For production: consider adjusting limits in `middleware/rateLimit.middleware.js`

### Performance Issues
1. Check asset sizes in Network tab (browser DevTools)
2. Ensure compression middleware is enabled
3. Verify caching headers (should be 1 year for static assets)
4. Use Lighthouse (Chrome DevTools) for detailed analysis

---

## 📈 Performance Metrics

### Expected Performance (Post-Deployment)
- **First Contentful Paint (FCP)**: ~1.2 seconds
- **Time to Interactive (TTI)**: ~1.8 seconds
- **Lighthouse Score**: 90+
- **Page Size**: ~200 KB (gzipped)

### How to Measure
1. Use [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)
2. Run: `npm audit` for dependency health
3. Monitor platform analytics dashboard

---

## 🎯 Next Steps

### Immediate (Before Going Live)
1. ✅ Set all environment variables
2. ✅ Test contact form
3. ✅ Test rate limiting
4. ✅ Verify responsive design on mobile
5. ✅ Check SEO meta tags

### Short Term (After Going Live)
1. 📊 Setup analytics (Google Analytics, Vercel Analytics)
2. 🔍 Submit sitemap to Google Search Console
3. 🆙 Setup uptime monitoring
4. 📧 Test email deliverability
5. 🚨 Setup error alerts

### Long Term
1. 📝 Create blog section (when ready)
2. 🗄️ Migrate to PostgreSQL (if needed)
3. 🔐 Add authentication (if needed)
4. 📱 Create mobile app (if needed)
5. 🌍 Add CDN optimization (if needed)

---

## 📞 Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **Railway Docs**: https://docs.railway.app
- **Node.js Docs**: https://nodejs.org/docs
- **Express Docs**: https://expressjs.com
- **Helmet Docs**: https://helmetjs.github.io

---

**Last Updated**: 2025-01-15 | **Status**: ✅ Production Ready
