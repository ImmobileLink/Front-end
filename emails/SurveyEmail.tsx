import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";
import { Link } from "@react-email/link";
import { Img } from "@react-email/img";
import { formataDataSemHora } from "lib/utils/formataData";

interface SurveyEmailProps {
    name: string;
    date: string;
    surveyId: string;
}

export default function SurveyEmail({
    name,
    date,
    surveyId,
}: SurveyEmailProps) {
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
                            Você foi convidado(a) a responder a pesquisa de
                            satisfação referente a sua visita a um imóvel no dia{" "}
                            <span className="font-bold">
                                {formataDataSemHora(date)}
                            </span>
                            . Pesquisas de Satisfação são importantes, pois nos
                            ajudam a entender sua experiência visitando um
                            imóvel por corretores parceiros de nossa plataforma,
                            além de ajudar a avaliar a qualidade do serviço
                            oferecido por eles.
                        </Text>
                        <Text className="text-lg leading-4 text-[#484848]">
                            Contamos com sua participação respondendo a nossa
                            pesquisa pelo link, e agradecemos sua paciência!{" "}
                        </Text>
                        <br />
                        <Link
                            className="font-bold text-orange-500"
                            target="_blank"
                            href={`http://immobilelink.vercel.app/pt/survey/${surveyId}`}
                        >
                            Responder pesquisa de satisfação.
                        </Link>
                        <br/><br/><br/>
                        <Text>Em caso de dúvidas, por favor entre em contato com <a className="text-orange-500" >immobilelink1@gmail.com</a></Text>
                        <br/>
                        <b>Ficamos à disposição. Um excelente dia!</b>
                    </Container>
                </Section>
            </Html>
        </>
    );
}
