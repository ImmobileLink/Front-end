import { Planos } from "@/app/i18n/dictionaries/types";
import PlanoTable from "./PlanoTable";
import PlanoCardMobile from "./PlanoCardMobile";

interface ComparePlanosProps {
    sub: Planos;
}

export default function ComparePlanos({ sub }: ComparePlanosProps) {
    return (
        <>
            <div
                id="premium-resources"
                className="flex flex-col px-12 md:text-left text-center py-8 select-none"
            >
                <div className="hidden lg:flex justify-around">
                    <div>
                        <p className="text-xl font-semibold pb-8 md:pt-12 md:text-2xl">
                            {sub.forbrokers}
                        </p>
                        <PlanoTable sub={sub} role={"corretor"} />
                    </div>
                    <div>
                        <p className="text-xl font-semibold pb-8 md:pt-12 md:text-2xl">
                            {sub.forbusiness}
                        </p>
                        <PlanoTable sub={sub} role={"empresa"} />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row lg:hidden justify-center md:justify-around">
                <div>
                        <p className="text-xl font-semibold pb-8 md:pt-12 md:text-2xl">
                            {sub.forbrokers}
                        </p>
                        <PlanoCardMobile sub={sub} role={"corretor"}/>
                    </div>
                    <div>
                        <p className="text-xl mt-8 md:mt-0 font-semibold pb-8 md:pt-12 md:text-2xl">
                            {sub.forbusiness}
                        </p>
                        <PlanoCardMobile sub={sub} role={"empresa"}/>
                    </div>
                </div>
            </div>
        </>
    );
}
