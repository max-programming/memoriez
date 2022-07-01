# MEMORIEZ

![cover](https://memoriez.cc/cover.png)

[![Memoriez Build](https://github.com/max-programming/memories/actions/workflows/nodejs.yml/badge.svg)](https://github.com/max-programming/memories/actions/workflows/nodejs.yml)

Memoriez is a web-based platform to write your stories. It's an alternative to maintaining a hard dairy or journal.

## Features

- Create, Edit and Delete entries
- Add cover image
- Set your mood of the day

## Tech Stack

**Client:** Next.js, Chakra UI

**Server:** Prisma, PlanetScale DB

## Screenshots

![App Screenshot](https://i.ibb.co/mCW1JWr/image.png)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL` - Any MySQL Database

`PEXELS_API_KEY` - From [Pexels](https://pexels.com/api)

`CLERK_API_KEY` - From [Clerk](https://clerk.dev)

`NEXT_PUBLIC_CLERK_FRONTEND_API` - From [Clerk](https://clerk.dev)

## Run Locally

Clone the project

```bash
git clone https://github.com/max-programming/memoriez
```

Go to the project directory

```bash
cd memoriezz
```

Install dependencies

```bash
npm install
```

Add the environment variables

Start the server

```bash
npm run dev
```

## Feedback

If you have any feedback, please reach out to the issues panel and create an issue to let me know

## Contributing

Contributions are always welcome!
