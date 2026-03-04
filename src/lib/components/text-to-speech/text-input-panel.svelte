<script lang='ts'>
  import { Badge } from '$lib/components/ui/badge'
  import { Textarea } from '$lib/components/ui/textarea'
  import { COST_PER_UNIT, TEXT_MAX_LENGTH } from '$lib/constants'
  import { CoinsIcon } from '@lucide/svelte'
  import GenerateButton from './generate-button.svelte'
  import { getTTSFormContext } from './text-to-speech-form.svelte'

  const form = getTTSFormContext()
</script>

<div class='flex h-full min-h-0 flex-col flex-1'>
  <div class='relative min-h-0 flex-1'>
    <form.Field name='text'>
      {#snippet children(field)}
        <form.Subscribe selector={s => ({ isSubmitting: s.isSubmitting })}>
          {#snippet children({ isSubmitting })}
            <Textarea
              value={field.state.value}
              oninput={e => field.handleChange(e.currentTarget.value)}
              placeholder='Start typing or paste your text here...'
              class='absolute inset-0 resize-none border-0 bg-transparent p-4 pb-6 lg:p-6 lg:pb-8 text-base! leading-relaxed tracking-tight shadow-none wrap-break-word focus-visible:ring-0'
              maxlength={TEXT_MAX_LENGTH}
              disabled={isSubmitting}
            />
          {/snippet}
        </form.Subscribe>
      {/snippet}
    </form.Field>
    <div class='pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-background to-transparent'></div>
  </div>
  <div class='shrink-0 p-4 lg:p-6'>
    <form.Subscribe selector={s => ({ text: s.values.text, isSubmitting: s.isSubmitting, isValid: s.isValid })}>
      {#snippet children({ text, isSubmitting, isValid })}
        <div class='flex flex-col gap-3 lg:hidden'>
          <GenerateButton
            class='w-full'
            disabled={isSubmitting}
            isSubmitting={isSubmitting}
            onSubmit={() => form.handleSubmit()}
          />
        </div>
        {#if text?.length > 0}
          <div class='hidden items-center justify-between lg:flex'>
            <Badge variant='outline' class='gap-1.5 border-dashed'>
              <CoinsIcon class='size-3 text-chart-5' />
              <span class='text-xs'>
                <span class='tabular-nums'>
                  ${(text.length * COST_PER_UNIT).toFixed(4)}
                </span>&nbsp;
                estimated
              </span>
            </Badge>
            <div class='flex items-center gap-3'>
              <p class='text-xs tracking-tight'>
                {text.length.toLocaleString()}
                <span class='text-muted-foreground'>
                  &nbsp;/&nbsp;{TEXT_MAX_LENGTH.toLocaleString()} characters
                </span>
              </p>
              <GenerateButton
                size='sm'
                disabled={isSubmitting || !isValid}
                isSubmitting={isSubmitting}
                onSubmit={() => form.handleSubmit()}
              />
            </div>
          </div>
        {:else}
          <div class='hidden lg:block'>
            <p class='text-sm text-muted-foreground'>
              Get started by typing or pasting text above
            </p>
          </div>
        {/if}
      {/snippet}
    </form.Subscribe>
  </div>
</div>
