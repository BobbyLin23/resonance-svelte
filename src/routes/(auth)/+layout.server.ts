import type { LayoutServerLoad } from './$types'
import { redirect } from '@sveltejs/kit'

export const load: LayoutServerLoad = async ({ locals }) => {
  const { userId, orgId } = locals.auth()

  if (userId && !orgId) {
    return redirect(307, '/org-selection')
  }
}
