import type { router } from '$lib/server/routers'
import type { RouterClient } from '@orpc/server'
import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import { BatchLinkPlugin } from '@orpc/client/plugins'
import { createTanstackQueryUtils } from '@orpc/tanstack-query'

/**
 * This is part of the Optimize SSR setup.
 *
 * @see {@link https://orpc.dev/docs/adapters/svelte-kit#optimize-ssr}
 */
declare global {
  // eslint-disable-next-line vars-on-top
  var $client: RouterClient<typeof router> | undefined
}

const link = new RPCLink({
  url: `${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/rpc`,
  plugins: [
    new BatchLinkPlugin({
      exclude: ({ path }) => path[0] === 'sse',
      groups: [{
        condition: () => true,
        context: {},
      }],
    }),
  ],
})

export const client: RouterClient<typeof router> = globalThis.$client ?? createORPCClient(link)

export const orpc = createTanstackQueryUtils(client)
