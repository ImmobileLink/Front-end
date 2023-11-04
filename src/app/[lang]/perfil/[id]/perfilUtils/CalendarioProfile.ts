
import { Dayjs } from "dayjs";


async function getDiasVisita(date: Dayjs, id1: string, id2: string | undefined, supabase: any) {

    if (id2) {
        let { data, error } = await supabase
            .rpc('getdiasvisita', {
                anoparam: date.get('year'),
                id_cor: id1,
                id_cor2: id2,
                mesparam: date.get('month') + 1
            })

        return { data, error }
    } else {
        let { data, error } = await supabase
            .rpc('getdiasvisita', {
                anoparam: date.get('year'),
                id_cor: id1,
                mesparam: date.get('month') + 1
            })

        return { data, error }
    }
}

export {getDiasVisita}