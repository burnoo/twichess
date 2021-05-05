import { Box, Text, DataTable } from 'grommet';
import { getRatingString } from '../../utils/string';
import useSWR from 'swr';
import styles from '../../styles/PlayersTable.module.css'

const fetcher = (...args) => fetch(...args).then(res => res.json());

export function PlayersTable({ streamer, widget }) {
  const { data, error } = useSWR(`/api/top/${streamer}`, fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 1000 * 45,
    refreshWhenHidden: true
  });

  if (error)
    return <Text>Failed to load</Text>;
  if (!data)
    return <Text>Loading...</Text>;

  let tableData = data.map((l, i) => ({
    index: i + 1,
    title: l.title,
    name: l.lichessId,
    tempo: (l.topRating == l.rapidRating ? 'rapid' : l.topRating == l.blitzRating ? 'blitz' : 'bullet'),
    rating: getRatingString(l.topRating),
  }));
  //TODO: use real data
  tableData = Array.from({ length: 10 }, (_, i) => ({
    index: i + 1,
    name: `pypel${i + 1}`,
    title: "GM",
    tempo: i % 2 == 0 ? 'bullet' : 'blitz',
    rating: 2837 - i * 100
  }));
  if (tableData.length == 0) {
    const info = <Text size="large">No players currently watching this stream.</Text>
    if(widget) {
      return <Box fill="true" align="center" justify="center">
        {info}
      </Box>
    } else {
      return info
    }
  }
  return <DataTable
    style={{ maxWidth: widget ? null : "700px" }}
    className={styles.playersTable}
    background={{
      body: ['light-3', 'light-1'],
    }}
    pad={{ horizontal: 'medium', vertical: 'small' }}
    primaryKey={false}
    columns={[
      {
        property: 'index',
        size: "1/16",
      },
      {
        property: 'title',
        size: "1/16",
        render: data => <Text weight="bold">{data.title}</Text>
      },
      {
        property: 'name',
        size: "3/4",
      },
      {
        property: 'rating',
        size: "1/8",
        render: data => {
          let iconLetter;
          switch (data.tempo) {
            case 'rapid':
              iconLetter = 'T';
              break;
            case 'bullet':
              iconLetter = ")";
              break;
            case 'blitz':
              iconLetter = '#';
              break;
          }
          return <Text data-lichess-icon={iconLetter}>{data.rating}</Text>;
        }
      },
    ]}
    data={tableData} />
}
