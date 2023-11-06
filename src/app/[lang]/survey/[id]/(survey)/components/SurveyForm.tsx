"use client";

import RadioSelector from "@/app/[lang]/(components)/(survey)/RadioSelector";
import { Survey } from "@/app/i18n/dictionaries/types";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "flowbite-react";
import { FormDataProps } from "lib/modelos";
import { clientSupabase } from "lib/utils/clientSupabase";
import { updateForm } from "../../surveyConfig";

interface SurveyFormProps {
  survey: Survey;
  id: string
}

// const supabase = createClientComponentClient<Database>()
const supabase = clientSupabase();

export default function SurveyForm({ survey, id }: SurveyFormProps) {
  const route = useRouter()
  const [loading, setLoading] = useState(false);

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
    setError(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!validaForm(formData)) {
      setLoading(true);
      await updateForm(supabase, formData, id);
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
            inputName: "campo7",
            leftLabel: survey.labels.notinterested,
            rightLabel: survey.labels.interested
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
            inputName: "campo9",
            leftLabel: survey.labels.notinfluence,
            rightLabel: survey.labels.influence
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