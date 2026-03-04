<script lang='ts'>
  import { orpc } from '$lib/orpc'
  import { createQuery } from '@tanstack/svelte-query'

  const query = createQuery(() => orpc.health.check.queryOptions())
</script>

{#if query.status === 'pending'}
  <p>Loading...</p>
{:else if query.status === 'success'}
  <div>
    <h2>oRPC and TanStack Query | Health Check</h2>
    <div>
      {query.data.status}
    </div>
  </div>
{:else}
  <p>Something went wrong.</p>
{/if}
