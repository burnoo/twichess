import { signIn } from 'next-auth/client';
import Link from 'next/link'
import { Button, DataTable, Table, TableHeader, TableRow, TableCell, TableBody, Text } from 'grommet';
import { getRatingString } from '../../../utils/string';

export function GuestContent() {
  return <>
    <Text textAlign="center">Login with Twitch and link your lichess<br />account to setup twichess.</Text>
    <Button primary label="Login with Twitch" onClick={() => { signIn('twitch') }} margin={{ top: "small" }} />
  </>
}

export function LoggedInContent({ name }) {
  return <Text textAlign="center">Logged in with Twitch as: <b>{name}</b></Text>
}

export function UnlinkedContent() {
  return <Link href="/api/lichess/login">
    <Button secondary label="Connect with lichess" margin={{ top: "small" }} />
  </Link>
}

export function LinkedContent({ lichess }) {
  let columns = [
    {
      property: 'bullet',
      header: 'Bullet',
      align: 'center',
    },
    {
      property: 'blitz',
      header: 'Blitz',
      align: 'center',
    },
    {
      property: 'rapid',
      header: 'Rapid',
      align: 'center',
    },
  ]
  lichess.title && columns.unshift({property: 'title', header: 'Title', align: 'center'})
  return <>
    <Text pad>Linked lichess account: <b>{lichess.username}</b></Text>
    <DataTable
      primaryKey={false}
      columns={columns}
      align
      data={[{
        title: lichess.title,
        bullet: getRatingString(lichess.bulletRating, lichess.bulletProv),
        blitz: getRatingString(lichess.blitzRating, lichess.blitzProv),
        rapid: getRatingString(lichess.rapidRating, lichess.rapidProv)
      }]}
    />
    <Link href="/api/lichess/login">
      <Button secondary label="Update lichess data" margin={{ top: "small" }} />
    </Link>
  </>
}