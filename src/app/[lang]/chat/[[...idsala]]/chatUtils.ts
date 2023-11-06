import { v4 } from "uuid";
import { MensagemAInserir, RoomData } from "../../../../../lib/modelos";
import { uploadFile } from "../../../../../lib/utils/uploadFile";

export const errorArray: any[] = [];

export function addErrorToQueue(error: any) {
    errorArray.push(error);
}

export async function insertMessage({ idautor, idsala, mensagem, imagem }: MensagemAInserir, supabase: any) {
    let novamensagem: any = {}
    let uploadCheck: boolean | undefined = false
    if (imagem) {
        const uuid = v4()
        const fileNewName = uuid;
        novamensagem = {
            idautor: idautor,
            idsala: idsala,
            mensagem: mensagem,
            imagem: fileNewName
        }
        uploadCheck = await uploadFile(imagem, fileNewName, 'mensagens', supabase);
        if (uploadCheck) {
            const check = supabaseInsert(novamensagem, supabase)
            return check
        }
    }
    else {
        novamensagem = {
            idautor: idautor,
            idsala: idsala,
            mensagem: mensagem
        }
        const check = supabaseInsert(novamensagem, supabase)
        return check
    }
}

export async function supabaseInsert(mensagem: any, supabase: any) {
    const { error } = await supabase
        .from('mensagem')
        .insert(mensagem)
    if (error) {
        addErrorToQueue("insert_error")
        return false
    }
    else {
        return true
    }
}

//Busca as últimas mensagens enviadas em cada sala que o usuário participa
export async function getLastMessages(userId: string | undefined, supabase: any) {
    if (userId) {
        const { data, error } = await supabase
            .rpc('obter_ultimas_mensagens_por_usuario', {
                idusuario: userId
            })
            .order('atualizadoem', { ascending: false })
        if (error) {
            addErrorToQueue("last_messages_error")
            return false
        }
        else {
            return data
        }
    }
}

//Busca as salas que o usuário participa
export async function getUserRooms(userId: string, supabase: any) {
    const { data, error } = await supabase
        .from('usuarioporsala')
        .select('idsala')
        .eq('idusuario', userId)
    if (error) {
        addErrorToQueue("user_room_error")
        return false
    }
    else {
        const array = data.map((item: any) => item.idsala)
        const string = array.toString()
        return string
    }
}

//Cria uma nova sala e retorna o id, ou retorna a sala caso ela já exista.
export async function createOrGetRoom(idremetente: string | null, iddestinatario: string | null, supabase: any) {
    if (idremetente && iddestinatario) {
        let { data, error } = await supabase
            .rpc('criar_ou_retornar_sala', {
                id_destinatario: iddestinatario,
                id_usuario: idremetente!
            })
        if (error) {
            addErrorToQueue("new_room_error")
            return false
        }
        else {
            return data
        }
    }
}

export async function getRoomData(idsala: string | undefined, supabase: any) {
    let roomData: RoomData = {
        iddestinatario: null,
        nomedestinatario: null,
        avatardestinatario: null,
        mensagens: [],
    };

    if (idsala) {
        const { data, error } = await supabase
            .rpc('get_dados_sala', {
                idsala_param: idsala
            })
        if (error) {
            addErrorToQueue('room_data_error')
            return false
        }
        else {
            try {
                roomData.iddestinatario = data[0].iddestinatario
                roomData.nomedestinatario = data[0].nomedestinatario
                roomData.avatardestinatario = data[0].avatar

                Object.assign(roomData.mensagens, data[0].mensagens)
                if (!roomData.mensagens[0].idsala) {
                    roomData.mensagens = []
                }
                return roomData
            }
            catch (e) {
                addErrorToQueue('room_data_array_assign_error')
                return false
            }
        }
    }
}



