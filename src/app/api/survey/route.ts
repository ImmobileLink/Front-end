import type { NextApiResponse } from "next";
import { render } from "@react-email/render";
import SurveyEmail from "../../../../emails/SurveyEmail";
import { sendEmail } from "../../../../lib/emails";
import { NextResponse } from "next/server";
import scheduleJob from "../../../../lib/utils/scheduleJob";
import { getCurrentDateTimeWithTimezone, isDateBeforeCurrent } from "../../../../lib/utils";

export async function POST(req: Request, res: NextApiResponse) {
  try {
    //pega todos os items que foram passados no body 
    const { clientEmail, clientName, visitDate, surveyId, scheduledDate } = await req.json();

    if(isDateBeforeCurrent(scheduledDate, getCurrentDateTimeWithTimezone())) {
      return new Response("Invalid Date: The scheduledDate date cannot be before the current date", 
      { 
        status: 500,
      })
    }
    
    const emailFunction = async () => {
      const data = await sendEmail({
        to: clientEmail,
        subject: "ImmobileLink Brasil - Pesquisa de Satisfação",
        html: render(SurveyEmail({ name: clientName, date: visitDate, surveyId: surveyId })),
      });

      return NextResponse.json({
        "status": 200,
        "message": "Email sent successfully",
        "data": data
      })
    }

    const job = scheduleJob(scheduledDate, emailFunction)
    
  } catch (error) {
    return NextResponse.json({
      "status": 500,
      "message": "Internal Error: Error sending email",
    })
  }
}
