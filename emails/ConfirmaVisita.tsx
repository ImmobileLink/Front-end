import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";
import { Link } from '@react-email/link';
import { Img } from '@react-email/img';
import { formataDataSemHora } from "lib/utils/formataData";

interface ConfirmaVisitaProps {
  name: string,
  date: string,
  corretorName: string,
  empresaName: string,
  rua: string,
  numero: string,
}

export default function ConfirmaVisita({ name, date, corretorName, empresaName, rua, numero }: ConfirmaVisitaProps) {
  return (
    <>
      <Html>
        <Section className="bg-white">
          <Container className="text-start">
            <Img src="https://rmnjgueyvmqmccnzvfro.supabase.co/storage/v1/object/public/assets/icons/logo.png" alt="ImmobileLink logo" width="279" height="59"  />
            <Text className="text-3xl leading-5 font-bold text-[#484848]">Olá, <span className="font-bold">{name}</span>!</Text>
            <Text className="text-lg leading-4 text-[#484848]">Você agendada uma visita em um imóvel da imobiliária {empresaName} <span className="font-bold">{formataDataSemHora(date)}</span>.</Text>
            <Text className="text-lg leading-4 text-[#484848]">O corretor {corretorName} irá te guiar nessa visita <span className="font-bold">{formataDataSemHora(date)}</span>.</Text>
            <Text className="text-lg leading-4 text-[#484848]">Endereço: Rua {rua}, {numero} <span className="font-bold">{formataDataSemHora(date)}</span>.</Text>
            <br />
            <Text className="text-lg leading-4 text-[#484848]">Estaremos te aguardando na data: {date}<span className="font-bold">{formataDataSemHora(date)}</span>.</Text>

          </Container>
        </Section>
      </Html>
    </>
  );
}