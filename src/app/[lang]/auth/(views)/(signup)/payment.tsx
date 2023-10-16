import { Signup5 } from "@/app/i18n/dictionaries/types";
import { AiOutlineClose } from "react-icons/ai";
import Loading from "@/app/[lang]/(components)/(auth)/Loading";
import InputMask from "react-input-mask";
import PaymentForm from "./components/paymentForm";

interface PaymentMethodProps {
    metodoPagamento: boolean;
    setMetodoPagamento: Function;
    signup5: Signup5;
    isLoading: Function;
    loading: boolean;
    handleSignUp: Function;
    tipoPerfil: number | undefined;
}

export default function PaymentMethod({
    metodoPagamento,
    setMetodoPagamento,
    signup5,
    isLoading,
    loading,
    handleSignUp,
    tipoPerfil,
}: PaymentMethodProps) {
    return (
        <div className="absolute flex justify-center align-middle w-screen h-screen top-0 left-0">
            <div className="self-center w-10/12 md:w-8/12 lg:w-4/12 h-5/6 bg-white dark:bg-gray-900 rounded-2xl ring-1 ring-gray-800">
                <div className="w-full h-fit flex justify-end p-3">
                    <AiOutlineClose
                        className="text-3xl cursor-pointer"
                        onClick={() => setMetodoPagamento(!metodoPagamento)}
                    />
                </div>
                <div className=" px-4 py-2">
                    <p className="text-xl font-bold mb-2">
                        {signup5.subscriptionmessage0}
                    </p>
                    <a className="pr-2 py-4 text-3xl font-bold text-secundaria-100">
                        {signup5.freetier}
                    </a>
                    {tipoPerfil == 1 ? (
                        <a className="line-through text-current/25">{signup5.brokertier}</a>
                    ) : (
                        <a className="line-through text-current/25">{signup5.companytier}</a>
                    )}

                    <h1 className="md:mb-2">{signup5.subscriptionmessage3}</h1>
                    <PaymentForm
                    signup5={signup5}
                    isLoading={isLoading}
                    loading={loading}
                    handleSignUp={handleSignUp}
                    />
                </div>
            </div>
        </div>
    );
}
