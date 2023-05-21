
import NavCard from "../(components)/NavCard";
import PostFormCard from "../(components)/PostFormCard";
import PostCard from "../(components)/PostCard";


interface pageProps {}

export default async function page({}: pageProps ) {
    return (
        <div className="w-screen h-screen bg-branco dark:bg-escuro2">
            <div id="Feed" className="flex mt-4 max-w-4xl mx-auto gap-6">
                <div className="w-1/3">
                    <NavCard/>
                </div>
                <div id="posts" className="grow">
                    <PostFormCard/>
                    <PostCard/>
                </div>
            </div>
        </div>
        )
}