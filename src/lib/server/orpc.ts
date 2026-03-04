import { ORPCError, os } from '@orpc/server'

export interface ORPCContext {
  userId?: string | null
  orgId?: string | null
}

export const pub = os
  .$context<ORPCContext>()

export const authed = pub.use(({ context, next }) => {
  if (!context.userId) {
    throw new ORPCError('UNAUTHORIZED')
  }

  return next({
    context: {
      userId: context.userId,
    },
  })
})

export const orgProceure = pub.use(({ context, next }) => {
  if (!context.userId) {
    throw new ORPCError('UNAUTHORIZED')
  }

  if (!context.orgId) {
    throw new ORPCError('FORBIDDEN')
  }

  return next({
    context: {
      userId: context.userId,
      orgId: context.orgId,
    },
  })
})
