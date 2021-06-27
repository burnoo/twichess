import { pkceCache } from '../../../utils/cache';
import crypto from 'crypto'
import { lichessClientId, lichessRedirectUrl } from '../../../utils/lichess-oauth';

const base64URLEncode = (str) => {
  return str.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function sha256(buffer) {
  return crypto.createHash('sha256').update(buffer).digest();
}

const createVerifier = () => base64URLEncode(crypto.randomBytes(32));

const createChallenge = (verifier) => base64URLEncode(sha256(verifier));

export default async (req, res) => {
  const verifier = createVerifier()
  const challenge = createChallenge(verifier)
  await pkceCache.set(challenge, verifier)
  res.redirect('https://lichess.org/oauth?' + new URLSearchParams({
    response_type: 'code',
    client_id: lichessClientId,
    redirect_uri: lichessRedirectUrl,
    scope: 'preference:read challenge:read challenge:write tournament:write', 
    code_challenge_method: 'S256',
    state: challenge,
    code_challenge: challenge
  }))
}