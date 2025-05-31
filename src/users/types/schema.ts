import { z } from 'zod'
import { patterns } from '../../constants'

export const schema = z.object({
  name: z.string().min(1, { message: 'Requerido' }),
  email: z
    .string()
    .min(1, { message: 'Email requerido' })
    .refine((text) => patterns.email.test(text), {
      message: 'Email inválido',
    }),
  states: z.array(z.string()).min(1).max(2),
  languagesSpoken: z.array(z.string()),
  gender: z.string().min(1),
  skills: z.array(z.string()).max(2),
  registrationDateAndTime: z.date(),
  formerEmploymentPeriod: z.array(z.date()).length(2),
  salaryRange: z.array(z.number()).min(2).max(2),
})

export type Schema = z.infer<typeof schema>

export const defaultValues: Schema = {
  email: '',
  name: '',
  states: [],
  languagesSpoken: [],
  gender: '',
  skills: [],
  registrationDateAndTime: new Date(),
  formerEmploymentPeriod: [new Date(), new Date()],
  salaryRange: [0, 2000],
}
