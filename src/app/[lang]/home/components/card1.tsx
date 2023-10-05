import Image from "next/image";
import { Suspense } from "react";

interface Card1Props {
    lang: string;
}

export default function Card1({ lang }: Card1Props) {
    return (
        <div className="flex flex-col items-center text-center justify-center py-8">
            <p className="text-xl font-semibold pb-8">Encontre oportunidades</p>
            <p className="px-8 pb-4">
                Orci varius natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Vestibulum consectetur condimentum
                mollis. Mauris velit est, rutrum ut leo in, scelerisque auctor
                diam. Mauris aliquam lectus in mi pretium, in posuere nibh
                porttitor. Donec volutpat quam ut erat auctor molestie. Nullam
                feugiat turpis vel quam luctus volutpat. Morbi gravida mi eu
                odio rutrum, sit amet consectetur leo faucibus. Nam mollis
                iaculis dolor, vel aliquet nisl aliquet iaculis.
            </p>
            <div>
            <div className="bg-gray-400 rounded-full h-60 w-60">
                        <Suspense fallback="Loading...">
                            <Image
                                className="mx-auto h-56 w-auto"
                                src="assets/login/contacorretor.png"
                                width={1}
                                height={1}
                                alt="Encontre oportunidades"
                            />
                        </Suspense>
                    </div>
            </div>
        </div>
    );
}
