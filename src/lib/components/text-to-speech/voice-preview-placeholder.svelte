<script lang='ts'>
  import { AudioLinesIcon, BookOpenIcon, SparklesIcon, Volume2Icon } from '@lucide/svelte'
  import { Button } from '../ui/button'

</script>

<div class='hidden flex-1 lg:flex h-full flex-col items-center justify-center gap-6 border-t'>
  <div class='flex flex-col items-center gap-3'>
    <div class='relative flex w-32 items-center justify-center'>

      <div class='absolute left-0 -rotate-30 rounded-full bg-muted p-4'>
        <Volume2Icon class='size-5 text-muted-foreground' />
      </div>

      <div class='relative z-10 rounded-full bg-foreground p-4'>
        <SparklesIcon class='size-5 text-background' />
      </div>

      <div class='absolute right-0 -rotate-30 rounded-full bg-muted p-4'>
        <AudioLinesIcon className='size-5 text-muted-foreground' />
      </div>

    </div>

    <p class='text-lg font-semibold tracking-tight text-foreground'>
      Preview will appear here
    </p>
    <p class='max-w-64 text-center text-sm text-muted-foreground'>
      Once you generate, your audio result will appear here. Sit back and relax.
    </p>
  </div>
  <Button variant='outline' size='sm' href='mailto:business@codewithantonio.com'>
    <BookOpenIcon class='size-4' />
    Don&apos;t know how?
  </Button>
</div>
