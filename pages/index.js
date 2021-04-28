import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'

export default function Home() {
  const [session, loading] = useSession()

  return <>
    {!session && <>
      Not signed in <br />
      <button onClick={() => signIn('twitch')}>Sign in</button>
    </>}
    {session && <>
      Signed in as {session.user.name} <br />
      <Link href="/api/lichess/login">Login to lichess</Link> <br />
      <button onClick={() => signOut()}>Sign out</button>
    </>}
  </>
}
