import sortBy from "lodash/sortBy"

import { IFormVariable } from "../../utils/types"
import { groupByOrderVariables } from "../../utils/forms"

import StringField from "./fields/StringField"
// import NumberField from "./fields/NumberField"
import BooleanField from "./fields/BooleanField"
import SelectField from "./fields/SelectField"
// import ListField from "./fields/ListField"
//import FilesField from "./fields/FilesField"
import RadioField from "./fields/RadioField"
import DateField from "./fields/DateField"

import { useFormikContext, FormikValues } from "formik"
import { useEffect, useState } from "react"

interface FieldsCreatorProps {
  variableList: IFormVariable[]
  handleChange: Function
  handleChangeInput: Function
  handleValueChange: Function
  handleTargetValueChange: Function
}

const FieldsCreator: React.FC<FieldsCreatorProps> = ({
  variableList,
  handleChange,
  handleChangeInput,
  handleValueChange,
  handleTargetValueChange,
}) => {
  const sortedList = sortBy(variableList, "order")
  const groupSortedList = groupByOrderVariables(sortedList)

  const { values, setFieldValue } = useFormikContext<FormikValues>()
  const [timer, setTimer] = useState<NodeJS.Timeout>()

  const timeoutTime: number = 1000

  const onChangeHandle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(e.target.name, e.target.value)

    clearTimeout(timer)
    if (e.target.value) {
      const changeTimer = setTimeout(() => {
        handleChangeInput(e)
      }, timeoutTime)
      setTimer(changeTimer)
    }
  }

  const handleChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFieldValue(e.target.name, e.target.value)
    handleChange(e)
  }

  useEffect(() => {
    handleValueChange(values)
  }, [values])

  const renderControls = (variable: IFormVariable) => {
    switch (variable.type) {
      case "string":
        return (
          <StringField variable={variable} onChangeHandle={onChangeHandle} />
        )
      // case "number":
      //   return <NumberField variable={variable} />
      case "bool":
        return <BooleanField variable={variable} />
      case "select":
        return (
          <SelectField
            variable={variable}
            onChangeHandle={handleChangeOption}
          />
        )
      case "radio":
        return (
          <RadioField variable={variable} onChangeHandle={handleChangeOption} />
        )
      case "dob":
        return (
          <DateField
            variable={variable}
            onChangeHandle={handleTargetValueChange}
          />
        )
      // case "list(string)":
      //   return <ListField variable={variable} />
      // case "file":
      //   return <FilesField variable={variable} />
      default:
        return (
          <StringField variable={variable} onChangeHandle={onChangeHandle} />
        )
    }
  }

  return (
    <div className="flex-wrap">
      {Object.keys(groupSortedList).map((groupSortedListKey, indexItem) => {
        return (
          <div
            key={groupSortedList[groupSortedListKey][0].questionId}
            className="w-full border border-primary rounded-lg my-2 p-4 transition ease-in-out delay-150"
          >
            <label className="text-sm flex gap-1 mb-1">
              <div className="rounded-full bg-primary w-5 h-5 text-center text-base-100">
                {indexItem + 1}
              </div>
              {groupSortedList[groupSortedListKey][0].question}
            </label>
            <div className="w-full sm:flex gap-2">
              {groupSortedList[groupSortedListKey].map((variable) => (
                <div className="relative w-full" key={variable.questionId}>
                  {renderControls(variable)}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default FieldsCreator
