import { Box, Paper, Typography, TextField, Button, Link } from '@mui/material'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

type LoginForm = z.infer<typeof loginSchema>

function LoginPage() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginForm) => {
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
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: 420,
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
            Entre na sua conta
          </Typography>
        </Box>

        {/* Formulário */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="E-mail"
            type="email"
            fullWidth
            size="small"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Senha"
            type="password"
            fullWidth
            size="small"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link
              onClick={() => navigate('/recuperar-senha')}
              sx={{ fontSize: 12, color: '#9E9E9E', cursor: 'pointer', textDecoration: 'none', '&:hover': { color: '#212121' } }}
            >
              Esqueci minha senha
            </Link>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 1, height: 44, fontSize: 14 }}
          >
            Entrar
          </Button>

          <Typography sx={{ fontSize: 12, color: '#9E9E9E', textAlign: 'center', mt: 1 }}>
            Não tenho conta —{' '}
            <Link
              onClick={() => navigate('/cadastro')}
              sx={{ color: '#212121', fontWeight: 600, cursor: 'pointer', textDecoration: 'none' }}
            >
              Criar conta
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  )
}

export default LoginPage