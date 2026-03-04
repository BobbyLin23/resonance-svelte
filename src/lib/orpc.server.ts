import type { router } from '$lib/server/routers'
import type { RouterClient } from '@orpc/server'
import { getRequestEvent } from '$app/server'
import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'

if (typeof window !== 'undefined') {
  throw new TypeError('This file should only be imported on the server')
}

/**
 * This is part of the Optimize SSR setup.
 *
 * @see {@link https://orpc.dev/docs/adapters/svelte-kit#optimize-ssr}
 */
const link = new RPCLink({
  url: async () => {
    return `${getRequestEvent().url.origin}/rpc`
  },
  async fetch(request, init) {
    return getRequestEvent().fetch(request, init)
  },
})

const serverClient: RouterClient<typeof router> = createORPCClient(link)
globalThis.$client = serverClient
