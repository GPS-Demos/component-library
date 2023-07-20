import sortBy from "lodash/sortBy"

import { IFormVariable } from "../../utils/types"
import { groupByOrderVariables } from "../../utils/forms"

import StringField from "./fields/StringField"
// import NumberField from "./fields/NumberField"
// import BooleanField from "./fields/BooleanField"
// import SelectField from "./fields/SelectField"
// import ListField from "./fields/ListField"
//import FilesField from "./fields/FilesField"
import SelectRadioField from "./fields/SelectRadioField"
import DateField from "./fields/DateField"

import { useFormikContext, FormikValues } from "formik"

interface FieldsCreatorProps {
  variableList: IFormVariable[]
  handleChange: Function
  handleBlur: Function
  handleValueChange: Function
  handleTargetValueChange: Function
}

const FieldsCreator: React.FC<FieldsCreatorProps> = ({
  variableList,
  handleChange,
  handleBlur,
  handleValueChange,
  handleTargetValueChange,
}) => {
  const sortedList = sortBy(variableList, "order")
  const groupSortedList = groupByOrderVariables(sortedList)

  const { values, setFieldValue } = useFormikContext<FormikValues>()

  const handleChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFieldValue(e.target.name, e.target.value)
    handleChange(e)
  }
  handleValueChange(values)

  const renderControls = (variable: IFormVariable) => {
    switch (variable.type) {
      case "string":
        return <StringField variable={variable} handleBlur={handleBlur} />
      // case "number":
      //   return <NumberField variable={variable} />
      // case "bool":
      //   return <BooleanField variable={variable} />
      // case "select":
      //   return <SelectField variable={variable} />
      case "selectradio":
        return (
          <SelectRadioField
            variable={variable}
            handleChange={handleChangeOption}
          />
        )
      case "dob":
        return (
          <DateField
            variable={variable}
            handleTargetValueChange={handleTargetValueChange}
          />
        )
      // case "list(string)":
      //   return <ListField variable={variable} />
      // case "file":
      //   return <FilesField variable={variable} />
      default:
        return <StringField variable={variable} handleBlur={handleBlur} />
    }
  }

  return (
    <div className="flex-wrap">
      {Object.keys(groupSortedList).map((groupSortedListKey, indexItem) => {
        return (
          <div className="w-full border border-primary rounded-lg my-2 p-4 ">
            <label className="text-sm flex gap-1 mb-1">
              <div className="rounded-full bg-primary w-5 h-5 text-center text-base-100">
                {indexItem + 1}
              </div>
              {groupSortedList[groupSortedListKey][0].question}
            </label>
            {groupSortedList[groupSortedListKey].length > 1 ? (
              <div className="w-full sm:flex gap-2">
                {groupSortedList[groupSortedListKey].map((variable) => (
                  <div className="relative w-full" key={variable.questionId}>
                    {renderControls(variable)}
                  </div>
                ))}
              </div>
            ) : (
              groupSortedList[groupSortedListKey].map((variable) => (
                <div className="relative w-full" key={variable.questionId}>
                  {renderControls(variable)}
                </div>
              ))
            )}
          </div>
        )
      })}
    </div>
  )
}

export default FieldsCreator
