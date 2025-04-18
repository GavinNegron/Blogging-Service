import { cookies } from 'next/headers'

export async function getCookieHeaderFromServer(): Promise<string> {
  const cookieStore = await cookies()
  return cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')
}