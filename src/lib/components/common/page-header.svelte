<script lang='ts'>
  import { cn } from '$lib/utils'
  import { HeadphonesIcon, ThumbsUpIcon } from '@lucide/svelte'
  import { Button } from '../ui/button'
  import { SidebarTrigger } from '../ui/sidebar'

  interface Props {
    title: string
    class?: string
  }

  const { title, class: className }: Props = $props()
</script>

<div class={cn('flex items-center justify-between border-b px-4 py-4', className)}>
  <div class='flex items-center gap-2'>
    <SidebarTrigger />
    <h1 class='text-lg font-semibold tracking-tight'>{title}</h1>
  </div>
  <div class='flex items-center gap-3'>
    <Button variant='outline' size='sm' href='mailto:business@codewithantonio.com'>
      <ThumbsUpIcon />
      <span class='hidden lg:block'>Feedback</span>
    </Button>
    <Button variant='outline' size='sm' href='tel:+123456789'>
      <HeadphonesIcon />
      <span class='hidden lg:block'>Need help?</span>
    </Button>
  </div>
</div>
