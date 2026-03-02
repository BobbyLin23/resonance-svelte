<script lang='ts'>
  import { goto } from '$app/navigation'
  import { TEXT_MAX_LENGTH } from '$lib/constants'
  import { CoinsIcon } from '@lucide/svelte'
  import { Badge } from '../ui/badge'
  import { Button } from '../ui/button'
  import { Textarea } from '../ui/textarea'

  let text = $state('')

  const handleGenerate = () => {
    const trimmed = text.trim()
    if (!trimmed)
      return

    goto(`/text-to-speech?text=${encodeURIComponent(trimmed)}`)
  }
</script>

<div class='rounded-[22px] bg-linear-185 from-[#ff8ee3] from-15% via-[#57d7e0] via-39% to-[#dbf1f2] to-85% p-0.5 shadow-[0_0_0_4px_white]'>
  <div class='rounded-[20px] bg-[#F9F9F9] p-1'>
    <div class='space-y-4 rounded-2xl bg-white p-4 drop-shadow-xs'>
      <Textarea
        bind:value={text}
        placeholder='Start typing or paste your text here...'
        class='min-h-35 resize-none border-0 bg-transparent p-0.5 shadow-none focus-visible:ring-0'
        maxlength={TEXT_MAX_LENGTH}
      />
      <div class='flex items-center justify-between'>
        <Badge variant='outline' class='gap-1.5 border-dashed'>
          <CoinsIcon class='size-3 text-chart-5' />
          <span class='text-xs'>
            {#if text.length === 0}
              "Start typing to estimate"
            {:else}
              <span class='tabular-nums'>
                ${(text.length * 0.0003).toFixed(4)}
              </span>
              estimated
            {/if}
          </span>
        </Badge>
        <span class='text-xs text-muted-foreground'>
          {text.length.toLocaleString()} / {TEXT_MAX_LENGTH.toLocaleString()} characters
        </span>
      </div>
    </div>

    <div class='flex items-center justify-end p-3'>
      <Button
        size='sm'
        disabled={!text.trim()}
        onclick={handleGenerate}
        class='w-full lg:w-auto'
      >
        Generate speech
      </Button>
    </div>
  </div>
</div>
