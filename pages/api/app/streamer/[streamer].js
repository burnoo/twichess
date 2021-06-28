import prisma from '../../../../utils/prisma'
import moment from 'moment'
import { twitchUsernameRegex } from '../../../../utils/string';

const getLichessViewersFromCache = async (streamerName) => {
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
  return streamer?.[0]?.viewers;
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

const cacheLichessViewers = async (streamer, lichessViewers) => {
  await prisma.streamerCache.deleteMany({
    where: { name: streamer }
  });
  await prisma.streamerCache.create({
    data: {
      name: streamer,
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
  let lichessViewers = await getLichessViewersFromCache(streamer);
  if (!lichessViewers) {
    const twitchViewers = await fetchTwitchViewers(streamer);
    lichessViewers = await fetchLichessViewers(twitchViewers);
    await cacheLichessViewers(streamer, lichessViewers);
  }
  const response = {
    viewers: lichessViewers
  }
  res.send(JSON.stringify(response))
}