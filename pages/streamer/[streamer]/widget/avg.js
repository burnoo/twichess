import { useRouter } from 'next/router';
import AvgWidget from '../../../../components/widget/AvgWidget'

export default function Page() {
  const router = useRouter()
  const { streamer } = router.query;

  return <AvgWidget streamer={streamer} />
}