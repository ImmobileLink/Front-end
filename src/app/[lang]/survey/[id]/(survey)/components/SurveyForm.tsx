"use client";

import RadioSelector from "@/app/[lang]/(components)/(survey)/RadioSelector";
import { Survey } from "@/app/i18n/dictionaries/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ChangeEvent, FormEvent, useState } from "react";
import { Database } from "../../../../../../../lib/database.types";
import { useRouter } from "next/navigation";
import { Spinner } from "flowbite-react";
import { verifyFields } from "./validations";

interface SurveyFormProps {
  survey: Survey;
  id: string
}

interface FormDataProps {
  campo1: number | null,
  campo2: number | null,
  campo3: number | null,
  campo4: number | null,
  campo5: number | null,
  campo6: number | null,
  campo7: number | null,
  campo8: number | null,
  campo9: number | null,
  campo10: string,
}


const supabase = createClientComponentClient<Database>()

export default function SurveyForm({ survey, id }: SurveyFormProps) {
  const route = useRouter()
  const [loading, setLoading] = useState(false);

  const [disabled, setDisabled] = useState(true);

  const [error, setError] = useState(false);

  const [formData, setFormData] = useState<FormDataProps>({
    campo1: null,
    campo2: null,
    campo3: null,
    campo4: null,
    campo5: null,
    campo6: null,
    campo7: null,
    campo8: null,
    campo9: null,
    campo10: ""
  });

  const validaForm = (formData: FormDataProps) => {
    if (
      formData.campo1 === null ||
      formData.campo2 === null ||
      formData.campo3 === null ||
      formData.campo4 === null ||
      formData.campo5 === null ||
      formData.campo6 === null ||
      formData.campo7 === null ||
      formData.campo8 === null
    ) {
      return true;
    } else {
      return false
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: parseInt(e.target.value),
    });

    setDisabled(validaForm(formData));
    setError(false);

    console.log(formData)
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(!validaForm(formData)) {

      setLoading(true);
      const { data } = await supabase.from("resultadoformulario").update(
        {
          campo1: formData.campo1,
          campo2: formData.campo2,
          campo3: formData.campo3,
          campo4: formData.campo4,
          campo5: formData.campo5,
          campo6: formData.campo6,
          campo7: formData.campo7,
          campo8: formData.campo8,
          campo9: formData.campo9,
          campo10: formData.campo10,
          status: true
        }
        ).eq("id", id)
        
      setLoading(false);
      route.refresh();

    } else {
      setError(true);
    }
  }

  return (
    <>
      <form onSubmit={e => handleSubmit(e)}>
        <RadioSelector
          params={{
            lang: survey,
            pergunta: survey.questions.question1,
            optional: false,
            inputName: "campo1"
          }}
          onChange={handleChange}
        />
        <RadioSelector
          params={{
            lang: survey,
            pergunta: survey.questions.question2,
            optional: false,
            inputName: "campo2"
          }}
          onChange={handleChange}
        />
        <RadioSelector
          params={{
            lang: survey,
            pergunta: survey.questions.question3,
            optional: false,
            inputName: "campo3"
          }}
          onChange={handleChange}
        />
        <RadioSelector
          params={{
            lang: survey,
            pergunta: survey.questions.question4,
            optional: false,
            inputName: "campo4"
          }}
          onChange={handleChange}
        />
        <RadioSelector
          params={{
            lang: survey,
            pergunta: survey.questions.question5,
            optional: false,
            inputName: "campo5"
          }}
          onChange={handleChange}
        />
        <RadioSelector
          params={{
            lang: survey,
            pergunta: survey.questions.question6,
            optional: false,
            inputName: "campo6"
          }}
          onChange={handleChange}
        />
        <RadioSelector
          params={{
            lang: survey,
            pergunta: survey.questions.question7,
            optional: false,
            inputName: "campo7"
          }}
          onChange={handleChange}
        />
        <RadioSelector
          params={{
            lang: survey,
            pergunta: survey.questions.question8,
            optional: false,
            inputName: "campo8"
          }}
          onChange={handleChange}
        />
        <RadioSelector
          params={{
            lang: survey,
            pergunta: survey.questions.question9,
            optional: true,
            inputName: "campo9"
          }}
          onChange={handleChange}
        />

        <div className="my-4">
          <label className="py-2">
            {survey.questions.question10}
          </label>
          <br />
          <textarea
            className="bg-branco dark:bg-dark-200 rounded h-36 md:h-16 w-full py-2 px-2"
            id="op-comentario"
            name="campo10"
            value={formData.campo10}
            onChange={e => { setFormData(prev => ({ ...prev, campo10: e.target.value })) }}
          />
        </div>
        <div className="flex justify-end items-center mb-3">
          <span className="text-red-500 text-sm mr-4">{error && survey.insertavalue }</span>
          <button
            // onClick={submitForm}
            type="submit"
            // disabled={disabled}
            className="flex justify-center rounded-md bg-secundaria-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm disabled:cursor-not-allowed hover:bg-secundaria-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secundaria-200"
          >
            {/* <Loading loading={loading} /> */}
            {loading && <Spinner className="mr-2" />}
            {survey.finish}
          </button>
        </div>
      </form>
    </>
  );
}