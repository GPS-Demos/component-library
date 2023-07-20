import { Field, useFormikContext, FormikValues } from "formik"

import { IFormVariable } from "../../../utils/types"

import FieldErrorMessage from "../FieldErrorMessage"
import { classNames } from "../../../utils/dom"

interface ISelectRadioFieldProps {
  variable: IFormVariable
  handleChange:Function
}

const SelectRadioField: React.FC<ISelectRadioFieldProps> = ({ variable, handleChange }) => {
  const { values } = useFormikContext<FormikValues>()
  console.log("Radio",values[variable.name])

  return (
    <div className="form-control" key={variable.name}>
      {/* <label htmlFor={variable.name}>{variable.display}</label> */}
      {/* <Field  
      type= "radio"      
        id={variable.name}
        name={variable.name}
        className=""
        onChange={handleChange}
      >         */}
      <div className="flex gap-2">
        {variable.options?.map((option) => {
          return (
            <label className={classNames(
              "flex gap-2 rounded-md px-2 py-1 border cursor-pointer",
              values[variable.name]===option?"outline  border-primary":"",
            )}>              
            <Field type="radio" className="hidden" onChange={handleChange} name={variable.name} value={option.oId} />
            <span className="w-5 h-5">
                    {values[variable.name]==option.oId ? <span>✔️</span> : <span>⭕</span>}
                  </span>
            {option.value}
          </label>
           
          )
        })}
      </div>
      {/* </Field> */}
      <FieldErrorMessage variableName={variable.name} />
      <div className="text-faint mt-1 text-sm">{variable.description}</div>
    </div>
  )
}

export default SelectRadioField
