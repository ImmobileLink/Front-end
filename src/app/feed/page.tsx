import NavCard from "../(components)/NavCard";
import PostFormCard from "../(components)/(feed)/PostFormCard";
import PostCard from "../(components)/(feed)/PostCard";
import FeedPrincipal from "../(components)/(feed)/FeedPrincipal";

interface pageProps {}

export default async function page({}: pageProps) {
  //requisição
  return (
    <div className="w-screen h-fit bg-branco dark:bg-escuro2 flex">
      <div className="w-3/12 h-screen bg-red-600">
        <NavCard />
      </div>
      <div className="w-6/12 h-screen bg-green-600">
        <FeedPrincipal />
        <PostFormCard />
        <PostCard />
      </div>
      <div className="w-3/12 h-screen bg-blue-600">
        <NavCard />
      </div>
    </div>
  );
}
