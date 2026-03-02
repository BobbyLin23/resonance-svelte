<script lang='ts'>
  import { quickActions } from '$lib/quick-actions'
  import QuickActionCard from './quick-action-card.svelte'

</script>
<div class='space-y-4'>
  <h2 class='text-lg font-semibold'>Quick actions</h2>
  <div class='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
    {#each quickActions as action}
      <QuickActionCard {...action} />
    {/each}
  </div>
</div>
