import oauth from 'simple-oauth2';

export const lichessOauth = new oauth.AuthorizationCode({
  client: {
    id: process.env.LICHESS_CLIENT_ID,
    secret: process.env.LICHESS_CLIENT_SECRET,
  },
  auth: {
    tokenHost: 'https://oauth.lichess.org',
    authorizePath: '/oauth/authorize',
    tokenPath: '/oauth'
  },
  http: {
    json: true
  }
});

export const lichessRedirectUrl = "https://localhost:3001/api/lichess/callback";