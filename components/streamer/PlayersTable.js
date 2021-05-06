import { Box, Text, DataTable } from 'grommet';
import { getRatingString } from '../../utils/string';
import useSWR from 'swr';
import styles from '../../styles/PlayersTable.module.css'

const fetcher = (...args) => fetch(...args).then(res => res.json());

function OptionalWidgetBox({ widget, children }) {
  if (widget) {
    return <Box fill="true" align="center" justify="center">
      {children}
    </Box>
  } else {
    return children
  }
}

export function PlayersTable({ streamer, widget }) {
  const { data, error } = useSWR(`/api/top/${streamer}`, fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 1000 * 45,
    refreshWhenHidden: true
  });

  if (error)
    return <OptionalWidgetBox widget={widget}><Text>Failed to load</Text></OptionalWidgetBox>;
  if (!data)
    return <OptionalWidgetBox widget={widget}><Text>Loading...</Text></OptionalWidgetBox>;

  let tableData = data.map((l, i) => ({
    index: i + 1,
    title: l.title,
    name: l.lichessId,
    tempo: (l.topRating == l.rapidRating ? 'rapid' : l.topRating == l.blitzRating ? 'blitz' : 'bullet'),
    rating: getRatingString(l.topRating),
  }));
  //TODO: use real data
  tableData = Array.from({ length: 100 }, (_, i) => ({
    index: i + 1,
    name: `pypel${i + 1}`,
    title: "GM",
    tempo: i % 2 == 0 ? 'bullet' : 'blitz',
    rating: 2837 - i * 100
  }));
  if (widget) tableData = tableData.slice(0, 10);
  if (tableData.length == 0) {
    return <OptionalWidgetBox widget={widget}>
      <Text size="large">No players currently watching this stream.</Text>
    </OptionalWidgetBox>
  }
  return <DataTable
    style={{ maxWidth: widget ? null : "700px" }}
    className={styles.playersTable}
    theme={{
      dataTable: {
        pagination: {
          container: <Box></Box>
        }
      }
    }}
    background={{
      body: ['light-3', 'light-1'],
    }}
    pad={{ horizontal: 'medium', vertical: 'small' }}
    step={10}
    paginate
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
        render: data => <Text>
          <a href={`https://lichess.org/@/${data.name}`} target="_blank" className={styles.playerLink}>
            {data.name}
          </a>
        </Text>
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
