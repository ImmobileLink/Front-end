import { getDictionary } from "../dictionaries";
import { Card } from "../(components)/(compositions)/(card)";
import CardUserList from "../(components)/(cards)/CardUserList";
import NavBar from "../(components)/(navbar)/NavBar";
import LinksList from "./components/LinksList";
import { getUserData } from "../../../../lib/utils/userData";
import { serverSupabase } from "lib/utils/serverSupabase";
import { redirect } from "next/navigation";
interface pageProps {
    params: {
        lang: string;
    };
}

export default async function page({ params: { lang } }: pageProps) {
    const supabase = await serverSupabase()
    const dict = await getDictionary(lang); // pt
    const userData = await getUserData(supabase);

    if(userData.id == undefined || userData.id == null){
        redirect('/');
    }

    return (
        <div>
            <NavBar
                params={{
                    lang: lang,
                }}
            />
            <div className="pt-4 w-full h-fit min-h-screen bg-branco dark:bg-dark-200 flex flex-row justify-center">
                <div className="md:mx-2 md:w-7/12 w-11/12 flex">
                    <LinksList dict={dict.mylinks} links={userData.links} assoc={userData.assoc} type={userData.type!} id={userData.id!}/>
                </div>
                <div className="w-fit hidden md:flex mx-4">
                    <Card.Root>
                        <Card.Title title={dict.feed.cards.findbrokers} />
                        <Card.Content>
                            <CardUserList
                                cards={dict.feed.cards}
                                avatar={userData.avatar}
                            />
                        </Card.Content>
                    </Card.Root>
                </div>
            </div>
        </div>
    );
}
