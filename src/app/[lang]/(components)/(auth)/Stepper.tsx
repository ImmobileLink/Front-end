import { BsCheckCircleFill, BsCheckCircle } from "react-icons/bs";
import { Stepper } from "@/app/i18n/dictionaries/types";

interface StepperProps {
  atual: number;
  stepper: Stepper;
}

export default function Stepper({ atual, stepper }: StepperProps) {
  return (
    <div>
      <ol className="flex items-center w-4/5 ml-4 text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
        {atual >= 1 ? (
          <li className="flex md:w-full items-center text-secundaria-200 dark:text-secundaria-100 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
            <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              <BsCheckCircleFill className="text-3xl mr-2" />
              {stepper.label1}
            </span>
          </li>
        ) : (
          <li className="flex md:w-full items-center text-gray-600 dark:text-gray-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
            <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              <BsCheckCircle className="text-3xl mr-2" />
              {stepper.label1}
            </span>
          </li>
        )}
        {atual >= 2 ? (
          <li className="flex md:w-full items-center text-secundaria-200 dark:text-secundaria-100 after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
            <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              <BsCheckCircleFill className="text-3xl mr-2" />
              {stepper.label2}
            </span>
          </li>
        ) : (
          <li className="flex md:w-full items-center text-gray-600 dark:text-gray-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
            <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              <BsCheckCircle className="text-3xl mr-2" />
              {stepper.label2}
            </span>
          </li>
        )}
        {atual >= 3 ? (
          <li className="flex md:w-full items-center text-secundaria-200 dark:text-secundaria-100 after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
            <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              <BsCheckCircleFill className="text-3xl mr-2" />
              {stepper.label3}
            </span>
          </li>
        ) : (
          <li className="flex md:w-full items-center text-gray-600 dark:text-gray-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
            <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              <BsCheckCircle className="text-3xl mr-2" />
              {stepper.label3}
            </span>
          </li>
        )}
        {atual >= 4 ? (
          <li className="flex md:w-full items-center text-secundaria-200 dark:text-secundaria-100 after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
            <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              <BsCheckCircleFill className="text-3xl mr-2" />
              {stepper.label4}
            </span>
          </li>
        ) : (
          <li className="flex md:w-full items-center text-gray-600 dark:text-gray-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
            <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              <BsCheckCircle className="text-3xl mr-2" />
              {stepper.label4}
            </span>
          </li>
        )}
        {atual >= 5 ? (
          <li className="flex items-center text-secundaria-200 dark:text-secundaria-100">
            <span className="flex items-center">
              <BsCheckCircleFill className="text-3xl mr-2" />
              {stepper.label5}
            </span>
          </li>
        ) : (
          <li className="flex items-center text-gray-600 dark:text-gray-500">
            <span className="flex items-center">
              <BsCheckCircle className="text-3xl mr-2" />
              {stepper.label5}
            </span>
          </li>
        )}
      </ol>
    </div>
  );
}
