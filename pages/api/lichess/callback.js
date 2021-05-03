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
  const bulletRating = lichessUser.perfs.bullet.rating;
  const blitzRating = lichessUser.perfs.blitz.rating;
  const rapidRating = lichessUser.perfs.rapid.rating;
  const lichessData = {
    username: lichessUser.username,
    lichessId: lichessUser.id,
    twitchName: session.user.name.toLowerCase(),
    title: lichessUser.title ?? null,
    countryCode: lichessUser.profile?.country ?? null,
    bulletRating,
    bulletProv: lichessUser.perfs.bullet.prov ?? false,
    blitzRating,
    blitzProv: lichessUser.perfs.blitz.prov ?? false,
    rapidRating,
    rapidProv: lichessUser.perfs.rapid.prov ?? false,
    topRating: Math.max(bulletRating, blitzRating, rapidRating)
  }
  const result = await prisma.lichess.upsert({
    where: {
      userId: session.userId
    },
    update: lichessData,
    create: {
      ...lichessData,
      lichessToken: {
        create: {
          refreshToken: lichessToken.token.refresh_token,
          accessToken: lichessToken.token.access_token,
          expiresAt: lichessToken.token.expires_at
        }
      },
      user: {
        connect: { id: session.userId }
      }
    }
  })
  res.redirect('/');
}