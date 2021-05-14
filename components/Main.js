import HtmlHead from './HtmlHead'
import Link from 'next/link';
import { Grommet, Grid, Box, Button, Text, Nav, Anchor } from 'grommet';
import { useState } from 'react';
import { signIn, signOut } from 'next-auth/client';
import theme from '../utils/theme'

export default function Main({ children, isSignedIn }) {
  const [value, setValue] = useState('');
  return <Grommet full theme={theme}>
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
        <Link href="/" size="large"><Text style={{ cursor: 'pointer' }}>twichess</Text></Link>
        <Nav direction="row">
          <Anchor label={isSignedIn ? "Logout" : "Login"} onClick={() => { isSignedIn ? signOut() : signIn('twitch') }} />
        </Nav>
      </Box>
      <Box gridArea="main">
        {children}
      </Box>
    </Grid>
  </Grommet>
}