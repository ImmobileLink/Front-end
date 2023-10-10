"use client";

import { NextResponse } from "next/server";
import { formataData, getCurrentDateTimeWithTimezone, isDateBeforeCurrent } from "../../../../../lib/utils";

interface ButtonProps {}

export default function Button({}: ButtonProps) {

  const handleSendEmail = async () => {

    try {
      const url = '/api/survey/';
      
      const requestBody = {
        clientEmail: 'luan14rodrigues17@gmail.com',
        clientName: 'Luan Guilherme Rodrigues',
        visitDate: '2023-10-05 19:18:00-03',
        surveyId: 'random_uuid_survey',
        scheduledDate: '2023-10-09 19:20:00-03',
      };
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }).then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        // Manipule os dados aqui, incluindo o acesso ao texto retornado
        console.log('Mensagem:', data.message);
      })
      .catch(error => {
        // Se ocorrer um erro durante a requisição
        console.error('Erro na requisição:', error.message);
      });
  
      // const responseData = await response.json();
      // console.log('Server response:', responseData);

    } catch (error) {

      console.error('Error sending email:', error);
    }
  }

  return (
    <>
      {formataData('2023-10-09 19:18:00-03')}
      <button onClick={handleSendEmail} className="bg-emerald-800 text-white  px-4 py-2 hover:bg-emerald-600 rounded-lg">Enviar email</button>
    </>
  );
}
