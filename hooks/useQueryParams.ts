import { usePathname, useRouter, useSearchParams } from 'next/navigation'

/**
 * This hook is used to get and set simpleQuery params in the url 
 * @returns {Object} getDefaultParams, simpleQuery
 * @example
 * const { getDefaultParams, simpleQuery } = usesimpleQueryParams()
 * const lang = getDefaultParams('lang')
 * simpleQuery('lang', 'en')
 * 
 */

type QueryParams = {
  basePath?: string
}
export const useQueryParams = ( { basePath } : Partial<QueryParams>) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const getDefaultParams = (name: string) => {
    return searchParams?.get(name) || ''
  }

  const handleBasePath = () => {
    if(!basePath) return pathname
    let path = basePath.startsWith('/') ? basePath.slice(1) : basePath
    let newPathName = pathname
    if(pathname.endsWith('/')) {
      newPathName = pathname.slice(0, -1)
    }
    return newPathName.includes(path) ? newPathName : `${newPathName}/${path}`
  }

  const removeQuery = (name: string[]) => {
    const params = new URLSearchParams(searchParams?.toString())
    name.forEach((item) => {
      params.delete(item)
    })
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  /**
   * The querySet function is used to set multiple query params in the url
   * @param params 
   * @returns void
   * @example
   * querySet({lang: 'en', type: 'hosting'})
   * 
   */
  const querySet = (params: Record<string, string>) => {
    const searchParams = new URLSearchParams()
    Object.keys(params).forEach(key => {
      const name = key.toLowerCase()
      const value = params[key] ? params[key].toLowerCase() : ''
      if(value.length < 1) return;
      searchParams.set(name, value)
    })
    
    const newPathName = handleBasePath() + '?' + searchParams.toString()
    router.push(newPathName, { scroll: false })
  }

  return {
    getDefaultParams,
    querySet,
    removeQuery
  }
}






