import { useRouter } from 'next/router';
import Widget from '../../../components/widget/Widget'

export default function Page() {
  const router = useRouter()
  const { streamer } = router.query;

  return <Widget streamer={streamer} />
}