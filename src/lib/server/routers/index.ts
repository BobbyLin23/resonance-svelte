import { pub } from '../orpc'

export const router = {
  health: {
    check: pub.route({
      path: '/health/check',
      method: 'GET',
      tags: ['health'],
      summary: 'Check the health of the server',
    }).handler(async () => {
      await new Promise(resolve => setTimeout(resolve, 5000))

      return { status: 'ok', code: 123 }
    }),
  },
}
