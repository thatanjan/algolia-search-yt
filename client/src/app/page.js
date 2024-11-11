import { getDocs } from '@/actions'
import Providers from '@/components/Providers'
import Search from '@/components/Search'

export default async function Home() {
  const { data: users } = await getDocs()
  console.log(users)

  return (
    <div data-theme='dark' className=''>
      <Providers>
        <h2 className='text-2xl font-bold'>Welcome to Algolia Search Demo</h2>

        <Search />
      </Providers>
    </div>
  )
}
