import HtmlHead from './common/HtmlHead';
import Link from 'next/link';
import { Grid, Box, Text, Nav, Anchor } from 'grommet';
import { useState } from 'react';
import { signIn, signOut } from 'next-auth/client';
import AppGrommet from './common/AppGrommet';

function Navigation({ isSignedIn }) {
  return <>
    <Link href="/" size="large"><Text style={{ cursor: 'pointer' }}>twichess</Text></Link>
    <Nav direction="row">
      <Anchor label={isSignedIn ? "Logout" : "Login"} onClick={() => { isSignedIn ? signOut() : signIn('twitch') }} />
    </Nav>
  </>
}

export default function Main({ children, isSignedIn }) {
  const [value, setValue] = useState('');
  return <AppGrommet>
    <HtmlHead />
    <Grid
      fill
      rows={['auto', 'flex']}
      columns={['auto', 'flex']}
      areas={[
        { name: 'header', start: [0, 0], end: [1, 0] },
        { name: 'main', start: [1, 1], end: [1, 1] },
      ]}
    >
      <Box
        gridArea="header"
        direction="row"
        align="center"
        justify="between"
        pad={{ horizontal: 'medium', vertical: 'small' }}
        background="dark-1"
      >
        <Navigation isSignedIn={isSignedIn}/>
      </Box>
      <Box gridArea="main">
        {children}
      </Box>
    </Grid>
  </AppGrommet>
}