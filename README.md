# RedactedBodies-Web
This is a creative technologist portfolio project created for CRCP6340 by Cam Mansanarez | @noir_mak

Redacted Bodies is a generative art project exploring queer identity, censorship, surveillance, and digital embodiment through a custom LoRA model — trained on FLUX in ComfyUI on a hand-curated dataset — alongside glitch aesthetics and generative code.

## Deployment

**Architecture:** GitHub → Render (Node/Express app) → Cloudflare (DNS / custom domain)

Render hosts the Node.js app. Cloudflare points the domain to Render's provided URL. No hosting changes are needed on Cloudflare.

### Environment Variables on Render

Set the following in **Render > Your Service > Environment**:

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Resend API key for contact form email |
| `DB_HOST` | Hostname of your remote MySQL-compatible database |
| `DB_PORT` | Database port (typically `3306`) |
| `DB_USER` | Database username |
| `DB_PASSWORD` | Database password |
| `DB_NAME` | Database name |
| `DB_SSL` | Set to `true` for hosted databases; `false` for local dev |

The app requires a remote MySQL-compatible database for production (MySQL 8, PlanetScale, Railway, Aiven, AWS RDS, etc.). Local MySQL is not reachable from Render.

If database credentials are missing or the connection fails, the app falls back to a hardcoded project array and continues serving. No crash, no downtime.

### Local Development

Copy `.env.example` to `.env` and fill in your local MySQL credentials. Set `DB_SSL=false`.

```
cp .env.example .env
npm run dev
```

## Licensing

Code is licensed under the MIT License unless otherwise stated.

All artwork, visual assets, generative outputs, branding, and creative materials remain © 2026 Cameron Mansanarez / noir_mak. All Rights Reserved.