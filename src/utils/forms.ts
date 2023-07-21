import groupBy from "lodash/groupBy"
import { IFormVariable, IFormValidationData } from "../utils/types"
import * as yup from "yup"
import startCase from "lodash/startCase"

export const groupVariables = (variableList: IFormVariable[]) =>
  groupBy(variableList, "group")

export const groupByOrderVariables = (variableList: IFormVariable[]) =>
  groupBy(variableList, "order")

export const initialFormikValues = (variableList: IFormVariable[]) => {
  let initialFormData = variableList.reduce((formatDefault, formVarsdata) => {
    const defaultValue = formVarsdata.default !== "" ? formVarsdata.default : ""
    return { ...formatDefault, [formVarsdata.name]: defaultValue }
  }, {})

  return initialFormData
}

export const fileNameByPath = (filePath: string) => {
  if (filePath) {
    const fileNameArr = filePath.split("/")
    const fileName = fileNameArr[fileNameArr.length - 1]
    return fileName
  } else {
    return null
  }
}

export const formValidationSchema = (variableList: IFormVariable[]) => {
  let formValidationData: IFormValidationData = {}

  variableList.forEach((variable) => {
    variable.required
      ? (formValidationData[variable.name] =
          variable.validations === "email"
            ? yup
                .string()
                .email(`${startCase(variable.question)} must be a valid email`)
                .required(
                  `A value for ${startCase(variable.question)} is required`,
                )
            : yup
                .string()
                .min(4, "Too Short!")
                .max(
                  formValidationData[variable.type] === "string" ? 20 : 180,
                  "Too Long!",
                )
                .required(
                  `A value for ${startCase(variable.question)} is required`,
                ))
      : {}
  })

  const formValidationResult = yup.object().shape(formValidationData)

  return formValidationResult
}
