import { signIn } from 'next-auth/client';
import Link from 'next/link'
import { Button, Table, TableHeader, TableRow, TableCell, TableBody, Text } from 'grommet';
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
  return <>
    <Text pad>Linked lichess account: <b>{lichess.username}</b></Text>
    <Table>
      <TableHeader>
        <TableRow>
          {lichess.title &&
            <TableCell scope="col" border="bottom" align="center">Title</TableCell>
          }
          <TableCell scope="col" border="bottom" align="center">Bullet</TableCell>
          <TableCell scope="col" border="bottom" align="center">Blitz</TableCell>
          <TableCell scope="col" border="bottom" align="center">Rapid</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          {lichess.title &&
            <TableCell align="center">{lichess.title}</TableCell>
          }
          <TableCell align="center">{getRatingString(lichess.bulletRating, lichess.bulletProv)}</TableCell>
          <TableCell align="center">{getRatingString(lichess.blitzRating, lichess.blitzProv)}</TableCell>
          <TableCell align="center">{getRatingString(lichess.rapidRating, lichess.rapidProv)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <Link href="/api/lichess/login">
      <Button secondary label="Update lichess data" margin={{ top: "small" }} />
    </Link>
  </>
}