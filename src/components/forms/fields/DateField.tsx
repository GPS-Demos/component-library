import { useState } from "react"
import { useFormikContext, FormikValues } from "formik"

import { IFormVariable } from "@/utils/types"

import FieldErrorMessage from "@/components/forms/FieldErrorMessage"

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

interface IDateFieldProps {
  variable: IFormVariable
  onChangeHandle: Function
}

const DateField: React.FC<IDateFieldProps> = ({ variable, onChangeHandle }) => {
  const { setFieldValue } = useFormikContext<FormikValues>()
  const [selectedDate, setSelectedDate] = useState(new Date())

  const ageCovertValue = 3.15576e10

  const getAge = (birthDate: Date) =>
    Math.floor(
      (new Date().getTime() - new Date(birthDate).getTime()) / ageCovertValue,
    )

  //TODO: check related item for Age as dynamically
  const handleChange = (dateValue: Date) => {
    setSelectedDate(dateValue)
    setFieldValue(variable.name, dateValue)
    setFieldValue("age", getAge(dateValue))
    onChangeHandle("age", dateValue)
  }

  return (
    <div className="form-control" key={variable.name}>
      <div className="w-full">
        <DatePicker
          selected={selectedDate}
          onChange={handleChange}
          className="w-full input input-bordered input-sm"
        />
      </div>
      <FieldErrorMessage variableName={variable.name} />
      <div className="text-faint mt-1 text-sm">{variable.description}</div>
    </div>
  )
}

export default DateField
