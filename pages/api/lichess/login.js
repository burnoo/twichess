import { lichessOauth, lichessRedirectUrl } from '../../../utils/lichess-oauth';

export default (req, res) => {
  const authorizationUri = lichessOauth.authorizeURL({
    redirect_uri: lichessRedirectUrl,
    scope: ['preference:read', 'challenge:read', 'challenge:write', 'tournament:write'],
    state: Math.random().toString(36).substring(2)
  });

  res.redirect(authorizationUri)
}