type Create = {
  variant: 'create'
}

type Edit = {
  variant: 'edit'
  id: number
}

export type ApiCommon = {
  email: string
  formerEmploymentPeriod: [string, string]
  name: string
  gender: string
  languagesSpoken: string[]
  registrationDateAndTime: string
  salaryRange: [number, number]
  skills: string[]
  states: string[]
  isTeacher: boolean
  students: {
    name: string
  }[]
}

export type ApiCreateEdit = ApiCommon & (Create | Edit)
export type ApiGet = Edit & ApiCommon
