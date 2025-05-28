import { Autocomplete } from '@mui/material'
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from 'react-hook-form'

type Props<T extends FieldValues> = {
  name: Path<T>
}

export default function RHFAutocomplete<T extends FieldValues>({
  name,
}: Props<T>) {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={(params) => <Autocomplete />}
    />
  )
}
