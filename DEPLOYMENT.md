# Fitmate Deployment Guide

## Prerequisites

Before deploying, ensure you have:

1. **MongoDB Atlas Account** - For production database
2. **Google Cloud Console** - For OAuth credentials
3. **Vercel Account** - For frontend deployment
4. **Render Account** - For backend deployment

## Environment Variables Setup

### Frontend (Vercel)

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the following variables:

```
VITE_API_URL=https://fitmate-yfrz.onrender.com/api
```

### Backend (Render)

1. Go to your Render dashboard
2. Navigate to your service → Environment
3. Add the following variables:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=<your-mongodb-atlas-connection-string>
JWT_SECRET=<generate-random-32-char-string>
SESSION_SECRET=<generate-random-32-char-string>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
GOOGLE_CALLBACK_URL=https://fitmate-yfrz.onrender.com/api/auth/google/callback
CLIENT_URL=https://fitmate-blond.vercel.app
```

**Generate secure secrets:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3001/api/auth/google/callback` (development)
   - `https://fitmate-yfrz.onrender.com/api/auth/google/callback` (production)
6. Add authorized JavaScript origins:
   - `http://localhost:3000` (development)
   - `https://fitmate-blond.vercel.app` (production)

## MongoDB Atlas Setup

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Create a database user
4. Whitelist all IP addresses (0.0.0.0/0) for Render
5. Get your connection string
6. Replace `<password>` with your database user password
7. Add `/fitmate` at the end of the connection string

Example:
```
mongodb+srv://username:password@cluster.mongodb.net/fitmate?retryWrites=true&w=majority
```

## Deployment Steps

### Frontend (Vercel)

1. **Connect Repository**
   ```bash
   # Push your code to GitHub
   git add .
   git commit -m "Deployment ready"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite configuration
   - Add environment variables
   - Click "Deploy"

3. **Verify Deployment**
   - Visit your Vercel URL
   - Check that the app loads correctly
   - Test authentication flow

### Backend (Render)

1. **Deploy on Render**
   - Your backend is already configured with `render.yaml`
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Create new Web Service
   - Connect your GitHub repository
   - Render will use the `render.yaml` configuration
   - Add all environment variables
   - Click "Create Web Service"

2. **Verify Deployment**
   - Wait for build to complete
   - Check logs for any errors
   - Test API endpoints

## Post-Deployment Checklist

- [ ] Frontend loads without errors
- [ ] Backend API is accessible
- [ ] Google OAuth login works
- [ ] Database connection is successful
- [ ] All dashboards display correctly
- [ ] Charts and visualizations render
- [ ] Chat functionality works
- [ ] Session scheduling works
- [ ] Progress logging works

## Troubleshooting

### Frontend Issues

**Problem**: White screen or blank page
- Check browser console for errors
- Verify `VITE_API_URL` is set correctly
- Check that API is accessible

**Problem**: Authentication not working
- Verify Google OAuth credentials
- Check redirect URIs match exactly
- Ensure cookies are enabled

### Backend Issues

**Problem**: 500 Internal Server Error
- Check Render logs
- Verify all environment variables are set
- Check MongoDB connection string

**Problem**: CORS errors
- Verify `CLIENT_URL` matches your Vercel URL
- Check CORS configuration in backend

**Problem**: Database connection failed
- Verify MongoDB Atlas IP whitelist
- Check connection string format
- Ensure database user has correct permissions

## Monitoring

### Vercel
- Check deployment logs in Vercel dashboard
- Monitor function execution times
- Review error logs

### Render
- Monitor service logs in real-time
- Check service health status
- Review metrics and performance

## Updating the Application

1. **Make changes locally**
2. **Test thoroughly**
3. **Commit and push to GitHub**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```
4. **Automatic deployment**
   - Vercel and Render will automatically deploy new changes
   - Monitor deployment logs for any issues

## Rollback

If deployment fails:

**Vercel:**
- Go to Deployments tab
- Find previous working deployment
- Click "Promote to Production"

**Render:**
- Go to your service
- Click "Manual Deploy"
- Select previous commit

## Support

For issues:
1. Check deployment logs
2. Review environment variables
3. Verify all services are running
4. Check database connectivity

## Security Notes

- Never commit `.env` files
- Rotate secrets regularly
- Use strong, random values for JWT_SECRET and SESSION_SECRET
- Keep dependencies updated
- Monitor for security vulnerabilities

## Performance Optimization

- Enable caching in Vercel
- Use CDN for static assets
- Optimize images
- Monitor API response times
- Consider adding Redis for session storage (future enhancement)
