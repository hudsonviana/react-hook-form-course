type Create = {
  variant: 'create'
}

type Edit = {
  variant: 'edit'
  id: string
}

export type Common = {
  email: string
  formerEmploymentPeriod: [string, string]
  name: string
  gender: string
  languagesSpoken: [string, string]
  registrationDateAndTime: string
  salaryRange: [number, number]
  skills: [string, string]
  states: [string, string]
  isTeacher: boolean
  students: {
    name: string
  }[]
}

export type ApiCreateEdit = Common & (Create | Edit)
export type ApiGet = Edit & Common
