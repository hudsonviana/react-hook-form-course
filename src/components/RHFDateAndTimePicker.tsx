import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from 'react-hook-form'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

type Props<T extends FieldValues> = {
  name: Path<T>
  label: string
}

export default function RHFDateAndTimePicker<T extends FieldValues>({
  name,
  label,
}: Props<T>) {
  const { control } = useFormContext<T>()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker label={label} {...field} />
        </LocalizationProvider>
      )}
    />
  )
}
