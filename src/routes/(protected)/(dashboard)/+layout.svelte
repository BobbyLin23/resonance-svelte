<script lang='ts'>

  import type { LayoutProps } from './$types'
  import DashboardSidebar from '$lib/components/dashboard/dashboard-sidebar.svelte'
  import * as Sidebar from '$lib/components/ui/sidebar/index.js'

  const { children, data }: LayoutProps = $props()

  const defaultOpen = $derived(data.sidebarState === 'true')
</script>

<Sidebar.Provider class='h-svh' open={defaultOpen}>
  <DashboardSidebar />
  <Sidebar.Inset class='min-h-0 min-w-0'>
    <main class='flex min-h-0 flex-1 flex-col'>
      {@render children()}
    </main>
  </Sidebar.Inset>
</Sidebar.Provider>
