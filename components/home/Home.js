import Link from 'next/link'
import { Box, Button, Text, TextInput, Table, TableBody, TableRow, TableHeader, TableCell } from 'grommet';
import { useState } from 'react';
import Main from '../Main';
import { signIn } from 'next-auth/client';

export const getRatingString = (rating, prov) => {
  return `${rating}${prov ? "?" : ""}`;
}

export default function Home({ user }) {
  const [value, setValue] = useState('');
  return <Main isSignedIn={user}>
    <Box
      pad="large"
      align="center"
      background={{ color: 'light-4', opacity: 'strong' }}
      round
      gap="small"
      flex={false}
    >
      {!user && <>
        <Text textAlign="center">Link your Twitch and lichess account<br></br>to setup twichess.</Text>
        <Button primary label="Login with Twitch" onClick={() => { signIn('twitch') }} margin={{ top: "small" }} />
      </>}
      {user && !user.lichess && <>
        <Text textAlign="center" pad>Logged in with Twitch as: <b>{user.name}</b></Text>
        <Link href="/api/lichess/login">
          <Button secondary label="Connect with lichess" margin={{ top: "small" }} />
        </Link>
      </>}
      {user && user.lichess && <>
        <Text textAlign="center">Logged in with Twitch as: <b>{user.name}</b></Text>
        <Text pad>Linked lichess account: <b>{user.lichess.username}</b></Text>
        <Table>
          <TableHeader>
            <TableRow>
              {user.lichess.title &&
                <TableCell scope="col" border="bottom" align="center">Title</TableCell>
              }
              <TableCell scope="col" border="bottom" align="center">Bullet</TableCell>
              <TableCell scope="col" border="bottom" align="center">Blitz</TableCell>
              <TableCell scope="col" border="bottom" align="center">Rapid</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              {user.lichess.title &&
                <TableCell align="center">{user.lichess.title}</TableCell>
              }
              <TableCell align="center">{getRatingString(user.lichess.bulletRating, user.lichess.bulletProv)}</TableCell>
              <TableCell align="center">{getRatingString(user.lichess.blitzRating, user.lichess.blitzProv)}</TableCell>
              <TableCell align="center">{getRatingString(user.lichess.rapidRating, user.lichess.rapidProv)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Link href="/api/lichess/login">
          <Button secondary label="Update lichess data" margin={{ top: "small" }} />
        </Link>
      </>}
    </Box>
    <Box pad="large" align="center" background="dark-2" round gap="small" flex={false}>
      <Text textAlign="center">Check out players currently watching<br/>streams:</Text>
      <TextInput
        placeholder="Enter streamer name"
        value={value}
        onChange={event => setValue(event.target.value)}
      />
      <Button label="Find streamer" onClick={() => { }} />
    </Box>
  </Main>
}