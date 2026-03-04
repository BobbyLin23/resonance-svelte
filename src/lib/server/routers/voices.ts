import { ORPCError } from '@orpc/server'
import z from 'zod'
import { prisma } from '../db'
import { orgProceure } from '../orpc'
import { deleteAudio } from '../r2'

export const listVoices = orgProceure.route({
  path: '/voices',
  method: 'GET',
  tags: ['voices'],
  summary: 'List voices',
}).input(
  z.object({
    query: z.string().trim().optional(),
  }).optional(),
).handler(async ({ input, context }) => {
  const searchFilter = input?.query
    ? {
        OR: [
          {
            name: {
              contains: input.query,
              mode: 'insensitive' as const,
            },
          },
          {
            description: {
              contains: input.query,
              mode: 'insensitive' as const,
            },
          },
        ],
      }
    : {}

  const [custom, system] = await Promise.all([
    prisma.voice.findMany({
      where: {
        variant: 'CUSTOM',
        orgId: context.orgId,
        ...searchFilter,
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        language: true,
        variant: true,
      },
    }),
    prisma.voice.findMany({
      where: {
        variant: 'SYSTEM',
        ...searchFilter,
      },
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        language: true,
        variant: true,
      },
    }),
  ])

  return { custom, system }
})

export const deleteVoice = orgProceure.route({
  path: '/voices/:id',
  method: 'DELETE',
  tags: ['voices'],
  summary: 'Delete a voice',
}).input(
  z.object({
    id: z.string(),
  }),
).handler(async ({ input, context }) => {
  const voice = await prisma.voice.findUnique({
    where: {
      id: input.id,
      variant: 'CUSTOM',
      orgId: context.orgId,
    },
    select: { id: true, r2ObjectKey: true },
  })

  if (!voice) {
    throw new ORPCError('NOT_FOUND', {
      message: 'Voice not found',
    })
  }

  await prisma.voice.delete({ where: { id: voice.id } })

  if (voice.r2ObjectKey) {
    // In production, consider background jobs, retires, cron jobs etc.
    await deleteAudio(voice.r2ObjectKey).catch(() => {})
  }

  return { success: true }
})
