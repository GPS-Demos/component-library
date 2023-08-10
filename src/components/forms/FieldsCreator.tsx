import sortBy from "lodash/sortBy"

import { IFormVariable } from "@/utils/types"
import { groupByOrderVariables } from "@/utils/forms"

import StringField from "@/components/forms/fields/StringField"
// import NumberField from "@/components/forms/fields/NumberField"
import BooleanField from "@/components/forms/fields/BooleanField"
import SelectField from "@/components/forms/fields/SelectField"
// import ListField from "@/components/forms/fields/ListField"
import FilesField from "@/components/forms/fields/FilesField"
import RadioField from "@/components/forms/fields/RadioField"
import DateField from "@/components/forms/fields/DateField"
import MultiSelectField from "@/components/forms/fields/MultiSelectField"

import { useEffect, useState, useRef } from "react"
import { FormikContextType } from "formik"

interface FieldsCreatorProps {
  variableList: IFormVariable[]
  handleChange: Function
  handleChangeInput: Function
  handleValueChange: Function
  handleTargetValueChange: Function
  formikProps: FormikContextType<any>
}

const FieldsCreator: React.FC<FieldsCreatorProps> = ({
  variableList,
  handleChange,
  handleChangeInput,
  handleValueChange,
  handleTargetValueChange,
  formikProps,
}) => {
  const sortedList = sortBy(variableList, "order")
  const groupSortedList = groupByOrderVariables(sortedList)

  const { values } = formikProps
  const [timer, setTimer] = useState<NodeJS.Timeout>()
  const refScroll = useRef<HTMLDivElement>(null)

  const timeoutTime: number = 1000

  const onChangeHandle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer)
    if (e.target.value) {
      const changeTimer = setTimeout(() => {
        handleChangeInput(e)
      }, timeoutTime)
      setTimer(changeTimer)
    }
  }

  const scrollToLast = () => {
    const lastChildElement = refScroll.current?.lastElementChild
    lastChildElement?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    handleValueChange(values)
  }, [values])

  useEffect(() => {
    if (Object.keys(groupSortedList).length > 1) {
      scrollToLast()
    }
  }, [groupSortedList])

  const renderControls = (variable: IFormVariable) => {
    switch (variable.type) {
      case "string":
        return (
          <StringField
            variable={variable}
            onChangeHandle={onChangeHandle}
            formikProps={formikProps}
          />
        )
      // case "number":
      //   return <NumberField variable={variable} />
      case "bool":
        return (
          <BooleanField
            variable={variable}
            onChangeHandle={handleChange}
            formikProps={formikProps}
          />
        )
      case "select":
        return (
          <SelectField
            variable={variable}
            onChangeHandle={handleChange}
            select="Select"
            formikProps={formikProps}
          />
        )
      case "multiselect":
        return (
          <MultiSelectField
            variable={variable}
            selected="Selected"
            onChangeHandle={handleTargetValueChange}
            formikProps={formikProps}
          />
        )
      case "radio":
        return (
          <RadioField
            variable={variable}
            onChangeHandle={handleChange}
            formikProps={formikProps}
          />
        )
      case "dob":
        return (
          <DateField
            variable={variable}
            onChangeHandle={handleTargetValueChange}
            formikProps={formikProps}
          />
        )
      // case "list(string)":
      //   return <ListField variable={variable} />
      case "file":
        return (
          <FilesField
            variable={variable}
            deleteMessage="Delete file message"
            deleteText="Delete"
            close="Close"
            formikProps={formikProps}
          />
        )
      default:
        return (
          <StringField
            variable={variable}
            onChangeHandle={onChangeHandle}
            formikProps={formikProps}
          />
        )
    }
  }

  return (
    <div className="flex-wrap" ref={refScroll}>
      {Object.keys(groupSortedList).map((groupSortedListKey, indexItem) => {
        return (
          <div
            key={groupSortedList[groupSortedListKey][0].name}
            className="w-full border border-primary rounded-lg my-2 p-4 transition ease-in-out delay-150"
          >
            <label className="text-sm flex gap-1 mb-1">
              <div className="rounded-full bg-primary w-5 h-5 text-center text-base-100">
                {indexItem + 1}
              </div>
              {groupSortedList[groupSortedListKey][0].display}
            </label>
            <div className="w-full sm:flex gap-2">
              {groupSortedList[groupSortedListKey].map((variable) => (
                <div className="relative w-full" key={variable.name}>
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
