# Nuxt 3 SQLITE 3 Starter

A template to work with nuxt 3 and better-sqlite3. For me it only works on linux or wsl. 

I also added nuxt-storm because I use webstorm.

Look at the [nuxt 3 documentation](https://v3.nuxtjs.org) and [better-sqlite-3](https://github.com/WiseLibs/better-sqlite3) to learn more.

Use `npx ts-node schema.ts` to create the database with the required tables. 

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
yarn run dev -o
```

## Production

Build the application for production:

```bash
yarn run build
```

Locally preview production build:

```bash
yarn run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.
