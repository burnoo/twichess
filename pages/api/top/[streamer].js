import prisma from '../../../utils/prisma'
import moment from 'moment'

const getLichessViewersFromCache = async (streamerName) => {
  const streamer = await prisma.streamer.findMany({
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

const fetchViewers = async (streamer) => {
  const chatters = await fetch(`https://tmi.twitch.tv/group/user/${streamer}/chatters`)
    .then(res => res.json());
  return chatters.chatters.viewers;
}

const fetchLichessViewers = async (viewers) => {
  return prisma.lichess.findMany({
    where: {
      twitchName: {
        in: viewers,
      },
    },
    orderBy: {
      topRating: 'desc'
    },
    take: 10
  });
}

const cacheLichessViewers = async (streamer, lichessViewers) => {
  await prisma.streamer.deleteMany({
    where: { name: streamer }
  });
  await prisma.streamer.create({
    data: {
      name: streamer,
      viewers: {
        connect: lichessViewers.map(lichess => ({ id: lichess.id }))
      }
    }
  });
}

export default async (req, res) => {
  const { streamer } = req.query
  const cachedLichessViewers = await getLichessViewersFromCache(streamer);
  if (cachedLichessViewers) {
    res.send(JSON.stringify(cachedLichessViewers));
  } else {
    const viewers = await fetchViewers(streamer);
    const lichessViewers = await fetchLichessViewers(viewers);
    await cacheLichessViewers(streamer, lichessViewers);
    res.send(JSON.stringify(lichessViewers));
  }
}