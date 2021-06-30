# twichess
A tool for streamers that links [Twitch][tw] viewers with their [lichess][li] accounts. It is available at [twichess.com][tch].

This is an early release. For now it has 2 features:
- displaying viewers rating list
- displaying average viewers ranking

## Demo
1. Go to [twichess.com][tch] and log in with your Twitch account.
1. Link your [lichess.org][li] account there.
1. Go to [twitch.tv/digimonsterr][digi] and watch the stream. You should be visible on the list after 3-5 minutes.

## [TODO] Feature ideas
This is a list of ideas for new features that could appear in twichess. I'm not a streamer, and it's hard for me to say which ones would be the most interesting and worth adding to the app. If you are a streamer and you think any of the ideas are good (or you have your own ideas) don't hesitate to contact me or create an Issue on GitHub.
- creating a bot that allows you to participate in activities with commands `!twichess play`
- drawing a random player within a certain ranking range or with a specific title (from all viewers or those who use the bot's commands) and challenge them to play
- creating tournaments
- displaying the top players who have ever watched a stream
- alerts on titled players who have joined the stream
- integrate twichess with [Twitch Extensions][ext]

PRs with the implementation of the above functionalities are welcome. Please create an issue on GitHub first, so we know you're working on it.

## Development
Unfortunately the current configuration is not very development friendly :(

1. Clone the repository and install dependencies:
```sh
git clone https://github.com/burnoo/twichess.git
cd twichess
yarn install
```
2. [Register Twitch Oauth app](https://dev.twitch.tv/docs/authentication) with callback `http://localhost:3000/api/auth/callback/twitch`

3. Add necessary environment variables:

File `./env.local`:
```dosini
APP_URL=http://localhost:3000

NEXTAUTH_URL=$APP_URL

TWITCH_CLIENT_ID= # id from 2.
TWITCH_CLIENT_SECRET= # secret from 2.
```

File `./prisma/.env`:
```dosini
DATABASE_URL=postgresql://{user}:{password}@{host}:{5432}/{databaseName}
```

4. Run dev server:
```sh
yarn dev
```
You can also run `npx prisma studio` to manage database.

## Developer's TODO
Creating this project I wanted to create MVP quickly, because I wasted too much time in my life on creating polished projects that nobody uses ;p. Therefore, the application has some programming shortcomings that would be good to eliminate. Here is a list of things that should be done:
- make the configuration more developer-friendly
  - get rid of Twitch in dev environment
  - make `http://localhost:3000` default url
  - use SQLite instead of postgresql in dev environment
- migrate to `TypeScript`
- add tests
- replace `Grommet` with some other UI library? it looked nice at first, but I am not sure if it was a right choice
- refactor react components


[li]: https://lichess.org
[tch]: https://twichess.com
[tw]: https://twitch.tv
[digi]: www.twitch.tv/digimonsterr
[ext]: https://www.twitch.tv/p/extensions/