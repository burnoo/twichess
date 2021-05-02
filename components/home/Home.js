import Link from 'next/link'
import { Box, Button, Text, TextInput } from 'grommet';
import { useState } from 'react';
import Main from '../Main';
import { signIn } from 'next-auth/client';

export default function Home({ user }) {
  const [value, setValue] = useState('');
  console.log(user);
  return <Main isSignedIn={user}>
    <Box
      pad="large"
      align="center"
      background={{ color: 'light-4', opacity: 'strong' }}
      round
      gap="small"
    >
      {!user && <>
        <Text textAlign="center">Link your Twitch and lichess account<br></br>to setup twichess.</Text>
        <Button primary label="Login with Twitch" onClick={() => { signIn('twitch') }}  margin={{ top: "small" }}/>
      </>}
      {user && !user.lichess && <>
        <Text textAlign="center" pad>Logged in with Twitch as: <b>{user.name}</b></Text>
        <Link href="/api/lichess/login">
          <Button secondary label="Connect with lichess" margin={{ top: "small" }}/>
        </Link>
      </>}
      {user && user.lichess && <>
        <Text textAlign="center">Logged in with Twitch as: <b>{user.name}</b></Text>
        <Text pad>Linked lichess account: <b>{user.lichess.username}</b></Text>
        <Link href="/api/lichess/login">
          <Button secondary label="Update lichess data" margin={{ top: "small" }}/>
        </Link>
      </>}
    </Box>
    <Box pad="large" align="center" background="dark-2" round gap="small">
      <TextInput
        placeholder="Enter streamer name"
        value={value}
        onChange={event => setValue(event.target.value)}
      />
      <Button label="Find streamer" onClick={() => { }} />
    </Box>
  </Main>
}