import { Box, Text, DataTable, ThemeContext } from 'grommet';
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

export default function PlayersTable({ streamer, widget }) {
  const { data, error } = useSWR(`/api/app/streamer/${streamer}`, fetcher, {
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
  if (widget) tableData = tableData.slice(0, 10);
  if (tableData.length == 0) {
    return <OptionalWidgetBox widget={widget}>
      <Text size="large">No players currently watching this stream.</Text>
    </OptionalWidgetBox>
  }
  return <ThemeContext.Extend value={widget ? null : {
    dataTable: {
      container: {
        fill: true,
        extend: () => `
          max-width: 650px;
          width: 100%;
        `
      }
    }
  }}>
      <DataTable
        className={styles.playersTable}
        background={{
          body: ['light-3', 'light-1'],
        }}
        pad={{ horizontal: 'medium', vertical: 'small' }}
        step={10}
        paginate={!widget}
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
                  iconLetter = '\uE017';
                  break;
                case 'bullet':
                  iconLetter = "\uE047";
                  break;
                case 'blitz':
                  iconLetter = '\uE01D';
                  break;
              }
              return <Text data-lichess-icon={iconLetter}>{data.rating}</Text>;
            }
          },
        ]}
        data={tableData} />
  </ThemeContext.Extend>
}
