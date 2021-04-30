import Link from 'next/link'
import { signIn, signOut, getSession } from 'next-auth/client'
import prisma from '../utils/prisma'

export default function Home({ user }) {
  return <>
    {!user && <>
      Not signed in <br />
      <button onClick={() => signIn('twitch')}>Sign in</button>
    </>}
    {user && !user.lichess && <>
      Signed in as {user.name} <br />
      <Link href="/api/lichess/login">Login to lichess</Link> <br />
      <button onClick={() => signOut()}>Sign out</button>
    </>}
    {user && user.lichess && <>
      Signed in as {user.name} <br />
      Lichess: {user.lichess.username}<br />
      <Link href="/api/lichess/login">Update lichess data</Link> <br />
      <button onClick={() => signOut()}>Sign out</button>
    </>}
  </>
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
