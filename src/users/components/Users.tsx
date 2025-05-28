import { useForm } from 'react-hook-form'
import { Stack, TextField } from '@mui/material'
import { schema, type Schema } from '../types/schema'
import { zodResolver } from '@hookform/resolvers/zod'

export default function Users() {
  const {
    register,
    formState: { errors },
  } = useForm<Schema>({
    mode: 'all',
    resolver: zodResolver(schema),
  })

  return (
    <Stack sx={{ gap: 2 }}>
      <TextField
        {...register('name')}
        label="Nome"
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        {...register('email')}
        label="Email"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
    </Stack>
  )
}

// PAREI COM 39:52
// https://www.youtube.com/watch?v=JyeWoqWsQFo&t=454s
