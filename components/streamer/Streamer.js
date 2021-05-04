import Main from '../Main';
import { Text, DataTable } from 'grommet';
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
  const testData = [
    {
      index: 1,
      name: "hubcio",
      tempo: 'bullet',
      rating: 2222
    },
    {
      index: 1,
      name: "crazypapa",
      tempo: 'blitz',
      rating: 2137
    }
  ]
  const tableData = data.map((l, i) => ({
    index: i + 1,
    name: l.lichessId,
    tempo: (l.topRating == l.rapidRating ? 'rapid' : l.topRating == l.blitzRating ? 'blitz' : 'bullet'),
    rating: getRatingString(l.topRating)
  }))
  return <DataTable
    columns={[
      {
        property: 'index',
      },
      {
        property: 'name',
      },
      {
        property: 'tempo',
      },
      {
        property: 'rating',
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
    <PlayersTable streamer={streamer} />
  </Main>
}