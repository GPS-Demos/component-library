import { Field } from "formik"

import { IFormVariable } from "@/utils/types"

interface BooleanFieldProps {
  variable: IFormVariable
  onChangeHandle:Function
}

const BooleanField: React.FC<BooleanFieldProps> = ({ variable,onChangeHandle }) => {
  return (
    <div className="form-control" key={variable.name}>
      <div className="flex justify-between">
        <label className="relative mb-5 inline-flex cursor-pointer items-center">
          <Field
            id={variable.name}
            type="checkbox"
            className="peer sr-only toggle toggle-sm"
            name={variable.name}
            onChange={onChangeHandle}
          />
          <div className="peer-focus:ring-7 h-6 w-11 rounded-full bg-base-300 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border-primary after:border-primary after:bg-base-100 after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-primary peer-focus:outline-none peer-focus:ring-primary dark:peer-focus:ring-primary"></div>
        </label>
      </div>
      <div className="text-faint mt-1 text-sm">{variable.description}</div>
    </div>
  )
}

export default BooleanField
