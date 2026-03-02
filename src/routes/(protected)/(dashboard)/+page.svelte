<script lang='ts'>
  import PageHeader from '$lib/components/common/page-header.svelte'
  import DashboardHeader from '$lib/components/dashboard/dashboard-header.svelte'
  import HeroPattern from '$lib/components/dashboard/hero-pattern.svelte'
  import QuickActionsPanel from '$lib/components/dashboard/quick-actions-panel.svelte'
  import TextInputPanel from '$lib/components/dashboard/text-input-panel.svelte'

</script>

<div class='relative'>
  <PageHeader title='Dashboard' class='lg:hidden' />
  <HeroPattern />
  <div class='relative space-y-8 p-4 lg:p-16'>
    <DashboardHeader />
    <TextInputPanel />
    <QuickActionsPanel />
  </div>
</div>
