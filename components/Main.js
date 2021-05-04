import Head from 'next/head';
import Link from 'next/link';
import { Grommet, Grid, Box, Button, Text, Nav, Anchor } from 'grommet';
import { useState } from 'react';
import { signIn, signOut } from 'next-auth/client';

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

export default function Main({ children, isSignedIn }) {
  const [value, setValue] = useState('');
  return <Grommet full theme={theme}>
    <Head>
      <title>twichess</title>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
      <link rel="preload" href="https://lichess1.org/assets/_0dhxZ8/font/lichess.woff2" as="font" type="font/woff2" crossorigin></link>
    </Head>
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
        <Link href="/" size="large"><Text style={{cursor:'pointer'}}>twichess</Text></Link>
        <Nav direction="row">
          <Anchor label={isSignedIn ? "Logout" : "Login"} onClick={() => { isSignedIn ? signOut() : signIn('twitch') }} />
        </Nav>
      </Box>
      <Box
        gridArea="main" j
        direction="row-responsive"
        justify="center"
        align="center"
        pad="large"
        gap="large"
      >
        {children}
      </Box>
    </Grid>
  </Grommet>
}