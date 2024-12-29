import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { getErrorMessage } from '@shared/utils'

interface ListItemFetchingStatusProps {
  fetchingError: FetchBaseQueryError | SerializedError | undefined
  error: string | null
  isFetching: boolean
}

const ListItemFetchingStatus = ({ fetchingError, error, isFetching }: ListItemFetchingStatusProps) => {
  return (
    <div>
      {fetchingError && <span>{getErrorMessage(fetchingError)}</span>}
      {error && <span>{error}</span>}
      {isFetching && <span>Loading...</span>}
    </div>
  )
}

export default ListItemFetchingStatus
