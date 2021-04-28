import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default NextAuth({
  providers: [
    Providers.Twitch({
        clientId: process.env.TWITCH_CLIENT_ID,
        clientSecret: process.env.TWITCH_CLIENT_SECRET
      }),
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
})