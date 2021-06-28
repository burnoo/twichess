import { getSession } from 'next-auth/client';
import { parseCookies } from 'nookies';
import { lichessClientId, lichessRedirectUrl } from '../../../utils/lichess-oauth';
import prisma from '../../../utils/prisma'

const getLichessToken = async (authCode, verifier) => await fetch('https://lichess.org/api/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    grant_type: 'authorization_code',
    redirect_uri: lichessRedirectUrl,
    client_id: lichessClientId,
    code: authCode,
    code_verifier: verifier,
  })
}).then(res => res.json());

const getLichessUser = async (accessToken) => await fetch('https://lichess.org/api/account', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
}).then(res => res.json());

function getLichessData(lichessUser, username) {
  const bulletRating = lichessUser.perfs.bullet.rating;
  const blitzRating = lichessUser.perfs.blitz.rating;
  const rapidRating = lichessUser.perfs.rapid.rating;
  return {
    username: lichessUser.username,
    lichessId: lichessUser.id,
    twitchName: username.toLowerCase(),
    title: lichessUser.title ?? null,
    countryCode: lichessUser.profile?.country ?? null,
    bulletRating,
    bulletProv: lichessUser.perfs.bullet.prov ?? false,
    blitzRating,
    blitzProv: lichessUser.perfs.blitz.prov ?? false,
    rapidRating,
    rapidProv: lichessUser.perfs.rapid.prov ?? false,
    topRating: Math.max(bulletRating, blitzRating, rapidRating)
  };
}

const upsertData = async (session, lichessData, lichessToken) => {
  await prisma.lichess.upsert({
    where: {
      userId: session.userId
    },
    update: lichessData,
    create: {
      ...lichessData,
      lichessToken: {
        create: {
          accessToken: lichessToken.access_token,
        }
      },
      user: {
        connect: { id: session.userId }
      }
    }
  });
}

export default async (req, res) => {
  const session = await getSession({ req })

  const cookies = parseCookies({ req });
  const verifier = cookies['code_verifier'];
  const lichessToken = await getLichessToken(req.query.code, verifier)

  if (!lichessToken.access_token) {
    res.redirect('/');
    return
  }

  const lichessUser = await getLichessUser(lichessToken.access_token)
  const lichessData = getLichessData(lichessUser, session.user.name);

  await upsertData(session, lichessData, lichessToken);
  res.redirect('/');
}