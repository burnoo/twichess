import prisma from '../../../utils/prisma'

export default async (req, res) => {
  const { streamer } = req.query
  const chatters = await fetch(`https://tmi.twitch.tv/group/user/${streamer}/chatters`)
    .then(res => res.json());
  const viewers = chatters.chatters.viewers;
  const lichessUsers = await prisma.lichess.findMany({
    where: {
      twitchName: {
        in: viewers,
      },
    },
    orderBy: {
      blitzRating: 'desc'
    },
    take: 10
  })
  res.send(JSON.stringify(lichessUsers));
}