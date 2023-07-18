import { Field } from "formik"

import { IFormVariable } from "../../../utils/types"

import FieldErrorMessage from "../FieldErrorMessage"

interface ISelectFieldProps {
  variable: IFormVariable
}

const SelectField: React.FC<ISelectFieldProps> = ({ variable }) => {
  return (
    <div className="form-control" key={variable.name}>
      <label htmlFor={variable.name}>{variable.display}</label>
      <Field
        as="select"
        id={variable.name}
        name={variable.name}
        className="select select-bordered"
      >
        <option value="">Select</option>
        {variable.options?.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          )
        })}
      </Field>
      <FieldErrorMessage variableName={variable.name} />
      <div className="text-faint mt-1 text-sm">{variable.description}</div>
    </div>
  )
}

export default SelectField
