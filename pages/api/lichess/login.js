import { lichessOauth, lichessRedirectUrl } from '../../../utils/lichess';

export default (req, res) => {
  const authorizationUri = lichessOauth.authorizeURL({
    redirect_uri: lichessRedirectUrl,
    scope: ['preference:read'],
    state: Math.random().toString(36).substring(2)
  });

  res.redirect(authorizationUri)
}