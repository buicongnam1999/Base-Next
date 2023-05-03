import { useRouter } from 'next/router'

export default function useChangeRoute() {
  const router = useRouter()
  const { pathname } = router

  const handleChangeRoute = async (routeQuery: Record<any, any>) => {
    await router.replace(
      {
        pathname,
        query: {
          ...routeQuery,
        },
      },
      undefined,
      { scroll: false },
    )
  }

  return { handleChangeRoute }
}
