import { Box, Paper, Typography, TextField, Button, Link } from '@mui/material'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'

const registerSchema = z.object({
  firstName: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  lastName: z.string().min(2, 'Sobrenome deve ter no mínimo 2 caracteres'),
  companyName: z.string().min(2, 'Nome da empresa deve ter no mínimo 2 caracteres'),
  cnpj: z.string().min(14, 'CNPJ inválido').max(18, 'CNPJ inválido'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
})

type RegisterForm = z.infer<typeof registerSchema>

function RegisterPage() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = (data: RegisterForm) => {
    console.log(data)
    navigate('/dashboard')
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#F5F5F5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: 520,
          p: 5,
          borderRadius: 2,
          border: '1px solid #E0E0E0',
        }}
      >
        {/* Logo e título */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Box
            component="img"
            src="/src/assets/pjfin-logo-light.svg"
            alt="PJFin"
            sx={{ width: 48, height: 48, mb: 2 }}
          />
          <Typography sx={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.5px', color: '#212121' }}>
            PJFin
          </Typography>
          <Typography sx={{ fontSize: 13, color: '#9E9E9E', mt: 0.5 }}>
            Crie sua conta gratuitamente
          </Typography>
        </Box>

        {/* Formulário */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

          {/* Nome e Sobrenome */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Nome"
              fullWidth
              size="small"
              {...register('firstName')}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
            <TextField
              label="Sobrenome"
              fullWidth
              size="small"
              {...register('lastName')}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Box>

          <TextField
            label="Nome da Empresa"
            fullWidth
            size="small"
            {...register('companyName')}
            error={!!errors.companyName}
            helperText={errors.companyName?.message}
          />

          <TextField
            label="CNPJ"
            fullWidth
            size="small"
            placeholder="00.000.000/0001-00"
            {...register('cnpj')}
            error={!!errors.cnpj}
            helperText={errors.cnpj?.message}
          />

          <TextField
            label="E-mail"
            type="email"
            fullWidth
            size="small"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          {/* Senha e Confirmar Senha */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Senha"
              type="password"
              fullWidth
              size="small"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <TextField
              label="Confirmar Senha"
              type="password"
              fullWidth
              size="small"
              {...register('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 1, height: 44, fontSize: 14 }}
          >
            Criar conta
          </Button>

          <Typography sx={{ fontSize: 12, color: '#9E9E9E', textAlign: 'center', mt: 1 }}>
            Já tenho conta —{' '}
            <Link
              onClick={() => navigate('/login')}
              sx={{ color: '#212121', fontWeight: 600, cursor: 'pointer', textDecoration: 'none' }}
            >
              Entrar
            </Link>
          </Typography>

        </Box>
      </Paper>
    </Box>
  )
}

export default RegisterPage