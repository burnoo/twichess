import Main from '../Main';
import { Box, Heading, Text } from 'grommet';
import { PlayersTable } from './PlayersTable';

export default function Streamer({ isSignedIn, error, streamer }) {
  if (error) {
    return <Main isSignedIn={isSignedIn}><Text>{error}</Text></Main>
  }

  return <Main isSignedIn={isSignedIn}>
    <Box direction="column" align="center" fill="horizontal">
      <Heading size="small">{streamer}</Heading>
      <PlayersTable streamer={streamer} />
      <Text size="small" margin="medium">This page is refreshed automatically.</Text>
    </Box>
  </Main>
}