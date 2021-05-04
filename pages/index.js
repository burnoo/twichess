import { getSession } from 'next-auth/client'
import prisma from '../utils/prisma'
import Home from '../components/home/Home'

export default function Page({ user }) {
  return <Home user={user} />
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })
  const userId = session?.userId
  if(!userId) return { props: {} }
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      lichess: true,
    }
  });
  return { props: {
      user: JSON.parse(JSON.stringify(user))
  }}
}
