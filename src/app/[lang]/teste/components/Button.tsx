"use client";

interface ButtonProps {}

export default function Button({}: ButtonProps) {

  const handleSendEmail = async () => {
    try {
      const url = '/api/survey/';
      
      const requestBody = {
        email: 'luan14rodrigues17@gmail.com',
        name: 'Luan Guilherme Rodrigues',
        date: '09/10/2023',
        surveyId: '712346238746923784'
      };
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log('Server response:', responseData);
      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email. Please try again later.');
    }
  }

  return (
    <>
      <button onClick={handleSendEmail} className="bg-emerald-800 text-white  px-4 py-2 hover:bg-emerald-600 rounded-lg">Enviar email</button>
    </>
  );
}
