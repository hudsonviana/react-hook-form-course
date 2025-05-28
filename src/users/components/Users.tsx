import { useEffect } from 'react'
import { Stack, TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import type { Schema } from '../types/schema'
import RHFAutocomplete from '../../components/RHFAutocomplete'

export default function Users() {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<Schema>()

  useEffect(() => {
    const sub = watch((value) => {
      console.log(value)
    })

    return () => sub.unsubscribe()
  }, [watch])

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
      <RHFAutocomplete<Schema>
        name="states"
        label="States"
        options={[
          { id: '1', label: 'California' },
          { id: '2', label: 'Texas' },
        ]}
      />
    </Stack>
  )
}

// PAREI COM 1:08:20
// https://www.youtube.com/watch?v=JyeWoqWsQFo&t=454s
