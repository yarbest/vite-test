import classNames from 'classnames'
import React from 'react'

import Button from './Button'
import styles from './styles.module.scss'

// Discriminated Union, if mode is 'add' then onAddListItem is required
// and if mode is 'edit' then onAddListItem is prohibited BUT!!! it can't be destructured from porps
// it can be used only when we have direct check for mode === 'add'
interface InputFormPropsEdit {
  mode: 'edit'
}

interface InputFormPropsAdd {
  mode: 'add'
  onAddListItem: () => void
}
interface InputFormPropsCommon {
  inputValue: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  isFromApi?: boolean
  testIds?: {
    input: string
    button: string
  }
}

type InputFormProps = InputFormPropsCommon & (InputFormPropsEdit | InputFormPropsAdd)

const InputForm = (props: InputFormProps) => {
  const { mode, inputValue, onChange, testIds, isFromApi = false } = props

  return (
    <div className={classNames(styles.inputForm, { [styles.inputFormEditing]: mode === 'edit' })}>
      <input data-testid={testIds?.input} type={isFromApi ? 'number' : 'text'} value={inputValue} onChange={onChange} />
      {mode === 'add'
      && (
        <Button
          data-testid={testIds?.button}
          label={isFromApi ? 'Add from api' : 'Add custom'}
          onClick={props.onAddListItem}
          testId={testIds?.button}
        />
      )}
    </div>
  )
}

export default InputForm
