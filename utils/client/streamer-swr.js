import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export const useStreamerSWR = (streamer) => {
  return useSWR(`/api/app/streamer/${streamer}`, fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 1000 * 45,
    refreshWhenHidden: true
  });
}