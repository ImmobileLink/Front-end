import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";
import { Link } from "@react-email/link";
import { Img } from "@react-email/img";
import { formataData, formataDataSemHora } from "lib/utils/formataData";

interface ConfirmaVisitaProps {
    name: string;
    date: string;
    corretorName: string;
    empresaName: string;
    rua: string;
    numero: string;
}

export default function ConfirmaVisita({
    name,
    date,
    corretorName,
    empresaName,
    rua,
    numero,
}: ConfirmaVisitaProps) {
    return (
        <>
            <Html>
                <Section className="bg-white">
                    <Container className="text-start">
                        <Img
                            src="https://rmnjgueyvmqmccnzvfro.supabase.co/storage/v1/object/public/assets/icons/logo.png"
                            alt="ImmobileLink logo"
                            width="279"
                            height="59"
                        />
                        <Text className="text-3xl leading-5 font-bold text-[#484848]">
                            Olá, <span className="font-bold">{name}</span>!
                        </Text>
                        <Text className="text-lg leading-4 text-[#484848]">
                            Uma visita a um imóvel da imobiliária {empresaName}{" "}
                            foi agendada para você! Para que a visita aconteça
                            de forma tranquila, pedimos que confirme sua
                            presença e compareça ao local indicado com até 15
                            minutos de antecedência.
                            <br />
                            Abaixo, seguem as informações da sua visita:
                        </Text>
                        <Text className="text-lg leading-4 text-[#484848]">
                            <b>Corretor responsável pela visita: </b>{" "}
                            {corretorName}
                        </Text>
                        <br />
                        <Text className="text-lg leading-4 text-[#484848]">
                            <b>Endereço:</b> {rua}, {numero}.
                        </Text>
                        <br />
                        <Text className="text-lg leading-4 text-[#484848]">
                            <b>Data da visita:</b>{" "}
                            <span className="font-bold">
                                {formataData(date)}
                            </span>
                            .
                        </Text>
                        <Text>
                            Em caso de dúvidas, por favor entre em contato com{" "}
                            <a className="text-orange-500">
                                immobilelink1@gmail.com
                            </a>
                        </Text>
                        <br />
                        <b>Ficamos à disposição. Um excelente dia!</b>
                    </Container>
                </Section>
            </Html>
        </>
    );
}
