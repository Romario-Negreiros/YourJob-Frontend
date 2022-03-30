import React from 'react'

import TextField from '@mui/material/TextField'
import NumberFormat from 'react-number-format'

import { ControllerRenderProps } from 'react-hook-form'

const SalaryInput: React.FC<ControllerRenderProps> = ({ onChange, value, ...rest }) => {
  const [salary, setSalary] = React.useState<number | undefined>(value / 100)

  return (
    <>
      <NumberFormat
        customInput={TextField}
        {...rest}
        value={salary}
        label="Salary"
        sx={{ width: 240 }}
        thousandSeparator={true}
        decimalScale={2}
        onValueChange={target => {
          setSalary(target.floatValue)
          onChange(() => {
            if (target.floatValue) {
              return target.floatValue * 100
            }
          })
        }}
        isNumericString
        prefix="$ "
      />
    </>
  )
}

export default SalaryInput
