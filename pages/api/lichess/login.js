import crypto from 'crypto'
import { lichessClientId, lichessRedirectUrl } from '../../../utils/server/lichess-oauth';
import { setCookie } from 'nookies';

const base64URLEncode = (str) => {
  return str.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

const sha256 = (buffer) => crypto.createHash('sha256').update(buffer).digest();

const createVerifier = () => base64URLEncode(crypto.randomBytes(32));

const createChallenge = (verifier) => base64URLEncode(sha256(verifier));

export default async (req, res) => {
  const verifier = createVerifier()
  const challenge = createChallenge(verifier)
  setCookie({ res }, 'code_verifier', verifier, {
    maxAge: 60 * 60,
    path: '/api/lichess',
  });
  res.redirect('https://lichess.org/oauth?' + new URLSearchParams({
    response_type: 'code',
    client_id: lichessClientId,
    redirect_uri: lichessRedirectUrl,
    scope: 'preference:read challenge:read challenge:write tournament:write',
    code_challenge_method: 'S256',
    code_challenge: challenge
  }))
}