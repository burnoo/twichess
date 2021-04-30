import { getSession } from 'next-auth/client';
import { lichessOauth, lichessRedirectUrl } from '../../../utils/lichess';
import prisma from '../../../utils/prisma'

export default async (req, res) => {
  const session = await getSession({ req })
  const lichessToken = await lichessOauth.getToken({
    code: req.query.code,
    redirect_uri: lichessRedirectUrl
  });
  const lichessUser = await fetch('https://lichess.org/api/account', {
    headers: {
      'Authorization': `Bearer ${lichessToken.token.access_token}`
    }
  }).then(res => res.json());
  const lichessData = {
    username: lichessUser.username,
    lichessId: lichessUser.id,
    title: lichessUser.title,
    countryCode: lichessUser.profile?.country,
    bulletRating: lichessUser.perfs.bullet.rating,
    bulletProv: lichessUser.perfs.bullet.prov ?? false,
    blitzRating: lichessUser.perfs.blitz.rating,
    blitzProv: lichessUser.perfs.blitz.prov ?? false,
    rapidRating: lichessUser.perfs.rapid.rating,
    rapidProv: lichessUser.perfs.rapid.prov ?? false,
    refreshToken: lichessToken.token.refresh_token,
    accessToken: lichessToken.token.access_token,
    tokenExpiresAt: lichessToken.token.expires_at
  }
  const result = await prisma.lichess.upsert({
    where: {
      userId: session.userId
    },
    update: lichessData,
    create: {
      ...lichessData,
      user: {
        connect: { id: session.userId }
      }
    }
  })
  res.redirect('/');
}