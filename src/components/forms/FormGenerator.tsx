import React, { useEffect, useState } from "react"
import { Formik, Form } from "formik"
import {
  IFormVariable,
  IFormData,
  IFormValidationData,
} from "../../utils/types"
import { groupVariables, formValidationSchema } from "../../utils/forms"
import FieldsCreator from "./FieldsCreator"
import { FORM_LABEL_DISPLAY_OPTIONS } from "../../utils/data"

interface IFormGeneratorProps {
  formVariables: IFormVariable[]
  initialFormData: IFormData
  //formValidationData: IFormValidationData
  handleProgress: Function
  handleCurrentStep: Function
}

type ITargetName = string
type ITargetValue = string | number | boolean
type ITarget = {
  target: { name: ITargetName; value: ITargetValue }
}

const FormGenerator: React.FC<IFormGeneratorProps> = ({
  formVariables,
  initialFormData,
  //formValidationData,
  handleProgress,
  handleCurrentStep,
}) => {
  // const navigate = useNavigate()
  // const { t } = useTranslation()
  const [step, setStep] = useState(0)
  //const [completed, setCompleted] = useState(false)
  const [changedTarget, setChangedTarget] = useState<ITarget | null>(null)
  const [showVars, setShowVars] = useState(0)
  const [currentVarsDataAppend, setCurrentVarsDataAppend] = useState<
    IFormVariable[]
  >([])
  const [formValues, setFormValues] = useState<IFormData>()
  const [countAppendDependent, setCountAppendDependent] = useState(0)

  const handleChange = (e: ITarget) => setChangedTarget(e)

  const groupedVariableList = groupVariables(formVariables)
  const currentVarsData = groupedVariableList[step + 1]

  const formValidationData: IFormValidationData = formValidationSchema(
    currentVarsDataAppend,
  )

  // Question append implementation
  const handleValueChange = (values: IFormData) => setFormValues(values)

  const allNonDependsElement = currentVarsData.filter(
    (currentVarData) => !currentVarData.choosenOption,
  )
  const allDependsElement = currentVarsData.filter(
    (currentVarData) => currentVarData.choosenOption,
  )

  const handleTargetValueChange = (
    targetName: ITargetName,
    targetValue: ITargetValue,
  ) => {
    formatAppendQuestion(targetName, targetValue)
  }

  const handleChangeInput = (e: ITarget) => {
    formatAppendQuestion(e.target.name, e.target.value)
  }

  const formatAppendQuestion = (
    targetName: ITargetName,
    targetValue: ITargetValue,
  ) => {
    if (!targetValue) {
      return null
    }

    if (
      currentVarsDataAppend.length <
      allNonDependsElement.length + countAppendDependent
    ) {
      const lastVarsAppend =
        currentVarsDataAppend[currentVarsDataAppend.length - 1]
      if (lastVarsAppend.name == targetName) {
        const findSameVars = allNonDependsElement.filter(
          (items) =>
            items.order ===
            allNonDependsElement[
              currentVarsDataAppend.length - countAppendDependent
            ].order,
        )
        findSameVars.forEach((findSameVar) => {
          currentVarsDataAppend.push(findSameVar)
          setShowVars(showVars + 1)
        })
      }
    } else if (
      currentVarsDataAppend.length ===
      allNonDependsElement.length + countAppendDependent
    ) {
      const lastVarsValue =
        formValues !== undefined
          ? formValues[
              allNonDependsElement[allNonDependsElement.length - 1].name
            ]
          : null
      if (lastVarsValue) {
        setShowVars(currentVarsDataAppend.length)
      }
    }
  }

  const changedValueSelect = (changedValueElement: ITarget) => {
    if (changedValueElement) {
      const changedValueItem = currentVarsDataAppend.find(
        (selectedItem) => selectedItem.name === changedValueElement.target.name,
      )
      const findDependentElement = allDependsElement.find(
        (dependsElement) =>
          dependsElement.choosenOption == changedValueElement.target.value,
      )
      const checkDependentElementExist = currentVarsDataAppend.find(
        (dependsElementExist) =>
          dependsElementExist.choosenOption == changedValueElement.target.value,
      )
      const newAppendFilter = currentVarsDataAppend.filter(
        (item) => item.primaryId != changedValueItem?.questionId,
      )
      if (checkDependentElementExist) {
        setCurrentVarsDataAppend(newAppendFilter)
      } else if (findDependentElement && !checkDependentElementExist) {
        newAppendFilter.push(findDependentElement)
        setCurrentVarsDataAppend(newAppendFilter)
        setCountAppendDependent(countAppendDependent + 1)
        setShowVars(newAppendFilter.length - 1)
        setChangedTarget(null)
      } else {
        formatAppendQuestion(
          changedValueElement.target.name,
          changedValueElement.target.value,
        )
      }
    }
  }

  useEffect(() => {
    if (changedTarget) {
      changedValueSelect(changedTarget)
    }
  }, [changedTarget])

  useEffect(() => {
    setShowVars(0)
    setCountAppendDependent(0)
    handleCurrentStep(step)
    const firstLoadVars = allNonDependsElement.filter(
      (items) => items.order === allNonDependsElement[0].order,
    )
    setCurrentVarsDataAppend(firstLoadVars)
  }, [allNonDependsElement.length, step])

  const stepPercentage = Math.round(
    (currentVarsDataAppend.length /
      (allNonDependsElement.length + countAppendDependent)) *
      100,
  )

  useEffect(() => {
    handleProgress(stepPercentage)
  }, [stepPercentage])

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
      //Here values form submitted data
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
            validationSchema={formValidationData}
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
                    handleChangeInput={handleChangeInput}
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
                        {FORM_LABEL_DISPLAY_OPTIONS.prevDisplay}
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-outline btn-primary w-32"
                        disabled={isSubmitting}
                      >
                        {FORM_LABEL_DISPLAY_OPTIONS.cancelDisplay}
                      </button>
                    )}
                    <button
                      type="submit"
                      className="btn btn-primary float-right w-32"
                      disabled={!isValid || isSubmitting}
                    >
                      {isSubmitting
                        ? FORM_LABEL_DISPLAY_OPTIONS.submitLoadingDisplay
                        : isLastStep()
                        ? FORM_LABEL_DISPLAY_OPTIONS.submitDisplay
                        : FORM_LABEL_DISPLAY_OPTIONS.nextDisplay}
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
