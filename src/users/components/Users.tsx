import { Stack, TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import type { Schema } from '../types/schema'
import RHFAutocomplete from '../../components/RHFAutocomplete'

export default function Users() {
  const {
    register,
    formState: { errors },
  } = useFormContext<Schema>()

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
      <RHFAutocomplete<Schema> name="states" />
    </Stack>
  )
}

// PAREI COM 39:52
// https://www.youtube.com/watch?v=JyeWoqWsQFo&t=454s
