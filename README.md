# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

**Note**: the in-memory cache will not work in development mode, see this tweet by [Kent C. Dodds](https://twitter.com/kentcdodds/status/1486127807461670914):

> During development though most in-memory stuff goes away on every network request...

### Prismic Webhook

Turn on ngrok and update the (development) webhook URL in your Prismic dashboard. The webhook URL should be `http://RANDOM-ID.ngrok.io/resources/prismic-webhook`.

```sh
ngrok http 3000
```

### Prismic Slicemachine

To use the slice machine, you need to login with prismic and start the slicemachine locally.

```sh
npm run prismic login
npm run slicemachine # opens on http://localhost:9999
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Using a Template

When you ran `npx create-remix@latest` there were a few choices for hosting. You can run that again to create a new project, then copy over your `app/` folder to the new project that's pre-configured for your target server.

```sh
cd ..
# create a new project, and pick a pre-configured host
npx create-remix@latest
cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app
```
