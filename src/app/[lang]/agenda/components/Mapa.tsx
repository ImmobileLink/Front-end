"use client"

interface MapaProps {
    endereco: string;
}

export default function Mapa({ endereco }: MapaProps) {

    const apiKey = '';

    const url = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(endereco)}`;

    return (
        <div>
            <div>
                <iframe
                    title="Mapa do Google"
                    className="w-full"
                    height="224"
                    style={{ border: 1 }}
                    src={url}
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}
