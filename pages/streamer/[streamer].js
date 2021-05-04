import { getSession } from "next-auth/client";
import Streamer from "../../components/streamer/Streamer";
import { twitchUsernameRegex } from "../../utils/string";

export default function Page(props) {
  return <Streamer {...props} />
}

export async function getServerSideProps({ req, params }) {
  const session = await getSession({ req });
  if (!params.streamer.match(twitchUsernameRegex)) {
    return {
      props: {
        isSignedIn: session,
        error: 'Invalid Twitch username'
      }
    }
  }
  const apiUrl = `${process.env.APP_URL}/api/top/${params.streamer}`;
  const lichessUsers = await fetch(apiUrl)
    .then(res => res.json());
  return {
    props: {
      isSignedIn: session,
      lichessUsers: JSON.parse(JSON.stringify(lichessUsers))
    }
  }
}
