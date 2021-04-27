import { lichessOauth, lichessRedirectUrl } from '../../../api/lichess';

export default async (req, res) => {
  const token = await lichessOauth.getToken({
    code: req.query.code,
    redirect_uri: lichessRedirectUrl
  });
  const user = await fetch('https://lichess.org/api/account', {
    headers: {
      'Authorization': `Bearer ${token.token.access_token}`
    }
  }).then(res => res.json());
  res.send(`<h1>Success!</h1>Your lichess user info: <pre>${JSON.stringify(user)}</pre>`);
}