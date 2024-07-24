# Fullstack Discord Clone

**✨ Live Website: [https://discord-clone-production-7fe9.up.railway.app/](https://discord-clone-production-7fe9.up.railway.app/)**(currently out of production)

![img-1](./assets/discord-clone-1.png)
# Features:

- Real-time messaging using Socket.io
- Send attachments as messages using UploadThing
- Delete & Edit messages in real time for all users
- Create Text, Audio and Video call Channels
- One-One conversation between members
- One-One video calls between members
- Member management (Kick, Role change Guest / Moderator)
- Unique invite link generation & full working invite system
- Infinite loading for messages in batches of 10 (tanstack/query)
- Server creation and customization
- Responsive UI using TailwindCSS and ShadcnUI
- Light / Dark mode
- Websocket fallback: Polling with alerts
- ORM using Prisma
- MySQL database using Planetscale
- Authentication with Clerk

---

# Tech Stack:
## Frontend & Backend:
- Next.JS v13
- Socket.io 
- ReactJS
- TailwindCSS
## Database:
- MySQL on Planet Scale
- Prisma Studio for UI management
---

# Setup
## Requirements

**Node version 18.x.x**

## SetUp Application in your local machine
### 1) Cloning the repository

```shell
git clone https://github.com/ravindramohith/discord-clone.git
```

### 2) Install packages

```shell
npm install
```

### 3) Setup .env file


```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=


DATABASE_URL=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
NEXT_PUBLIC_LIVEKIT_URL=
```

### 4) Setup Prisma

Add MySQL Database (I used PlanetScale)

```shell
npx prisma generate
npx prisma db push

```

### 5) Start the app

```shell
npm run dev
```

### 6) Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |
| `build`         | Builds the app for production                    |
| `start`         | Starts the app in production mode                |
| `lint`          | Lints the codebase using Next.js linting         |

**Run `npm run dev` for running in development mode**
