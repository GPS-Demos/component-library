import React, { useEffect, useState } from "react"
import {
  Form,
  useFormik,
  FormikProvider,
  FormikValues,
  FormikHelpers,
} from "formik"
import { IFormVariable, IFormData, IFormValidationData } from "@/utils/types"
import { groupVariables, formValidationSchema } from "@/utils/forms"
import FieldsCreator from "@/components/forms/FieldsCreator"

interface IFormGeneratorProps {
  formVariables: IFormVariable[]
  initialFormData: IFormData
  //formValidationData: IFormValidationData
  handleProgress: Function
  handleCurrentStep: Function
  submit: string
  next: string
  previous: string
  cancel: string
  submitting: string
  formType: unknown
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
  submit,
  next,
  previous,
  cancel,
  submitting,
  formType,
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
  const currentVarsData =
    groupedVariableList[Object.keys(groupedVariableList)[step]]

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
      (item) => item.primaryId != changedValueItem?.name,
    )
    if (checkDependentElementExist) {
      setCurrentVarsDataAppend(newAppendFilter)
    } else if (findDependentElement && !checkDependentElementExist) {
      newAppendFilter.push(findDependentElement)
      setCurrentVarsDataAppend(newAppendFilter)
      setShowVars(newAppendFilter.length - 1)
      setChangedTarget(null)
    } else {
      formatAppendQuestion(
        changedValueElement.target.name,
        changedValueElement.target.value,
      )
    }
  }

  useEffect(() => {
    if (changedTarget) {
      changedValueSelect(changedTarget)
    }
  }, [changedTarget])

  useEffect(() => {
    const countAppendDependentHas = currentVarsDataAppend.filter(
      (appendItems) => appendItems.hasOwnProperty("primaryId"),
    )
    setCountAppendDependent(countAppendDependentHas.length)
  }, [currentVarsDataAppend])

  useEffect(() => {
    setShowVars(0)
    setCountAppendDependent(0)
    handleCurrentStep(step)
    const firstLoadVars = allNonDependsElement.filter(
      (items) => items.order === allNonDependsElement[0].order,
    )
    if (formType === "sample") {
      setCurrentVarsDataAppend(firstLoadVars)
    } else {
      setCurrentVarsDataAppend(allNonDependsElement)
    }
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

  const onSubmit = async (
    values: FormikValues,
    action: FormikHelpers<FormikValues>,
  ) => {
    action.setSubmitting(false)
    window.scrollTo(0, 0)
    if (isLastStep()) {
      //Here goes form submit functionalities
      console.log(values)
    } else {
      setStep((s) => s + 1)

      action.setTouched({})
    }
  }

  const formik = useFormik({
    initialValues: initialFormData,
    enableReinitialize: true,
    validateOnMount: true,
    validationSchema: formValidationData,
    onSubmit: async (values, action) => {
      await onSubmit(values, action)
    },
  })

  return (
    <div className="w-full">
      {currentVarsDataAppend && (
        <>
          <FormikProvider value={formik}>
            <Form autoComplete="on">
              {currentVarsDataAppend ? (
                <FieldsCreator
                  variableList={currentVarsDataAppend}
                  handleChange={handleChange}
                  handleChangeInput={handleChangeInput}
                  handleValueChange={handleValueChange}
                  handleTargetValueChange={handleTargetValueChange}
                  formikProps={formik}
                  formType={formType}
                />
              ) : (
                <></>
              )}
              {stepPercentage === 100 && formType === "sample" && (
                <div className="flex-row justify-center gap-x-4">
                  {step > 0 ? (
                    <button
                      type="button"
                      className="btn btn-outline btn-primary w-32"
                      disabled={formik.isSubmitting}
                      onClick={goBack}
                    >
                      {previous}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-outline btn-primary w-32"
                      disabled={formik.isSubmitting}
                    >
                      {cancel}
                    </button>
                  )}
                  <button
                    type="submit"
                    className="btn btn-primary text-base-100 float-right w-32"
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    {formik.isSubmitting
                      ? submitting
                      : isLastStep()
                      ? submit
                      : next}
                  </button>
                </div>
              )}
            </Form>
          </FormikProvider>
        </>
      )}
    </div>
  )
}

export default FormGenerator
