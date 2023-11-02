import { render } from "@react-email/render";
import SurveyEmail from "../../../../emails/SurveyEmail";
import { sendEmail } from "../../../../lib/utils/emails";
import { NextResponse } from "next/server";
import scheduleJob from "../../../../lib/utils/scheduleJob";
import { isDateBeforeCurrent } from "../../../../lib/utils/formataData";

export async function POST(req: Request) {
  try {
    const { clientEmail, clientName, visitDate, surveyId, scheduledDate } = await req.json();

    if (isDateBeforeCurrent(scheduledDate)) {
      return new NextResponse('Invalid Date: The scheduledDate date cannot be before the current date',
        {
          status: 500,
          statusText: 'Invalid Date'
        })
    }

    if (!isDateBeforeCurrent(visitDate)) {
      return new NextResponse('Invalid Date: The visitDate date must be before the current date',
        {
          status: 500,
          statusText: 'Invalid Date'
        })
    }

    const emailFunction = async () => {
      const data = await sendEmail({
        to: clientEmail,
        subject: "ImmobileLink Brasil - Pesquisa de Satisfação",
        html: render(SurveyEmail({ name: clientName, date: visitDate, surveyId: surveyId })),
      });
    }

    scheduleJob(scheduledDate, emailFunction);

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
