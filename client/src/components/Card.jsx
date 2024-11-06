import { deleteDoc } from '@/actions/addDoc'
import { Highlight } from 'react-instantsearch'
import Link from 'next/link'

const Card = ({ hit }) => {
  const { objectID } = hit

  return (
    <div>
      <div className='card bg-base-100 w-96 shadow-xl'>
        <div className='card-body'>
          <h2 className='card-title'>
            {/* {name} */}
            <Highlight attribute='name' hit={hit} />
          </h2>
          <p>
            <Highlight attribute='email' hit={hit} />
          </p>
          <div className='card-actions justify-end'>
            <Link href={`/create?id=${objectID}`} className='btn btn-primary'>
              Update
            </Link>

            <form action={deleteDoc.bind(null, objectID)}>
              <button className='btn btn-error' type='submit'>
                Delete
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
