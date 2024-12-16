import { z } from 'zod'

const AppConfigSchema = z.object({
  api: z.object({
    apiPort: z.coerce.number(),
  }),
})

export type AppConfigType = z.infer<typeof AppConfigSchema>

export default async (): Promise<AppConfigType> => {
  const configObject: AppConfigType = {
    api: {
      apiPort: Number(process.env.PORT),
    },
  }

  const result = await AppConfigSchema.parseAsync(configObject)

  return result
}
