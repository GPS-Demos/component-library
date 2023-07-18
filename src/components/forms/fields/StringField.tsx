import { Field } from "formik"

import { IFormVariable } from "../../../utils/types"

import FieldErrorMessage from "../FieldErrorMessage"

interface IStringFieldProps {
  variable: IFormVariable
  handleBlur: Function
}

const StringField: React.FC<IStringFieldProps> = ({ variable, handleBlur }) => {
  return (
    <div className="form-control" key={variable.questionId}>
      <Field
        id={variable.questionId}
        name={variable.questionId}
        placeholder={variable.question}
        onBlur={handleBlur}
        className="input input-bordered input-sm"
      />
      <FieldErrorMessage variableName={variable.questionId} />
      <div className="text-faint mt-1 text-sm">{variable.description}</div>
    </div>
  )
}

export default StringField
