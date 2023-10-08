interface EditCapaProps { }

export default async function EditCapa({ }: EditCapaProps) {
    return (
        <>
            <button className="absolute top-2 right-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                Alterar Imagem
            </button>
        </>
    );
}