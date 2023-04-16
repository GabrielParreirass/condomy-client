import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const user = await prisma.user.create({
        data: {
            name: "Gabrierl",
            password: "123",
            email:"ggg@prisma.com",
        }
    })

  res.status(200).json(user)
}
