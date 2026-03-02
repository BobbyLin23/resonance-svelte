<script lang='ts'>
  import { HeadphonesIcon, ThumbsUpIcon } from '@lucide/svelte'
  import { useClerkContext } from 'svelte-clerk'
  import { Button } from '../ui/button'

  const ctx = useClerkContext()
</script>

<div class='flex items-start justify-between'>
  <div class='space-y-1'>
    <p class='text-sm text-muted-foreground'>
      Nice to see you
    </p>
    <h1 class='text-2xl lg:text-3xl font-semibold tracking-tight'>
      {#if ctx.isLoaded}
        {ctx.user?.fullName ?? ctx.user?.firstName ?? 'there'}
      {:else}
        ...
      {/if}
    </h1>
  </div>
  <div class='lg:flex items-center gap-3 hidden'>
    <Button variant='outline' size='sm' href='mailto:business@codewithantonio.com'>
      <ThumbsUpIcon class='size-4' />
      <span class='hidden lg:block'>Feedback</span>
    </Button>
    <Button variant='outline' size='sm' href='mailto:business@codewithantonio.com'>
      <HeadphonesIcon class='size-4' />
      <span class='hidden lg:block'>Need help?</span>
    </Button>
  </div>
</div>
