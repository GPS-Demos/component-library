import { Field, ErrorMessage } from "formik"

import { IFormVariable } from "../../../utils/types"

interface INumberFieldProps {
  variable: IFormVariable
}

const NumberField: React.FC<INumberFieldProps> = ({ variable }) => {
  return (
    <div className="form-control" key={variable.name}>
      <label htmlFor={variable.name}>{variable.display}</label>
      <Field
        type="number"
        id={variable.name}
        name={variable.name}
        className="input"
      />
      <div className="mt-1 text-xs text-error">
        <ErrorMessage name={variable.name} />
      </div>
      <div className="text-faint mt-1 text-sm">{variable.description}</div>
    </div>
  )
}

export default NumberField
