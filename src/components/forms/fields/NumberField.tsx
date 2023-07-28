import { Field } from "formik"

import { IFormVariable } from "@/utils/types"
import FieldErrorMessage from "@/components/forms/FieldErrorMessage"

interface INumberFieldProps {
  variable: IFormVariable
}

const NumberField: React.FC<INumberFieldProps> = ({ variable }) => {
  return (
    <div className="form-control" key={variable.name}>
      <label htmlFor={variable.name}>{variable.question}</label>
      <Field
        type="number"
        id={variable.name}
        name={variable.name}
        className="input"
      />
      <FieldErrorMessage variableName={variable.name} />
      <div className="text-faint mt-1 text-sm">{variable.description}</div>
    </div>
  )
}

export default NumberField
