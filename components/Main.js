import { Attraction, Car } from 'grommet-icons';
import Head from 'next/head'
import { Grommet, Grid, Box, Button, Text, Nav, Anchor, TextInput } from 'grommet';
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
        <Text size="large">twichess</Text>
        <Nav direction="row">
          <Anchor label={isSignedIn ? "Logout" : "Login"} onClick={() => {isSignedIn ? signOut() : signIn('twitch')}}/>
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