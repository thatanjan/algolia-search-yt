'use client'
import { algoliasearch } from 'algoliasearch'
import { InstantSearch, SearchBox } from 'react-instantsearch'

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_KEY,
)

const Providers = ({ children }) => {
  return (
    <InstantSearch searchClient={searchClient} indexName='users_index'>
      {children}
    </InstantSearch>
  )
}

export default Providers
