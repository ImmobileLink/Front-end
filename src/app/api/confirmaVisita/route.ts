import { render } from "@react-email/render";
import { NextResponse } from "next/server";
import ConfirmaVisita from "emails/ConfirmaVisita";
import sendEmail from "lib/utils/emails";

export async function POST(req: Request) {
  try {
    const { clientEmail,corretorName,empresaName, clientName, visitDate, scheduledDate, rua, numero } = await req.json();

    const response = await sendEmail({
      subject: "ImmobileLink Brasil - Pesquisa de Satisfação",
      html: render(ConfirmaVisita({ name: clientName, date: visitDate, corretorName: corretorName, empresaName: empresaName, rua: rua, numero: numero })),
      to: clientEmail,
    });

    // const emailFunction = async () => {
    //   const data = await sendEmail({
    //     to: clientEmail,
    //     subject: "ImmobileLink Brasil - Pesquisa de Satisfação",
    //     html: render(ConfirmaVisita({ name: clientName, date: visitDate, corretorName: corretorName, empresaName: empresaName, rua: rua, numero: numero })),
    //   });
    // }

    // scheduleJob(scheduledDate, emailFunction);

    return new NextResponse(JSON.stringify({message: 'Email scheduled successfully'}),
      {
        status: 200,
        statusText: 'OK'
      })


  } catch (error) {

    return new NextResponse('There was an error sending email, please try again later',
      {
        status: 500,
        statusText: 'Internal Server Error'
      })

  }
}
