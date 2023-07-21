import { Field } from "formik"

import { IFormVariable } from "../../../utils/types"

import FieldErrorMessage from "../FieldErrorMessage"

interface IStringFieldProps {
  variable: IFormVariable
  onChangeHandle: Function
}

const StringField: React.FC<IStringFieldProps> = ({ variable, onChangeHandle }) => {
  return (
    <div className="form-control" key={variable.name}>
      <Field
        id={variable.name}
        name={variable.name}
        placeholder={variable.question}
        onChange={onChangeHandle}
        className="input input-bordered input-sm"
      />
      <FieldErrorMessage variableName={variable.name} />
      <div className="text-faint mt-1 text-sm">{variable.description}</div>
    </div>
  )
}

export default StringField
