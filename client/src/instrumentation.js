import dbConnect from '@/dbConnect'

export async function register() {
  await dbConnect()
}
