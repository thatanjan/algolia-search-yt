import { addDoc, getDoc, updateDoc } from '@/actions'

const Page = async ({ searchParams }) => {
  const { id = '' } = searchParams

  const { data, success } = await getDoc(id)

  const user = success ? data : {}

  return (
    <div>
      <h2 className='text-2xl font-bold'>
        {id ? 'Update User' : 'Create a new user'}
      </h2>

      <form
        className='flex flex-col gap-2'
        action={id ? updateDoc.bind(null, id) : addDoc}
      >
        <label className='form-control w-full max-w-xs'>
          <div className='label'>
            <span className='label-text'>What is your name?</span>
          </div>
          <input
            type='text'
            placeholder='Type here'
            className='input input-bordered w-full max-w-xs'
            name='name'
            defaultValue={user.name}
          />
        </label>
        <label className='form-control w-full max-w-xs'>
          <div className='label'>
            <span className='label-text'>What is your email?</span>
          </div>
          <input
            type='email'
            placeholder='Type here'
            className='input input-bordered w-full max-w-xs'
            name='email'
            defaultValue={user.email}
          />
        </label>

        <label className='form-control w-full max-w-xs'>
          <div className='label'>
            <span className='label-text'>What is your password?</span>
          </div>
          <input
            type='password'
            placeholder='Type here'
            className='input input-bordered w-full max-w-xs'
            name='password'
          />
        </label>

        <button className='btn btn-primary max-w-xs' type='submit'>
          {id ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  )
}

export default Page
