import { withClerkHandler } from 'svelte-clerk/server'
import './lib/orpc.server'

export const handle = withClerkHandler()
