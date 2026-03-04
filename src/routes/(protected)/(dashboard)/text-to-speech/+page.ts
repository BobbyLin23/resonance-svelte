import type { PageLoad } from './$types'
import { orpc } from '$lib/orpc'

export const load: PageLoad = async ({ parent }) => {
  const { queryClient } = await parent()

  await queryClient.prefetchQuery(orpc.voices.getAll.queryOptions())
}
