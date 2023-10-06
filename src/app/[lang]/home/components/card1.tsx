import Image from "next/image";
import { Suspense } from "react";

interface Card1Props {
    lang: string;
}

export default function Card1({ lang }: Card1Props) {
    return (
        <div id="about-immobilelink" className="flex flex-col items-center md:text-left text-center justify-center py-8">
            <div className="md:flex md:flex-row">
                <div className="px-8 md:pl-8">
                    <p className="text-xl font-semibold pb-8 md:pt-12 md:pl-12 md:text-2xl">
                        Encontre oportunidades
                    </p>
                    <p className="pb-4 md:pr-20 md:pl-12">
                        Orci varius natoque penatibus et magnis dis parturient
                        montes, nascetur ridiculus mus. Vestibulum consectetur
                        condimentum mollis. Mauris velit est, rutrum ut leo in,
                        scelerisque auctor diam. Mauris aliquam lectus in mi
                        pretium, in posuere nibh porttitor. Donec volutpat quam
                        ut erat auctor molestie. Nullam feugiat turpis vel quam
                        luctus volutpat. Morbi gravida mi eu odio rutrum, sit
                        amet consectetur leo faucibus. Nam mollis iaculis dolor,
                        vel aliquet nisl aliquet iaculis.
                    </p>
                </div>
                <div className="flex justify-center md:mr-36">
                    <div className="bg-gray-400 rounded-full h-72 w-72 md:h-52 md:w-52 md:mt-12 md:mb-8">
                        <Suspense fallback="Loading...">
                            <Image
                                className="mx-auto h-56 md:h-36 md:mt-4 w-auto"
                                src="assets/landingpage/teamup.svg"
                                width={1}
                                height={1}
                                alt="Encontre oportunidades"
                            />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}
