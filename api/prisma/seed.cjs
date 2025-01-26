const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  await prisma.user.upsert({
    where: { email: 'testuser@example.com' },
    update: {},
    create: {
      email: 'testuser@example.com',
      password: 'testpassword',
      userRole: {
        create: {
          role: 'admin'
        }
      }
    },
  });

  await prisma.user.upsert({
    where: { email: 'teacher@example.com' },
    update: {},
    create: {
      email: 'teacher@example.com',
      password: 'testpassword',
      userRole: {
        create: {
          role: 'teacher'
        }
      },
      sections: {
        create: {
          subject: {
            create: {
              name: "my subject",
            }
          },
          schedule: {
            create: {
              classroom: {
                create: {
                  name: 'test'
                }
              },
              day: 'monday',
              startTime: new Date('2025-01-25T08:30:00.000Z'),
              endTime: new Date('2025-01-25T09:20:00.000Z')
            }
          }
        },
      }
    },
  });

  await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      email: 'studant@example.com',
      password: 'testpassword',
      userRole: {
        create: {
          role: 'student'
        }
      }
    },
  });

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
