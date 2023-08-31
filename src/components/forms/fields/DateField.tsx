import { useState } from "react"
import { FormikContextType, FormikProvider } from "formik"
import { IFormVariable } from "@/utils/types"
import FieldErrorMessage from "@/components/forms/FieldErrorMessage"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { CalendarIcon } from "@heroicons/react/24/outline"

interface IDateFieldProps {
  variable: IFormVariable
  onChangeHandle: Function
  formikProps: FormikContextType<any>
}

const DateField: React.FC<IDateFieldProps> = ({
  variable,
  onChangeHandle,
  formikProps,
}) => {
  const { setFieldValue, values } = formikProps
  const [selectedDate, setSelectedDate] = useState(
    values[variable.name] ? new Date(values[variable.name]) : new Date(),
  )

  const handleChange = (dateValue: Date) => {
    const formatDateValue = dateValue.toLocaleDateString()
    setSelectedDate(dateValue)
    setFieldValue(variable.name, formatDateValue)
    onChangeHandle(variable.name, formatDateValue)
  }

  return (
    <FormikProvider value={formikProps}>
      <div className="form-control" key={variable.name}>
        <div className="w-full">
          <div className="join w-full">
            <div className="join-item border border-base-200 rounded-l-lg flex justify-center items-center px-1">
              <CalendarIcon className="w-5 h-auto align-middle" />
            </div>
            <DatePicker
              selected={selectedDate}
              onChange={handleChange}
              className="w-full input input-bordered input-sm join-item"
            />
          </div>
        </div>
        <FieldErrorMessage variableName={variable.name} />
        <div className="text-faint mt-1 text-sm">{variable.description}</div>
      </div>
    </FormikProvider>
  )
}

export default DateField
