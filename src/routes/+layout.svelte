<script lang='ts'>
  import type { Snippet } from 'svelte'
  import { page } from '$app/state'
  import favicon from '$lib/assets/favicon.svg'
  import { Toaster } from '$lib/components/ui/sonner'
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'
  import { ClerkProvider } from 'svelte-clerk'
  import './layout.css'

  const { children }: { children: Snippet } = $props()

  const title = $derived(page.data.title ? `${page.data.title} - Resonance` : 'Resonance')

  const queryClient = new QueryClient()
</script>

<svelte:head>
  <link rel='icon' href={favicon} />
  <title>{title}</title>
  <meta name='description' content='AI-powered text-to-speech and voice cloning platform' />
</svelte:head>
<Toaster />
<ClerkProvider>
  <QueryClientProvider client={queryClient}>
    {@render children()}
  </QueryClientProvider>
</ClerkProvider>
