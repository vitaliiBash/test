const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  await prisma.user.upsert({
    where: { email: 'testuser@example.com' },
    update: {},
    create: {
      email: 'testuser@example.com',
      password: 'testpassword',
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
