import Main from '../Main';
import { Text, DataTable } from 'grommet';
import { getRatingString } from '../../utils/lichess'

export default function Streamer({ isSignedIn, lichessUsers }) {
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
  const tableData = lichessUsers.map((l, i) => ({
    index: i + 1,
    name: l.lichessId,
    tempo: (l.topRating == l.rapidRating ? 'rapid' : l.topRating == l.blitzRating ? 'blitz' : 'bullet'),
    rating: getRatingString(l.topRating)
  }))
  return <Main isSignedIn={isSignedIn}>
    <DataTable
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
  </Main>
}