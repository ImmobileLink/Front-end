
import NavCard from "../(components)/NavCard";
import PostFormCard from "../(components)/PostFormCard";
import PostCard from "../(components)/PostCard";


interface pageProps {}

export default async function page({}: pageProps ) {
    return (
        <div className="w-screen h-screen bg-branco dark:bg-escuro2">
            <div id="Feed" className="flex mt-4 max-w-4xl mx-auto gap-6">
                <div className="w-3/12">
                    <NavCard/>
                    <div>
                        <button className="flex w-40 mx-auto gap-2 mt-10 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 justify-center text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
                            Atualizar
                            <div className="p-1grow rounded-giga bg-orange-700">Novo</div>  
                        </button>    
                           
                    </div>

                </div>
                <div id="posts" className="w-9/12">
                    <PostFormCard/>
                    <PostCard/>
                </div>
            </div>
        </div>
        )
}