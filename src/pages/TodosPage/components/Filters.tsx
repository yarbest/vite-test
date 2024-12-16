import { FilterType } from '../types'
import Button from './Button'

interface FiltersProps {
  onFilterChange: (filterType: FilterType) => void
}

const Filters = ({ onFilterChange }: FiltersProps) => {
  return (
    <div>
      <Button label="Show all" onClick={() => onFilterChange(FilterType.ALL)} />
      <Button label="Show active" onClick={() => onFilterChange(FilterType.ACTIVE)} />
      <Button label="Show completed" onClick={() => onFilterChange(FilterType.COMPLETED)} />
    </div>
  )
}

export default Filters