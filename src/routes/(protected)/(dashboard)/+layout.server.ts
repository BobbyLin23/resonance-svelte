import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ cookies }) => {
  const sidebar_state = cookies.get('sidebar:state')

  return {
    sidebarState: sidebar_state,
  }
}
