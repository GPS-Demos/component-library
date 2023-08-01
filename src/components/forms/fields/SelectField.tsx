import { Field } from "formik"

import { IFormVariable } from "@/utils/types"

import FieldErrorMessage from "@/components/forms/FieldErrorMessage"

interface ISelectFieldProps {
  variable: IFormVariable
  onChangeHandle: Function
  select:string
}

const SelectField: React.FC<ISelectFieldProps> = ({
  variable,
  onChangeHandle,
  select
}) => {
  return (
    <div className="form-control" key={variable.name}>
      {/* <label htmlFor={variable.name}>{variable.question}</label> */}
      <Field
        as="select"
        id={variable.name}
        name={variable.name}
        className="select select-bordered select-sm font-normal"
        onChange={onChangeHandle}
      >
        <option value="">{select}</option>
        {variable.options?.map((option) => {
          return (
            <option key={option.oId} value={option.value}>
              {option.value}
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