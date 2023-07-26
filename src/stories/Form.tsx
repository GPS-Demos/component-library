import React, { useState } from "react"

import "./page.css"

interface FormProps {
  formType: string
  title: string
}

import FormGenerator from "../components/forms/FormGenerator"

import { TEST_NESTED_FORM_DATA, FORM_STEPS_TITLE } from "../utils/data"
import { initialFormikValues } from "../utils/forms"
import { classNames } from "../utils/dom"
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline"

export const Form: React.FC<FormProps> = ({ formType, title }) => {
  const initialFormData = initialFormikValues(TEST_NESTED_FORM_DATA)
  //const formValidationData = formValidationSchema(TEST_NESTED_FORM_DATA)
  const [progessValuePercent, setProgessValuePercent] = useState(0)
  const [progessStep, setProgessStep] = useState(0)

  const FORM_DATA_BY_TYPE = TEST_NESTED_FORM_DATA.filter(
    (SAMPLE_FORM_DATA) => SAMPLE_FORM_DATA.type === formType,
  )

  const handleCurrentStep = (currentStep: number) => {
    setProgessStep(currentStep)
  }

  const handleProgress = (progessValue: number) => {
    setProgessValuePercent(progessValue)
  }

  return (
    <div className="w-full min-h-screen justify-center p-4">
      {formType === "sample" && (
        <div className="flex gap-0 mb-4">
          {FORM_STEPS_TITLE.map((stepTitle: string, index: number) => (
            <a
              key={stepTitle}
              className={classNames(
                "w-full",
                progessStep === index ? "" : "border-b",
              )}
            >
              <span
                className={classNames(
                  "w-full flex justify-items-center items-center py-2 font-medium",
                  progessStep === index
                    ? "border-b-2 border-primary text-primary"
                    : "text-base-400",
                  index !== 0 ? "px-6" : "",
                )}
              >
                <CheckCircleIcon className="w-5 h-4" /> {stepTitle}
              </span>
            </a>
          ))}
        </div>
      )}
      <div
        className="w-full min-h-screen flex justify-center p-2 bg-base-300 rounded-lg"
        style={{ background: "rgba(232, 240, 254, 1)" }}
      >
        <div className="w-full sm:w-4/5 bg-base-100 px-8 py-4 rounded-md">
          <div className="flex justify-between border-b py-1 mb-4">
            <div className="text-md text-slate-500">
              {formType === "sample"
                ? `${FORM_STEPS_TITLE[progessStep]} Information`
                : title}
            </div>
            <div className="text-success">{progessValuePercent}%</div>
          </div>
          <div className="mx-auto flex w-full sm:w-11/12">
            {formType === "sample" && TEST_NESTED_FORM_DATA.length ? (
              <FormGenerator
                formVariables={TEST_NESTED_FORM_DATA}
                initialFormData={initialFormData}
                handleProgress={handleProgress}
                handleCurrentStep={handleCurrentStep}
              />
            ) : FORM_DATA_BY_TYPE.length ? (
              <FormGenerator
                formVariables={FORM_DATA_BY_TYPE}
                initialFormData={initialFormData}
                handleProgress={handleProgress}
                handleCurrentStep={handleCurrentStep}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="w-full sm:w-96 p-4">
          <div className="flex justify-between border-b py-1 items-center">
            <div className="text-md text-slate-500">Benefits Available</div>
            <ExclamationCircleIcon className="w-5 h-5" />
          </div>
          <p className="text-sm mt-2">
            Click the arrow to see the benifits that you can avail based on the
            information provided
          </p>
        </div>
      </div>
    </div>
  )
}
