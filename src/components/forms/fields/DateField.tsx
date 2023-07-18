import { useFormikContext, FormikValues } from "formik"

import { IFormVariable } from "../../../utils/types"

import FieldErrorMessage from "../FieldErrorMessage"
import DatePicker from "../../DatePicker"

interface IDateFieldProps {
  variable: IFormVariable
  handleTargetValueChange: Function
}

const DateField: React.FC<IDateFieldProps> = ({
  variable,
  handleTargetValueChange,
}) => {
  const { setFieldValue } = useFormikContext<FormikValues>()

  const getAge = (birthDate: Date) =>
    Math.floor(
      ((new Date() as any) - new Date(birthDate).getTime()) / 3.15576e10,
    )

  //TODO: check related item for Age as dynamically
  const handleChange = (dateValue: Date) => {
    setFieldValue("5", getAge(dateValue))
    handleTargetValueChange("5", dateValue)
  }

  return (
    <div className="form-control" key={variable.questionId}>
      <div className="w-full">
        <DatePicker
          fieldName={variable.questionId}
          defaultDate={new Date()}
          onChangeHandle={handleChange}
        />
      </div>
      <FieldErrorMessage variableName={variable.questionId} />
      <div className="text-faint mt-1 text-sm">{variable.description}</div>
    </div>
  )
}

export default DateField
