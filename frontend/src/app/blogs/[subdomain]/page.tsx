import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { fetchBlogDetails } from '@/services/PublicService'
import ClientPage from './ClientPage'
import { Metadata } from 'next'

interface Params {
  subdomain: string
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const headerList = await headers()
  const host = headerList.get('host')

  if (!host) {
    return {
      title: 'Error | Missing Host',
    }
  }

  const subdomain = host.split('.')[0]

  const blog = await fetchBlogDetails(subdomain)

  if (!blog) {
    return {
      title: '404 | Blog does not exist or is private',
    }
  }

  return {
    title: blog.name,
  }
}

export default async function PostsPage({ params }: { params: Params }) {
  const headerList = await headers()
  const host = headerList.get('host')

  if (!host) {
    return <p>400 | Invalid request (missing host)</p>
  }

  const subdomain = host.split('.')[0]

  const isLocalhost = host.includes('localhost')
  const protocol = isLocalhost ? 'http' : 'https'
  const domain = isLocalhost ? 'localhost:3000' : host.replace(`${subdomain}.`, '')

  if (params.subdomain && host !== `${params.subdomain}.${domain}`) {
    redirect(`${protocol}://${params.subdomain}.${domain}`)
    return null
  }

  const blog = await fetchBlogDetails(subdomain)

  if (!blog) {
    return <p>404 | Blog does not exist or is private</p>
  }

  return <ClientPage blogDetails={blog} />
}
