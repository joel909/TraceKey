# TraceKey

TraceKey is a self-hosted interaction-tracking and analytics platform for websites and browser-based applications. It gives every project a public API key, accepts events from the TraceKey JavaScript SDK or HTTP API, enriches them with useful visitor context, and stores the results in PostgreSQL.

The included dashboard is a useful starting point, not a limitation. TraceKey is designed around accessible event data: record the actions and custom JSON your application cares about, then build your own operational dashboard, product analytics view, queue monitor, funnel, or reporting workflow around that data.

> TraceKey can run on a small server with a minimum of **1 vCPU and 1 GB RAM**. For a public deployment with sustained traffic, **2 GB RAM or more** is recommended so the application, PostgreSQL, and container builds have comfortable headroom.

## What TraceKey does

- Tracks page landings, button clicks, heartbeats, exits, queue activity, and custom events.
- Assigns a persistent device ID so repeat activity can be grouped without requiring a signed-in end user.
- Captures the current route, timestamp, referrer, IP address, browser user agent, device type, region, and supported device details.
- Accepts arbitrary application-specific JSON through `additionalInfo`.
- Separates data into projects with individual API keys.
- Supports multiple users per project.
- Provides project activity tables, date filtering, visitor totals, top-region statistics, and customer dashboard metrics.
- Keeps the raw PostgreSQL event data available for custom dashboards, SQL reports, APIs, exports, and integrations.
- Ships as a single Next.js application with PostgreSQL, making it practical to self-host on modest infrastructure.

## How it works

```text
Your application
      |
      | TraceKey SDK or POST /api/v1/events
      v
TraceKey ingestion API
      |
      | validates project API key and enriches the event
      v
PostgreSQL interactions table
      |
      +--> Built-in TraceKey dashboard
      +--> Your own dashboard or API
      +--> SQL reports, exports, and automations
```

Each interaction can contain standard analytics fields and your own domain-specific data. For example, an attraction, venue, or appointment application could attach a party size, ride identifier, booking source, or queue duration:

```json
{
  "api_key": "YOUR_TRACEKEY_API_KEY",
  "device_id": "customer-device-id",
  "page_route": "/rides/coaster",
  "event_name": "join_queue",
  "additionalInfo": {
    "memberCount": 4,
    "rideId": "coaster-01",
    "estimatedWaitMinutes": 25
  }
}
```

Because `additional_info` is stored as PostgreSQL `jsonb`, you can add application-specific fields without creating a new column for every event property.

## Technology

