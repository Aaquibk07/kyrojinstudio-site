# Kyrojin Studios website

Static website prepared for Cloudflare Pages. No paid hosting or build framework is required.

## Included

- `public/index.html` — studio homepage
- `public/orbit-pop.html` — Orbit Pop page
- `public/privacy-policy.html` — public privacy policy for Play Console / AdMob
- `public/terms.html` — terms of use
- `public/app-ads.txt` — AdMob publisher authorization
- `public/assets/logo.svg` and `mark.svg` — original Kyrojin branding with **no Japanese/Chinese text**
- Responsive CSS and lightweight JavaScript

## Cloudflare Pages deployment (GitHub method)

1. Create a new GitHub repository, e.g. `kyrojin-studios-site`.
2. Upload/push this folder to the repository.
3. In Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**.
4. Select the repository.
5. Framework preset: **None**.
6. Build command: leave blank.
7. Build output directory: `public`.
8. Deploy.
9. In the Pages project, open **Custom domains → Set up a custom domain** and add your domain.
10. Since DNS is already managed by Cloudflare, allow Cloudflare to create the required DNS record.

## Important URLs after deployment

- `https://kyrojinstudios.com/`
- `https://kyrojinstudios.com/privacy-policy.html`
- `https://kyrojinstudios.com/app-ads.txt`

For AdMob EU messaging, use the privacy-policy URL above. For Google Play, the same URL can be used as the app privacy policy.

## Before deployment if your purchased domain is NOT kyrojinstudios.com

Replace `kyrojinstudios.com` in `public/sitemap.xml` with your real domain. The HTML pages use relative links and otherwise do not require a domain change.

## Public support email

Currently set to `kyrojinstudios@gmail.com`. Replace it later with a domain email if desired.
