import { useForm } from 'react-hook-form'

export default function Users() {
  const {
    register,
    formState: { errors },
  } = useForm<{ email: string }>({ mode: 'all' })

  return (
    <div>
      <input
        type="text"
        {...register('email', {
          required: { value: true, message: 'O email é obrigatório' },
          maxLength: { value: 10, message: 'Muitos caracteres' },
        })}
        placeholder="Email"
      />
      <p>{errors.email?.message}</p>
    </div>
  )
}
