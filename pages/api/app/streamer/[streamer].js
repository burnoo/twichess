import prisma from '../../../../utils/prisma'
import moment from 'moment'
import { twitchUsernameRegex } from '../../../../utils/string';

const getResultFromCache = async (streamerName) => {
  const streamer = await prisma.streamerCache.findMany({
    where: {
      name: streamerName,
      updatedAt: {
        gte: moment().subtract(100, 'seconds').toISOString()
      }
    },
    include: {
      viewers: true
    }
  });
  if (!streamer?.[0]) return null
  return {
    viewers: streamer?.[0]?.viewers,
    avgViewersRating: streamer?.[0]?.avgViewersRating
  };
}

const fetchTwitchViewers = async (streamer) => {
  const chatters = await fetch(`https://tmi.twitch.tv/group/user/${streamer}/chatters`)
    .then(res => res.json());
  return chatters.chatters.viewers;
}

const fetchLichessViewers = async (twitchViewers) => {
  return prisma.lichess.findMany({
    where: {
      twitchName: {
        in: twitchViewers,
      },
    },
    orderBy: {
      topRating: 'desc'
    },
    take: 10
  });
}

const fetchAvgRating = async (twitchViewers) => {
  const aggregations = await prisma.lichess.aggregate({
    where: {
      twitchName: {
        in: twitchViewers,
      },
    },
    _avg: {
      topRating: true
    },
    take: 10
  });
  if (!aggregations._avg.topRating) return null
  return Math.round(aggregations._avg.topRating)
}

const cacheResult = async (streamer, lichessViewers, avgViewersRating) => {
  await prisma.streamerCache.deleteMany({
    where: { name: streamer }
  });
  await prisma.streamerCache.create({
    data: {
      name: streamer,
      avgViewersRating,
      viewers: {
        connect: lichessViewers.map(lichess => ({ id: lichess.id }))
      }
    }
  });
}

// TODO get parameter 10/100
export default async (req, res) => {
  const { streamer } = req.query;
  if (!streamer.match(twitchUsernameRegex)) {
    res.status(500).send('Invalid Twitch username');
    return;
  }
  let result = await getResultFromCache(streamer);
  if (!result) {
    const twitchViewers = await fetchTwitchViewers(streamer);
    const lichessViewers = await fetchLichessViewers(twitchViewers);
    const avgViewersRating = await fetchAvgRating(twitchViewers);
    await cacheResult(streamer, lichessViewers, avgViewersRating);
    result = {
      viewers: lichessViewers,
      avgViewersRating
    }
  }
  res.send(JSON.stringify(result))
}