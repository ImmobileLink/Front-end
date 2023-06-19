import Image from "next/image";
import { supabase } from "../../../../lib/supabaseClient";

interface AvatarProps {
    userId: any;
}

export default function Avatar({userId}: AvatarProps) {
    let existe = false;

    const checkPfp = async () => {
        const { data, error } = await supabase.storage
        .from('users')
        .list(`profile_picture/${userId}`)
    
        if (error) {
            return false
            console.error(error)
        }
        else {
            const files = data.filter(item => item.name == `profile_picture/${userId}`)
            return files.length > 0
        }
    }
    checkPfp().then(resultado => { 
        existe = resultado;
    })
    

    if (existe != false) {
        return (
            <div>  
                <Image
                    className="mr-3 mb-3 h-14 w-auto"
                    src={`users/profile_picture/${userId}`}
                    width={1}
                    height={1}
                    alt="Profile Picture"
                />                    
            </div>              
        )
    }
    else {
        return (
            <div>  
                <Image
                    className="mr-3 mb-3 h-14 w-auto"
                    src={`users/nopfp`}
                    width={1}
                    height={1}
                    alt="Profile Picture"
                />                    
            </div>              
        )
    }
}