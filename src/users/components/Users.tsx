import { Fragment, useEffect } from 'react'
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
  Typography,
} from '@mui/material'
import {
  useFieldArray,
  useFormContext,
  useWatch,
  type SubmitHandler,
} from 'react-hook-form'
import { defaultValues, schema, type Schema } from '../types/schema'
import RHFAutocomplete from '../../components/RHFAutocomplete'
import {
  useGenders,
  useLanguages,
  useSkills,
  useStates,
  useUser,
  useUsers,
} from '../services/queries'
import RHFToggleButtonGroup from '../../components/RHFToggleButtonGroup'
import RHFRadioGroup from '../../components/RHFRadioGroup'
import RHFCheckbox from '../../components/RHFCheckbox'
import RHFDateAndTimePicker from '../../components/RHFDateAndTimePicker'
import RHFDateRangePicker from '../../components/RHFDateRangePicker'
import RHFSlider from '../../components/RHFSlider'
import RHFSwitch from '../../components/RHFSwitch'
import RHFTextField from '../../components/RHFTextField'
import { useCreateUser, useEditUser } from '../services/mutations'

export default function Users() {
  const stateQuery = useStates()
  const languagesQuery = useLanguages()
  const genderQuery = useGenders()
  const skillsQuery = useSkills()
  const usersQuery = useUsers()

  const { watch, control, unregister, reset, setValue, getValues, handleSubmit } =
    useFormContext<Schema>()

  const id = useWatch({ control, name: 'id' })
  const variant = useWatch({ control, name: 'variant' })

  const userQuery = useUser(id)

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

  const handleUserClick = (id: string) => {
    setValue('id', id)
  }

  useEffect(() => {
    if (!isTeacher) {
      replace([])
      unregister('students')
    }
  }, [isTeacher, replace, unregister])

  useEffect(() => {
    if (userQuery.data) {
      reset(userQuery.data)
    }
  }, [reset, userQuery.data])

  const handleReset = () => {
    reset(defaultValues)
  }

  const createUserMutation = useCreateUser()
  const editUserMutation = useEditUser()

  const onSubmit: SubmitHandler<Schema> = (data) => {
    if (variant === 'create') {
      createUserMutation.mutate(data)
    }

    if (variant === 'edit') {
      editUserMutation.mutate(data)
    }
  }

  return (
    <Container maxWidth="sm" component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ flexDirection: 'row', gap: 2 }}>
        <List subheader={<ListSubheader>Users</ListSubheader>}>
          {usersQuery.data?.map((user) => (
            <ListItem disablePadding key={user.id}>
              <ListItemButton
                onClick={() => handleUserClick(user.id)}
                selected={id === user.id}
              >
                <ListItemText primary={user.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

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
          <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button type="submit" variant="contained">
              {variant === 'create' ? 'New User' : 'Edit User'}
            </Button>
            <button onClick={()=> schema.parse(getValues())}>Parse</button>
            <Button onClick={handleReset}>Reset</Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}

// https://www.youtube.com/watch?v=JyeWoqWsQFo
// Parei com 2:28:00
