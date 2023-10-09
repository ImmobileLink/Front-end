import type { NextApiResponse } from "next";
import { render } from "@react-email/render";
import SurveyEmail from "../../../../emails/SurveyEmail";
import { sendEmail } from "../../../../lib/emails";
import { NextResponse } from "next/server";


export async function POST(req: Request, res: NextApiResponse) {
  try {
    const { email, name, date, surveyId } = await req.json();

    const data = await sendEmail({
      to: email,
      subject: "ImmobileLink Brasil - Pesquisa de Satisfação",
      html: render(SurveyEmail({ name: name, date: date, surveyId: surveyId })),
    });
    
    return NextResponse.json({ status: "200", message: 'Email sent successfully', data: data, res });
  } catch (error) {
    return NextResponse.json({ status: "500", message: 'Error sending email', error: error, res});
  }
}
