import { getSession } from "next-auth/client";
import Streamer from "../../components/streamer/Streamer";

export default function Page({ isSignedIn, lichessUsers }) {
  return <Streamer isSignedIn={isSignedIn} lichessUsers={lichessUsers} />
}

export async function getServerSideProps({ req, params }) {
  const session = await getSession({ req });
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
