import React, { useEffect, useState } from "react"
import { Formik, Form } from "formik"
import {
  IFormVariable,
  IFormData,
  IFormValidationData,
} from "../../utils/types"
import { groupVariables } from "../../utils/forms"
import FieldsCreator from "./FieldsCreator"

interface IFormGeneratorProps {
  formVariables: IFormVariable[]
  initialFormData: IFormData
  formValidationData: IFormValidationData
  handleProgress: Function
  handleCurrentStep: Function
}

const FormGenerator: React.FC<IFormGeneratorProps> = ({
  formVariables,
  initialFormData,
  handleProgress,
  handleCurrentStep,
}) => {
  // const navigate = useNavigate()
  // const { t } = useTranslation()
  const [step, setStep] = useState(0)
  //const [completed, setCompleted] = useState(false)
  const [changedTarget, setChangedTarget] = useState(null)
  const [showVars, setShowVars] = useState(0)
  const [currentVarsDataAppend, setCurrentVarsDataAppend] = useState<
    IFormVariable[]
  >([])
  const [formValues, setFormValues] = useState<IFormData>()

  const handleChange = (e: any) => {
    console.log("selectedValue", e)
    setChangedTarget(e)
  }

  const groupedVariableList = groupVariables(formVariables)
  const currentVarsData = groupedVariableList[step + 1]

  // Question append implementation
  const handleValueChange = (values: IFormData) => {
    setFormValues(values)
  }
  const allNonDependsElement = currentVarsData.filter(
    (currentVarData) => !currentVarData.choosenOption,
  )
  const allDependsElement = currentVarsData.filter(
    (currentVarData) => currentVarData.choosenOption,
  )

  const handleTargetValueChange = (targetName: any, targetValue: any) => {
    formatAppendQuestion(targetName, targetValue)
  }

  const handleBlur = (e: any) => {
    formatAppendQuestion(e.target.name, e.target.value)
  }

  const formatAppendQuestion = (targetName: any, targetValue: any) => {
    if (targetValue) {
      if (currentVarsDataAppend.length < allNonDependsElement.length) {
        const lastVarsAppend =
          currentVarsDataAppend[currentVarsDataAppend.length - 1]
        if (lastVarsAppend.questionId == targetName) {
          const findSameVars = allNonDependsElement.filter(
            (items) =>
              items.order ===
              allNonDependsElement[currentVarsDataAppend.length].order,
          )
          findSameVars.forEach((findSameVar) => {
            currentVarsDataAppend.push(findSameVar)
            setShowVars(showVars + 1)
          })
        }
      } else if (currentVarsDataAppend.length === allNonDependsElement.length) {
        const lastVarsValue =
          formValues !== undefined
            ? formValues[
                allNonDependsElement[allNonDependsElement.length - 1].questionId
              ]
            : null
        if (lastVarsValue) {
          setShowVars(currentVarsDataAppend.length)
        }
      }
    }
  }

  const changedValueSelect = (changedValueElement: any) => {
    if (changedValueElement) {
      const findDependentElement = allDependsElement.find(
        (dependsElement) =>
          dependsElement.choosenOption == changedValueElement.target.value,
      )
      const checkDependentElementExist = currentVarsDataAppend.find(
        (dependsElementExist) =>
          dependsElementExist.choosenOption == changedValueElement.target.value,
      )
      const newAppendFilter = currentVarsDataAppend.filter(
        (item) => item.primaryId != changedValueElement.target.name,
      )
      setCurrentVarsDataAppend(newAppendFilter)
      if (findDependentElement && !checkDependentElementExist) {
        newAppendFilter.push(findDependentElement)
        setCurrentVarsDataAppend(newAppendFilter)

        setShowVars(newAppendFilter.length - 1)
        setChangedTarget(null)
      } else if (currentVarsDataAppend.length === allNonDependsElement.length) {
        const lastVarsValue =
          formValues !== undefined
            ? formValues[
                allNonDependsElement[allNonDependsElement.length - 1].questionId
              ]
            : null
        if (lastVarsValue) {
          setShowVars(currentVarsDataAppend.length)
        }
      }
    }
  }

  // const formValidationData: IFormValidationData = formValidationSchema(
  //   currentVarsDataAppend,
  // )

  useEffect(() => {
    changedValueSelect(changedTarget)
  }, [changedTarget])

  useEffect(() => {
    setShowVars(0)
    const firstLoadVars = allNonDependsElement.filter(
      (items) => items.order === allNonDependsElement[0].order,
    )
    setCurrentVarsDataAppend(firstLoadVars)
  }, [allNonDependsElement.length, step])

  handleCurrentStep(step)

  const stepPercentage = Math.round(
    (showVars / allNonDependsElement.length) * 100,
  )

  handleProgress(stepPercentage)

  function isLastStep() {
    return step === Object.keys(groupedVariableList).length - 1
  }

  const goBack = () => {
    setStep((s) => s - 1)
  }

  const onSubmit = async (values: IFormData, action: any) => {
    action.setSubmitting(false)
    window.scrollTo(0, 0)
    if (isLastStep()) {
      // API Call
      console.log(values)
    } else {
      setStep((s) => s + 1)

      action.setTouched({})
    }
  }

  return (
    <div className="w-full">
      {currentVarsDataAppend && (
        <>
          <Formik
            initialValues={initialFormData}
            enableReinitialize={true}
            //validationSchema={formValidationData}
            onSubmit={async (values, action) => {
              await onSubmit(values, action)
            }}
            validateOnMount
          >
            {({ isSubmitting, isValid }) => (
              <Form autoComplete="on">
                {currentVarsDataAppend ? (
                  <FieldsCreator
                    variableList={currentVarsDataAppend}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    handleValueChange={handleValueChange}
                    handleTargetValueChange={handleTargetValueChange}
                  />
                ) : (
                  <></>
                )}
                {stepPercentage === 100 && (
                  <div className="flex-row justify-center gap-x-4">
                    {step > 0 ? (
                      <button
                        type="button"
                        className="btn btn-outline btn-primary w-32"
                        disabled={isSubmitting}
                        onClick={goBack}
                      >
                        previous
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-outline btn-primary w-32"
                        disabled={isSubmitting}
                      >
                        cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      className="btn btn-primary float-right w-32"
                      disabled={!isValid || isSubmitting}
                    >
                      {isSubmitting
                        ? "submitting"
                        : isLastStep()
                        ? "submit"
                        : "next"}
                    </button>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </>
      )}
    </div>
  )
}

export default FormGenerator
