<script lang='ts'>
  import * as Tabs from '$lib/components/ui/tabs/index.js'
  import { HistoryIcon, SettingsIcon } from '@lucide/svelte'
  import SettingsPanelHistory from './settings-panel-history.svelte'
  import SettingsPanelSettings from './settings-panel-settings.svelte'

  const tabTriggerClassName
    = 'flex-1 h-full gap-2 bg-transparent rounded-none border-x-0 border-t-0 border-b-px border-b-transparent shadow-none data-[state=active]:border-b-foreground group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none'
</script>

<div class='hidden w-105 min-h-0 flex-col border-l lg:flex'>
  <Tabs.Root
    value='settings'
    class='flex h-full min-h-0 flex-col gap-y-0'
  >
    <Tabs.List class='w-full bg-transparent rounded-none border-b h-12 group-data-[orientation=horizontal]/tabs:h-12 p-0'>
      <Tabs.Trigger value='settings' class={tabTriggerClassName}>
        <SettingsIcon className='size-4' />
        Settings
      </Tabs.Trigger>
      <Tabs.Trigger value='history' class={tabTriggerClassName}>
        <HistoryIcon className='size-4' />
        History
      </Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content
      value='settings'
      class='mt-0 flex min-h-0 flex-1 flex-col overflow-y-auto'
    >
      <SettingsPanelSettings />
    </Tabs.Content>
    <Tabs.Content
      value='history'
      class='mt-0 flex min-h-0 flex-1 flex-col overflow-y-auto'
    >
      <SettingsPanelHistory />
    </Tabs.Content>
  </Tabs.Root>
</div>
