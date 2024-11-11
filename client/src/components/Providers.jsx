'use client'
import { algoliasearch } from 'algoliasearch'
import { InstantSearch } from 'react-instantsearch'

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
)

const Providers = ({ children }) => {
  return (
    <InstantSearch searchClient={searchClient} indexName='users_index_yt'>
      {children}
    </InstantSearch>
  )
}

export default Providers
