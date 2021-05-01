import prisma from '../../../utils/prisma'

const fetchViewers = async (streamer) => {
  const chatters = await fetch(`https://tmi.twitch.tv/group/user/${streamer}/chatters`)
    .then(res => res.json());
  return chatters.chatters.viewers;
}

const getLichessViewers = async (viewers) => {
  return prisma.lichess.findMany({
    where: {
      twitchName: {
        in: viewers,
      },
    },
    orderBy: {
      blitzRating: 'desc'
    },
    take: 10
  });
}

export default async (req, res) => {
  const { streamer } = req.query
  const viewers = await fetchViewers(streamer);
  const lichessViewers = getLichessViewers(viewers);
  res.send(JSON.stringify(lichessViewers));
}