import Main from '../Main';
import { Box, Heading, Text } from 'grommet';
import { PlayersTable } from './PlayersTable';

export default function Streamer({ isSignedIn, error, streamer }) {
  if (error) {
    return <Main isSignedIn={isSignedIn}><Text>{error}</Text></Main>
  }

  return <Main isSignedIn={isSignedIn}>
    <Box direction="column" align="center" fill="horizontal" flex="false">
      <Heading size="small">{streamer}</Heading>
      <PlayersTable streamer={streamer} />
      <Text margin={{top: "medium"}}><a href={`/streamer/${streamer}/widget`} target="_blank">widget for streamers</a></Text>
      <Text size="small" margin="medium">This page is refreshed automatically every ~120s.</Text>
    </Box>
  </Main>
}