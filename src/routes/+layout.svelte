<script lang='ts'>
  import type { Snippet } from 'svelte'
  import type { LayoutData } from './$types'
  import { page } from '$app/state'
  import favicon from '$lib/assets/favicon.svg'
  import { Toaster } from '$lib/components/ui/sonner'
  import { QueryClientProvider } from '@tanstack/svelte-query'
  import { ClerkProvider } from 'svelte-clerk'
  import './layout.css'

  const { children, data }: { children: Snippet, data: LayoutData } = $props()

  const title = $derived(page.data.title ? `${page.data.title} - Resonance` : 'Resonance')
</script>

<svelte:head>
  <link rel='icon' href={favicon} />
  <title>{title}</title>
  <meta name='description' content='AI-powered text-to-speech and voice cloning platform' />
</svelte:head>
<Toaster />
<ClerkProvider>
  <QueryClientProvider client={data.queryClient}>
    {@render children()}
  </QueryClientProvider>
</ClerkProvider>
