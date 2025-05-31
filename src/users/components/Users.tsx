import { Fragment, useEffect } from 'react'
import { Button, Stack, Typography } from '@mui/material'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import type { Schema } from '../types/schema'
import RHFAutocomplete from '../../components/RHFAutocomplete'
import {
  useGenders,
  useLanguages,
  useSkills,
  useStates,
} from '../services/queries'
import RHFToggleButtonGroup from '../../components/RHFToggleButtonGroup'
import RHFRadioGroup from '../../components/RHFRadioGroup'
import RHFCheckbox from '../../components/RHFCheckbox'
import RHFDateAndTimePicker from '../../components/RHFDateAndTimePicker'
import RHFDateRangePicker from '../../components/RHFDateRangePicker'
import RHFSlider from '../../components/RHFSlider'
import RHFSwitch from '../../components/RHFSwitch'
import RHFTextField from '../../components/RHFTextField'

export default function Users() {
  const stateQuery = useStates()
  const languagesQuery = useLanguages()
  const genderQuery = useGenders()
  const skillsQuery = useSkills()

  const {
    register,
    formState: { errors },
    watch,
    control,
    unregister,
  } = useFormContext<Schema>()

  useEffect(() => {
    const sub = watch((value) => {
      console.log(value)
    })

    return () => sub.unsubscribe()
  }, [watch])

  const isTeacher = useWatch({ control, name: 'isTeacher' })

  const { append, fields, remove, replace } = useFieldArray({
    control,
    name: 'students',
  })

  useEffect(() => {
    if (!isTeacher) {
      replace([])
      unregister('students')
    }
  }, [isTeacher, replace, unregister])

  return (
    <Stack sx={{ gap: 2 }}>
      <RHFTextField<Schema> name="name" label="Name" />

      <RHFTextField<Schema> name="email" label="Email" />

      <RHFAutocomplete<Schema>
        name="states"
        label="States"
        options={stateQuery.data}
      />

      <RHFToggleButtonGroup<Schema>
        name="languagesSpoken"
        options={languagesQuery.data}
      />

      <RHFRadioGroup<Schema>
        name="gender"
        options={genderQuery.data}
        label="Gender"
      />

      <RHFCheckbox<Schema>
        name="skills"
        options={skillsQuery.data}
        label="skills"
      />

      <RHFDateAndTimePicker<Schema>
        name="registrationDateAndTime"
        label="Registration Date And Time"
      />

      <Typography>Former Employmnent Period:</Typography>
      <RHFDateRangePicker<Schema> name="formerEmploymentPeriod" />

      <RHFSlider<Schema> name="salaryRange" label="Salary Range" />

      <RHFSwitch<Schema> name="isTeacher" label="Are you a teacher?" />

      {isTeacher && (
        <Button onClick={() => append({ name: '' })} type="button">
          Add new Student
        </Button>
      )}

      {fields.map((field, index) => (
        <Fragment key={field.id}>
          <RHFTextField name={`students.${index}.name`} label="Name" />
          <Button color="error" onClick={() => remove(index)} type="button">
            Remove
          </Button>
        </Fragment>
      ))}
    </Stack>
  )
}

// https://www.youtube.com/watch?v=JyeWoqWsQFo
// Parei com 1:45:30
