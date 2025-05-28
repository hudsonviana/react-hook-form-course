import { FormProvider, useForm } from 'react-hook-form'
import Users from './Users'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema, type Schema } from '../types/schema'

export default function UsersProvider() {
  const methods = useForm<Schema>({
    mode: 'all',
    resolver: zodResolver(schema),
  })

  return (
    <FormProvider {...methods}>
      <Users />
    </FormProvider>
  )
}
