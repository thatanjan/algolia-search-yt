'use client'

import { Hits, SearchBox } from 'react-instantsearch'
import Card from './Card'

const Search = () => {
  return (
    <div>
      <SearchBox
        classNames={{
          root: 'flex mb-4',
          input: 'input input-bordered mr-2',
          form: 'flex gap-1 flex-wrap',
          submit: 'btn',
          reset: 'btn',
          submitIcon: ' fill-white',
          resetIcon: ' fill-white',
          loadingIndicator: 'basis-full',
          loadingIcon: 'stroke-white w-10 h-10',
        }}
      />
      <div className='flex  flex-wrap'>
        <Hits
          hitComponent={Card}
          classNames={{
            list: 'flex flex-wrap gap-4',
          }}
          transformItems={(items, { results }) => {
            if (results.query === '') return []

            return items
          }}
        />
      </div>
    </div>
  )
}

export default Search
