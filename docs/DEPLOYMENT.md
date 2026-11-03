# Deployment & Hosting Guide
### BLOOD CONNECTION: Bangladesh National Healthcare Platform

## 1. Hosting Options
The frontend is a single-page React TypeScript application optimized for:
- Vercel
- Netlify
- Cloudflare Pages
- AWS Amplify / S3 + CloudFront
- Docker / Nginx on Bangladesh National Data Center (BCC)

## 2. Environment Configuration
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_APP_URL=https://bloodconnection.org.bd
VITE_SMS_GATEWAY_URL=https://api.sms-gateway-bd.com/v2/send
VITE_SMS_API_KEY=your-sms-api-key
```

## 3. Database Migration Deployment
1. Log in to the Supabase CLI:
   ```bash
   npx supabase login
   ```
2. Link your remote Supabase project:
   ```bash
   npx supabase link --project-ref your-project-id
   ```
3. Push migrations:
   ```bash
   npx supabase db push
   ```
4. Seed Bangladesh locations and administrative coordinators:
   ```bash
   npx supabase db execute --file supabase/seed.sql
   ```
5. Deploy Edge Functions:
   ```bash
   npx supabase functions deploy verify-id-card
   npx supabase functions deploy update-donor-availability
   npx supabase functions deploy match-donors
   ```

## 4. Building for Production
```bash
npm run build
```
This generates the optimized bundle in `/dist` ready for static deployment.
