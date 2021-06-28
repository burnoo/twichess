import { useRouter } from 'next/router';
import ListWidget from '../../../../components/widget/ListWidget'

export default function Page() {
  const router = useRouter()
  const { streamer } = router.query;

  return <ListWidget streamer={streamer} />
}