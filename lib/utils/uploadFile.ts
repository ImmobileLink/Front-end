export async function uploadFile(file: File, fileName: string, bucketname: string, supabase: any) {
    const { error } = await supabase
        .storage
        .from(bucketname)
        .upload(`imagens/${fileName}`, file);
    if (error) {
        console.log(error);
        return false
    }
    else {
        return true
    }
}

export function getExtensionFromFilename(filename: string) {
    const lastDotIndex = filename.lastIndexOf(".");
    if (lastDotIndex === -1) {
        return ""; // Retorna uma string vazia se não houver ponto no nome do arquivo
    }
    return filename.slice(lastDotIndex); // Retorna a extensão a partir do ponto até o final
}
