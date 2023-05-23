import PostFormCard from "@/app/[lang]/(components)/(feed)/PostFormCard";
import PostCard from "@/app/[lang]/(components)/(feed)/PostCard";
import FeedPrincipal from "@/app/[lang]/(components)/(feed)/FeedPrincipal";
import NavCard from "@/app/[lang]/(components)/NavCard";
import Link from "next/link";

interface pageProps {
  params: {
    locale: string;
  };
}

export default async function page({ params: { locale } }: pageProps) {
  //requisição
  return (
    <div className="w-screen h-fit bg-branco dark:bg-escuro2 flex">
      <div className="w-3/12 h-screen bg-red-600">
        <Link href={`/${locale}/`}>HOME</Link>
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
