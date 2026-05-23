# Jackson Tax Service — Hostinger Deployment Guide

> **Target**: Hostinger shared hosting or Node.js hosting  
> **Domain**: `ajackstax.com`  
> **Repository**: https://github.com/[your-username]/jackson-tax-service

---

## 📋 Prerequisites

Before starting, make sure you have:

1. **Hostinger account** with active hosting plan
2. **Domain** `ajackstax.com` (already owned)
3. **GitHub account** (for repository hosting)
4. **MySQL database credentials** (from Hostinger)
5. **SSH client** or Hostinger hPanel access

---

## 🚀 Step 1: Push Code to GitHub

```bash
# Clone locally first (if not already done)
git clone https://github.com/YOUR_USERNAME/jackson-tax-service.git
cd jackson-tax-service

# Or use the push script
chmod +x scripts/github-push.sh
./scripts/github-push.sh YOUR_GITHUB_USERNAME YOUR_GITHUB_TOKEN
```

> **Note**: If you don't want to use GitHub, you can upload files directly via Hostinger's File Manager.

---

## 🗄️ Step 2: Set Up MySQL Database (via Hostinger hPanel)

1. **Log in** to [Hostinger hPanel](https://hpanel.hostinger.com)
2. Navigate to **MySQL Databases**
3. Click **Create New Database**:
   - Database name: `jackson_tax_service` (or any name)
   - Username: Create a new user
   - Password: Generate a strong password (save this!)
4. **Note down** the connection details:
   - Hostname: Usually `localhost` or an internal host
   - Database name
   - Username
   - Password
5. **Optional**: If phpMyAdmin is available, you can import the schema directly:
   - Or run via CLI after deployment: `npm run db:push`

---

## ⚙️ Step 3: Deploy to Hostinger

### Option A: Hostinger Node.js Hosting (Recommended)

1. In hPanel, go to **Hosting** → **Manage**
2. Navigate to **Advanced** → **Node.js**
3. Click **Setup Node.js**
4. Configure:
   - **Application mode**: `Production`
   - **Application path**: `server/src/index.ts` (or `dist/index.js` after building)
   - **Entry point**: Use PM2 or the built-in process manager
   - **Node.js version**: Select 20.x or 22.x (check available)

### Option B: Hostinger Shared Hosting (with Node.js)

1. Use **File Manager** or **FTP** to upload the project files (excluding `node_modules/`)
2. Upload to a subdirectory like `~/api` or the root
3. Set up a **Cron Job** to keep the Node process running:
   ```
   * * * * * /usr/bin/node /home/u123456789/api/server/dist/index.js
   ```

### Option C: VPS (Best Performance)

1. Connect via SSH:
   ```bash
   ssh user@your-server-ip
   ```
2. Install Node.js 22.x:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
3. Clone and setup:
   ```bash
   git clone https://github.com/YOUR_USERNAME/jackson-tax-service.git
   cd jackson-tax-service
   npm install
   cp .env.hostinger .env
   ```

---

## 🔧 Step 4: Configure Environment Variables

Create `.env` file from the template:

```bash
cp .env.hostinger .env
```

Edit `.env` with your actual values:

| Variable | Description | Where to Get It |
|----------|-------------|-----------------|
| `DATABASE_URL` | MySQL connection string | Hostinger hPanel → MySQL Databases |
| `JWT_SECRET` | Random 32+ char string | `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `NODE_ENV` | Set to `production` | Fixed value |
| `PORT` | Server port (3001) | Default — can stay |
| `OAUTH_CLIENT_ID` | Optional — OAuth | Only if using social login |
| `CALENDLY_API_KEY` | Optional | Only if using Calendly API |

**Example `.env` file:**
```env
DATABASE_URL=mysql://user_abc123:A7xK9mP2@localhost:3306/jackson_tax_service
JWT_SECRET=a7f3c8e2b1d94f5a0c3e8b7d2f1a4c9e0b3d6f8a2c4e7b0d1f3a5c8e2b4d6f
NODE_ENV=production
PORT=3001
```

---

## 📦 Step 5: Build & Initialize

```bash
# Install dependencies
npm install

# Build the client
npm run build -w client
# (Or: cd client && npx vite build)

# Push database schema (creates tables)
npm run db:push

# Seed initial data (services, FAQs, sample content)
npm run seed
```

**What gets seeded:**
- 1 admin user (ajackstaxservice@gmail.com)
- 4 services, 8 FAQs, 4 testimonials
- 3 course bundles, 5 sample videos
- 3 blog posts

---

## 🚦 Step 6: Start the Application

### Using PM2 (Recommended for Production)

```bash
# Install PM2 globally
npm install -g pm2

# Start the server
pm2 start server/src/index.ts --interpreter tsx --name jackson-tax

# Save PM2 config
pm2 save

# Set PM2 to auto-start on reboot
pm2 startup
```

### Using Built-in Start Script

```bash
# Build the server TypeScript
npm run build -w server

# Start
NODE_ENV=production node server/dist/index.js
```

### Verify It's Running

```bash
curl http://localhost:3001/api/health
# Expected: {"status":"ok","timestamp":"..."}
```

---

## 🌐 Step 7: Domain & DNS Configuration

### Point Domain to Hostinger

1. Go to your domain registrar (where you bought `ajackstax.com`)
2. Update nameservers to Hostinger's:
   ```
   ns1.dns-parking.com
   ns2.dns-parking.com
   ```
3. Wait 24-48 hours for DNS propagation

### Configure Domain in Hostinger

1. In hPanel, go to **Domains** → **Add Domain**
2. Enter `ajackstax.com`
3. Wait for DNS to sync

### Set Up Subdomain (Optional)

If using a subdomain for the API:
```
api.ajackstax.com → points to Node.js app
ajackstax.com    → can serve static site or proxy to API
```

---

## 🔒 Step 8: SSL Certificate (HTTPS)

### Via Hostinger (Easiest)

1. In hPanel, go to **SSL** → **Let's Encrypt**
2. Select `ajackstax.com`
3. Click **Issue SSL Certificate**
4. Wait 5-10 minutes for issuance
5. Enable **Force HTTPS** redirect

### Manual (Certbot)

If on VPS:
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d ajackstax.com -d www.ajackstax.com
```

---

## 📊 Step 9: Production Verification Checklist

- [ ] **Health check**: `https://ajackstax.com/api/health` returns OK
- [ ] **Homepage loads**: No 404 or 500 errors
- [ ] **Contact form**: Test submission works
- [ ] **Calendly link**: "Schedule Appointment" opens Calendly
- [ ] **Document upload**: "Upload Documents" opens client portal
- [ ] **Student portal**: Register and login flow works
- [ ] **Admin dashboard**: Login as admin, approve a test student
- [ ] **SSL**: HTTPS works with valid certificate
- [ ] **Mobile responsive**: Test on phone/tablet sizes
- [ ] **Google Business embed**: Map and reviews display

---

## 🔄 Step 10: Ongoing Maintenance

### Updating the App

```bash
# Pull latest changes
git pull origin master

# Rebuild
npm install
npm run build

# Restart
pm2 restart jackson-tax
```

### Backup Strategy

```bash
# Backup database
mysqldump -u USER -p DATABASE_NAME > backup_$(date +%Y%m%d).sql

# Backup .env
cp .env .env.backup.$(date +%Y%m%d)
```

### Monitoring

- **PM2 Monitor**: `pm2 monit`
- **Logs**: `pm2 logs jackson-tax`
- **Uptime**: Use Hostinger's built-in monitoring or free options like UptimeRobot

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| **Cannot connect to MySQL** | Check DATABASE_URL in .env. Verify MySQL is running in Hostinger hPanel |
| **Blank page on domain** | Check if client is built (`npm run build -w client`). Check static file paths in server/index.ts |
| **API returns 404** | Verify tRPC middleware is mounted at `/api/trpc`. Check port configuration |
| **CORS errors in browser** | Update CORS origin in server/index.ts to include your actual domain |
| **PM2 process dies** | Check logs with `pm2 logs`. Ensure Node.js version is compatible |
| **Database migration fails** | Run `npx drizzle-kit push` directly for detailed error output |
| **SSL not working** | Wait for Let's Encrypt issuance (up to 15 min). Force HTTPS in Hostinger hPanel |

---

## 📁 Project Structure (for reference)

```
jackson-tax-service/
├── client/                 # React frontend (Vite + React 19 + Tailwind CSS 4)
│   ├── src/
│   │   ├── pages/          # Home, Services, About, Contact, etc.
│   │   └── components/     # Shared UI components
│   └── dist/               # Built static files (served in production)
├── server/                 # Node.js backend (Express + tRPC + Drizzle ORM)
│   ├── src/
│   │   ├── db/             # Database schema and connection
│   │   ├── trpc/routers/   # API procedures (public, protected, admin)
│   │   └── auth/           # JWT authentication
│   └── dist/               # Built server code
├── .env                    # Environment variables (CREATE THIS)
├── .env.hostinger          # Template with instructions
├── SECURITY_AUDIT.md       # Security audit report
├── HOSTINGER_DEPLOY.md     # This file
└── package.json            # Workspace root
```

---

## 💰 Cost Breakdown

| Service | Cost | Notes |
|---------|------|-------|
| Hostinger Hosting | ~$3-10/month | Basic plan includes MySQL |
| Domain (ajackstax.com) | ~$10/year | Already owned |
| MySQL Database | Included | With Hostinger hosting |
| SSL Certificate | Free | Let's Encrypt via Hostinger |
| Email | Free | Hostinger email accounts |
| File Storage | Included | Use local filesystem (no S3 needed) |
| **Total** | **~$3-10/month** | |

---

## 🆘 Need Help?

- **Hostinger Support**: Live chat in hPanel (24/7)
- **Austin Jackson**: ajackstaxservice@gmail.com
- **Developer docs**: Refer to `README.md` for project setup details
