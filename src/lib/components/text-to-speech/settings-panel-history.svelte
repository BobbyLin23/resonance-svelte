<script>
  import { AudioLinesIcon, AudioWaveformIcon, ClockIcon } from '@lucide/svelte'

</script>

<div class='flex h-full flex-col items-center justify-center gap-2 p-8'>
  <div class='relative flex w-25 items-center justify-center'>

    <div class='absolute left-0 -rotate-30 rounded-full bg-muted p-3'>
      <AudioLinesIcon class='size-4 text-muted-foreground' />
    </div>

    <div class='relative z-10 rounded-full bg-foreground p-3'>
      <AudioWaveformIcon class='size-4 text-background' />
    </div>

    <div class='absolute right-0 rotate-30 rounded-full bg-muted p-3'>
      <ClockIcon class='size-4 text-muted-foreground' />
    </div>

  </div>
  <p class='font-semibold tracking-tight text-foreground'>
    No generations yet
  </p>
  <p class='max-w-48 text-center text-xs text-muted-foreground'>
    Generate some audio and it will appear here
  </p>
</div>
