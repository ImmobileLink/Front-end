import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";
import { Link } from '@react-email/link';
import { Img } from '@react-email/img';
import { formataDataSemHora } from "lib/utils/formataData";

interface SurveyEmailProps {
  name: string,
  date: string,
  surveyId: string
}

export default function SurveyEmail({ name, date, surveyId }: SurveyEmailProps) {
  return (
    <>
      <Html>
        <Section className="bg-white">
          <Container className="text-start">
            <Img src="https://rmnjgueyvmqmccnzvfro.supabase.co/storage/v1/object/public/assets/icons/logo.png" alt="ImmobileLink logo" width="279" height="59"  />
            <Text className="text-3xl leading-5 font-bold text-[#484848]">Olá, <span className="font-bold">{name}</span>!</Text>
            <Text className="text-lg leading-4 text-[#484848]">Você foi convidado a responder uma pesquisa de satisfação referente a sua visita a um imóvel no dia <span className="font-bold">{formataDataSemHora(date)}</span>.</Text>
            <Text className="text-lg leading-4 text-[#484848]">Contamos com sua participação respondendo a nossa <Link className="font-bold" target="_blank" href={`http://immobilelink.vercel.app/pt/survey/${surveyId}`}>pesquisa de satisfação.</Link></Text>
          </Container>
        </Section>
      </Html>
    </>
  );
}