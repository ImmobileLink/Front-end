import BotaoConecta from "./BotaoConecta";

interface BotoesProps{
    link: any;
    user: any;
}

export default function Botoes({link, user}:BotoesProps){
    return <div className="mt-5 flex flex-wrap">
        {/* <BotaoConecta link={link} userId={user}/> */}
    </div>
}