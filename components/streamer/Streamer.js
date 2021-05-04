import Main from '../Main';
import { Box, Heading, Text, DataTable } from 'grommet';
import { getRatingString } from '../../utils/string'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

function PlayersTable({ streamer }) {
  const { data, error } = useSWR(`/api/top/${streamer}`, fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 1000 * 45,
    refreshWhenHidden: true
  })

  if (error) return <Text>Failed to load</Text>
  if (!data) return <Text>Loading...</Text>

  //TODO: use real data
  const testData = Array.from({ length: 10 }, (_, i) => ({
    index: i + 1,
    name: `pypel${i + 1}`,
    title: "GM",
    tempo: i % 2 == 0 ? 'bullet' : 'blitz',
    rating: 2837 - i * 100
  }));
  const tableData = data.map((l, i) => ({
    index: i + 1,
    title: l.title,
    name: l.lichessId,
    tempo: (l.topRating == l.rapidRating ? 'rapid' : l.topRating == l.blitzRating ? 'blitz' : 'bullet'),
    rating: getRatingString(l.topRating),
  }))
  return <DataTable
    background={{
      body: ['light-1', 'light-3'],
    }}
    pad={{ horizontal: 'medium', vertical: 'small' }}
    columns={[
      {
        property: 'index',
      },
      {
        property: 'title',
        primary: true,
      },
      {
        property: 'name',
      },
      {
        property: 'rating',
        render: data => {
          let iconLetter;
          switch (data.tempo) {
            case 'rapid':
              iconLetter = 'T'
              break;
            case 'bullet':
              iconLetter = ")"
              break;
            case 'blitz':
              iconLetter = '#'
              break;
          }
          return <Text data-lichess-icon={iconLetter} margin={{ left: "xlarge" }}>{data.rating}</Text>
        }
      },
    ]}
    data={testData}
  />
}

export default function Streamer({ isSignedIn, error, streamer }) {
  if (error) {
    return <Main isSignedIn={isSignedIn}><Text>{error}</Text></Main>
  }

  return <Main isSignedIn={isSignedIn}>
    <Box direction="column" align="center">
      <Heading size="small">{streamer}</Heading>
      <PlayersTable streamer={streamer} />
    </Box>
  </Main>
}