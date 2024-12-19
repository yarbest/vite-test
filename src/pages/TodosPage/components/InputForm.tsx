import classNames from 'classnames'
import React from 'react'

import Button from './Button'
import styles from './styles.module.scss'

// Props overloading
// This means, if isEditing is passed, then onAddListItem is prohibited
// and vice versa, so only one of these props can be passed, everything from InputFormPropsCommon can be passed
interface InputFormPropsEdit {
  isEditing: boolean
  onAddListItem?: never
}
interface InputFormPropsSubmit {
  onAddListItem: () => void
  isEditing?: never
}
interface InputFormPropsCommon {
  inputValue?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  isFromApi?: boolean
  testIds?: {
    input: string
    button: string
  }
}

type InputFormProps = InputFormPropsCommon & (InputFormPropsEdit | InputFormPropsSubmit)

const InputForm = ({
  onAddListItem = () => {},
  isEditing = false,
  inputValue = '',
  isFromApi = false,
  onChange,
  testIds,
}: InputFormProps) => {
  return (
    <div className={classNames(styles.inputForm, { [styles.inputFormEditing]: isEditing })}>
      <input data-testid={testIds?.input} type={isFromApi ? 'number' : 'text'} value={inputValue} onChange={onChange} />
      {!isEditing
      && (
        <Button
          data-testid={testIds?.button}
          label={isFromApi ? 'Add from api' : 'Add custom'}
          onClick={onAddListItem}
          testId={testIds?.button}
        />
      )}
    </div>
  )
}

export default InputForm