- Next.js 16 and React 19
- TypeScript
- PostgreSQL
- Tailwind CSS and shadcn/ui
- Official [`tracekey-sdk`](https://github.com/joel909/tracekey-sdk)
- Docker and Docker Compose
- Optional Cloudflare Tunnel

## Requirements

For the recommended Docker installation:

- A Linux server, VM, or local machine
- Docker Engine with the Docker Compose plugin
- 1 vCPU and 1 GB RAM minimum
- Approximately 2 GB of free disk space for images, dependencies, and initial database storage
- Additional persistent storage based on event volume and retention

For development without Docker:

- Node.js 20 or newer
- npm
- PostgreSQL 16 or newer

## Quick start with Docker Compose

The included [`docker-compose.yml`](docker-compose.yml) defines:

| Service | Purpose | Host access |
| --- | --- | --- |
| `app` | Builds and runs the Next.js application | `http://localhost:3101` |
| `db` | PostgreSQL database with persistent storage | `localhost:5433` |
| `cloudflared` | Optional public Cloudflare Tunnel | Configured tunnel hostname |

### 1. Clone the repository

```bash
git clone https://github.com/joel909/TraceKey.git
cd TraceKey
```

### 2. Configure the Cloudflare tunnel

The `cloudflared` service is optional, but when you want a public HTTPS address its tunnel token should be configured before the application stack is started. Do not add the published-application route yet; that comes after Docker is running.

1. Open the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. Go to **Networking → Tunnels**, select **Create Tunnel**, and create a Cloudflared tunnel.
3. Choose the Docker setup option and copy the generated tunnel token from the installation command.
4. Put that token in the `cloudflared` service in `docker-compose.yml`.

The relevant Compose configuration should resemble:

```yaml
cloudflared:
  image: cloudflare/cloudflared:latest
  restart: unless-stopped
  command: tunnel --no-autoupdate run --token YOUR_CLOUDFLARE_TUNNEL_TOKEN
  networks:
    - app-network
```

If you only need local or private-network access, remove or comment out the entire `cloudflared` service before continuing.

Do not commit a real tunnel token to a public repository. If a token has already been exposed, rotate it in Cloudflare before deploying.

### 3. Configure the database and application

Before starting the stack, open `docker-compose.yml` and replace the deployment-specific values:

- Change `POSTGRES_PASSWORD` to a strong database password.
- Put the same password in the `POSTGRES_URL` used by the `app` service.

The database values must continue to match. A typical configuration looks like this:

```yaml
db:
  environment:
    POSTGRES_USER: tracekey_db_client
    POSTGRES_PASSWORD: replace-with-a-strong-password
    POSTGRES_DB: tracekey

app:
  environment:
    POSTGRES_URL: postgresql://tracekey_db_client:replace-with-a-strong-password@db:5432/tracekey
```

Do not commit real production database credentials to a public repository.

### 4. Build and start TraceKey

```bash
docker compose up -d --build
```

The first build installs dependencies and creates the production Next.js bundle, so it takes longer than later starts.

Check the service state:

```bash
docker compose ps
```

Follow the logs if anything fails:

```bash
docker compose logs -f cloudflared app db
```

### 5. Wait for Cloudflare to connect

After the Docker build finishes, check the tunnel container:

```bash
docker compose logs -f cloudflared
```

Wait until the logs show that the tunnel is registered and connected. Then press `Ctrl+C` to stop following the logs; this does not stop the container.

You can also return to **Networking → Tunnels** in Cloudflare and confirm that the tunnel status is **Healthy**. If you removed the optional `cloudflared` service, skip this and the next step.

### 6. Add the published application route

Once `cloudflared` is connected and the `app` container is running:

1. Open **Networking → Tunnels** in the Cloudflare dashboard and select your tunnel.
2. Select **Routes → Add route → Published application**.
3. Enter the subdomain and domain you want to use, such as `tracekey.example.com`.
4. Leave **Path** empty to route every TraceKey page and API endpoint through the tunnel.
5. Set **Service URL** to `http://app:3000` exactly.
6. Select **Add route** and wait for Cloudflare to configure the hostname.

![Cloudflare Add published application form showing the TraceKey hostname and http://app:3000 service URL](documentation/assets/cloudflare-published-application.png)

Use `app:3000` because containers communicate through the Compose service name and internal application port. Do not use `localhost:3101` here: port `3101` is only the host-side mapping and `localhost` inside the tunnel container would refer to the tunnel container itself.

### 7. Open the application

Open the HTTPS hostname configured in Cloudflare. For a local check, you can also visit [http://localhost:3101](http://localhost:3101). Create an account, then create or open a project. TraceKey creates an API key for each project. From the project page, select **Setup with API Key** for SDK installation and integration examples.

### 8. Stop or restart the stack

```bash
docker compose stop
docker compose start
```

To stop and remove the containers while preserving the database:

```bash
docker compose down
```

The named `pgdata` volume holds PostgreSQL data between container replacements.

> Running `docker compose down -v` also deletes the database volume and all TraceKey data. Use it only when you intentionally want a completely fresh installation.

## Database initialization

Docker mounts [`db/schema.sql`](db/schema.sql) into PostgreSQL's initialization directory. PostgreSQL runs this file automatically when the `pgdata` volume is created for the first time. It creates the extension, tables, relationships, constraints, and indexes required by TraceKey.

Initialization scripts do not run again against an existing volume. If you edit the schema after the first start, apply the migration manually or recreate the volume only if losing the existing data is acceptable.

The main tables are:

| Table | Purpose |
| --- | --- |
| `users` | TraceKey accounts and authentication data |
| `projects` | Project settings and API keys |
| `user_projects` | Many-to-many project membership |
| `interactions` | Event, visitor, device, route, region, and custom JSON data |

## Local development without Docker

### 1. Install dependencies

```bash
npm install
```

### 2. Create a PostgreSQL database

Create a database and apply the schema:

```bash
psql "postgresql://USER:PASSWORD@localhost:5432/tracekey" -f db/schema.sql
```

### 3. Configure the connection

Create `.env` in the repository root:

```env
POSTGRES_URL=postgresql://USER:PASSWORD@localhost:5432/tracekey
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful checks:

```bash
npm run lint
npm run build
```

## Connect an application with the SDK

Install the SDK in the application you want to track:

```bash
npm install tracekey-sdk
```

For a Next.js client, place the public project key in `.env.local`:

```env
NEXT_PUBLIC_TRACEKEY_API_KEY=YOUR_TRACEKEY_API_KEY
```

Create one shared client:

```ts
// src/lib/tracekey.ts
import { TracekeyClient } from "tracekey-sdk";

export const tracekey = new TracekeyClient({
  apiKey: process.env.NEXT_PUBLIC_TRACEKEY_API_KEY!,
});
```

Log events from client components, effects, or browser event handlers:

```tsx
"use client";

import { useEffect } from "react";
import { tracekey } from "@/lib/tracekey";

export function CheckoutButton() {
  useEffect(() => {
    void tracekey.logLandingEvent();
  }, []);

  return (
    <button onClick={() => tracekey.logButtonClickEvent("checkout")}>
      Checkout
    </button>
  );
}
```

The SDK also supports heartbeat, exit, custom, queue-join, and boarded events. See the [SDK repository](https://github.com/joel909/tracekey-sdk) for its current API.

## Send custom event data over HTTP

Applications can post directly to the ingestion endpoint when they need a custom payload:

```bash
curl -X POST http://localhost:3101/api/v1/events \
  -H "Content-Type: application/json" \
  -d '{
    "api_key": "YOUR_TRACEKEY_API_KEY",
    "device_id": "example-device-id",
    "page_route": "/checkout",
    "event_name": "order_started",
    "additionalInfo": {
      "cartItems": 3,
      "cartValue": 49.99,
      "currency": "USD"
    }
  }'
```

The project API key identifies where the event belongs. Treat it as a public project identifier: it is suitable for browser use, but it should not grant access to private dashboard data or administrative actions.

## Build custom dashboards

TraceKey intentionally keeps event records in a queryable format. You can build custom views in three common ways:

1. Extend the Next.js application with a new authenticated API route and dashboard page.
2. Connect a trusted visualization tool directly to a read-only PostgreSQL account.
3. Export or aggregate interaction data into a warehouse or reporting service.

For example, custom JSON values can be grouped directly in PostgreSQL:

```sql
SELECT
  additional_info->>'rideId' AS ride_id,
  COUNT(*) AS groups_joined,
  SUM((additional_info->>'memberCount')::integer) AS guests_joined
FROM interactions
WHERE api_key = 'YOUR_TRACEKEY_API_KEY'
  AND action_name = 'join_queue'
GROUP BY additional_info->>'rideId'
ORDER BY guests_joined DESC;
```

For public or third-party dashboards, do not expose the database owner credentials. Use a restricted read-only database role or place an authenticated API between the dashboard and PostgreSQL.

## Resource planning

The 1 vCPU / 1 GB RAM minimum is appropriate for development, evaluation, and low-volume self-hosting. Actual capacity depends on event rate, dashboard query complexity, retention, and how many services share the machine.

For larger installations:

- Increase RAM before tuning aggressively; PostgreSQL and Node.js both benefit from memory headroom.
- Keep the PostgreSQL volume on persistent SSD storage.
- Add retention or archival policies for old interaction records.
- Monitor disk growth, container restarts, memory use, and slow queries.
- Add indexes for frequently queried custom fields or create summary tables for expensive dashboards.
- Run PostgreSQL separately when ingestion traffic or reporting load becomes significant.

## Production checklist

Before using TraceKey for real user data:

- Replace all example/default database credentials.
- Remove and rotate any committed Cloudflare tunnel token.
- Put the application behind HTTPS.
- Restrict database network exposure; port `5433` does not need to be public.
- Use a read-only database role for external reporting tools.
- Add automated PostgreSQL backups and test restoration.
- Add monitoring, retention rules, and rate limiting appropriate to your traffic.
- Review authentication before Internet-facing use. The current codebase should be upgraded to hash account passwords rather than storing or comparing plaintext passwords.
- Review CORS policy and narrow allowed origins when the set of tracked applications is known.
- Collect only data you need, disclose tracking to users, and follow the privacy and consent requirements that apply in your jurisdiction.

## Project structure

```text
src/app/                         Next.js pages and API routes
src/components/                  Dashboard and reusable UI components
src/lib/controllers/             Application and request orchestration
src/lib/database/                Queries, services, and PostgreSQL access
src/lib/errors/                  Centralized application errors
db/schema.sql                    Docker database initialization schema
Dockerfile                       Production application image
docker-compose.yml               App, PostgreSQL, and tunnel services
documentation/                   Additional internal documentation
```

## Troubleshooting

### The application cannot connect to PostgreSQL

Confirm that the `db` service is healthy and that the app uses `db:5432`, not `localhost`, inside Compose:

```bash
docker compose ps
docker compose logs db app
```

### Tables are missing after changing the schema

The initialization SQL only runs for a new PostgreSQL volume. Apply the schema change manually or, for disposable development data only, recreate the volume.

### Port 3101 or 5433 is already in use

Change the host side of the appropriate mapping in `docker-compose.yml`. For example, `3200:3000` exposes the application on port `3200` without changing its internal port.

### Cloudflare returns a tunnel error

Confirm that the token is current, the tunnel hostname targets `http://app:3000`, and both services are attached to `app-network`.

### Events do not appear

Check that the API key belongs to the expected project, the request reaches `/api/v1/events`, and the browser console or app logs do not show CORS or network errors. Then inspect:

```bash
docker compose logs -f app db
```

## Contributing

Issues and pull requests are welcome. When changing the database, include an explicit migration plan for installations that already have a populated `pgdata` volume. Run lint and a production build before submitting changes:

```bash
npm run lint
npm run build
```
