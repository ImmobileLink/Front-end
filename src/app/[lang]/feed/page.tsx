import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cache } from "react";
import {CardLink as CardL} from "../../[lang]/(components)/(compositions)/(card)/index";
import CardNotLogged from "../(components)/(cards)/CardNotLogged";
import CardProfile from "../(components)/(cards)/CardProfile";
import CardUserList from "../(components)/(cards)/CardUserList";
import { Card } from "../(components)/(compositions)/(card)";
import { Page } from "../(components)/(compositions)/(page)";
import { getDictionary } from "../dictionaries";
import FeedPrincipal from "./components/FeedPrincipal";
import {
    getAssoc,
    getLinks,
    getTipoUsuario,
} from "../../../../lib/utils/userData";
import CardLink from "../(components)/(cards)/CardLink";
import { getUserData } from "../../../../lib/utils/userData";
import { serverSupabase } from "lib/utils/serverSupabase";

interface pageProps {
    params: {
        lang: string;
    };
}

export default async function page({ params: { lang } }: pageProps) {
  const supabase = await serverSupabase()
  const dict = await getDictionary(lang); // pt
  const userData = await getUserData(supabase);

    // const dict = await getDictionary(lang); // pt
    // const userData = await getUserData(user);

    return (
        <div className="flex justify-center gap-5 mt-4">
            <Page.Left>
                {userData.id ? (
                    <>
                        <Card.RootStatic>
                            <Card.Content>
                                <CardProfile
                                    userData={userData}
                                    cards={dict.feed.cards}
                                />
                            </Card.Content>
                        </Card.RootStatic>
                    </>
                ) : (
                    <Card.Root>
                        <Card.Content>
                            <CardNotLogged cards={dict.feed.cards} />
                        </Card.Content>
                    </Card.Root>
                )}
            </Page.Left>
            <Page.Main>
                <FeedPrincipal userData={userData} textos={dict.feed} />
            </Page.Main>
            <Page.Right>
                {userData.id && (
                    <>
                        <Card.Root>
                            <CardL.Title link={"/links"} title={dict.feed.cards.connections} />
                            <Card.Content>
                                <CardLink
                                    userId={userData.id}
                                    userLinks={userData.links || []}
                                    cards={dict.feed.cards}
                                />
                            </Card.Content>
                        </Card.Root>
                        <Card.Root>
                            {userData.type == "corretor" ? (
                                    <CardL.Title
                                        title={dict.feed.cards.myrelatedcompany}
                                        link={"/links"}
                                    />
                            ) : (
                                    <CardL.Title
                                        title={dict.feed.cards.relatedbrokers}
                                        link={"/links"}
                                    />
                            )}
                            <Card.Content>
                                <CardLink
                                    userId={userData.id}
                                    userLinks={userData.assoc || []}
                                    cards={dict.feed.cards}
                                />
                            </Card.Content>
                        </Card.Root>
                        <Card.Root>
                            <Card.Title title={dict.feed.cards.findbrokers} />
                            <Card.Content>
                                <CardUserList
                                    cards={dict.feed.cards}
                                    avatar={userData.avatar}
                                />
                            </Card.Content>
                        </Card.Root>
                    </>
                )}
            </Page.Right>
        </div>
    );
}
