import { Box, Paper, Typography, TextField, Button, Link } from '@mui/material'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'

const forgotSchema = z.object({
  email: z.string().email('E-mail inválido'),
})

type ForgotForm = z.infer<typeof forgotSchema>

function ForgotPasswordPage() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotForm>({
    resolver: zodResolver(forgotSchema),
  })

  const onSubmit = (data: ForgotForm) => {
    console.log(data)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
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
          border: '1px solid',
          borderColor: 'divider',
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
          <Typography sx={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.5px', color: 'text.primary' }}>
            PJFin
          </Typography>
          <Typography sx={{ fontSize: 13, color: 'text.secondary', mt: 0.5 }}>
            Recuperar senha
          </Typography>
        </Box>

        <Typography sx={{ fontSize: 13, color: 'text.secondary', textAlign: 'center', mb: 3, lineHeight: 1.6 }}>
          Informe seu e-mail e enviaremos um link para redefinir sua senha.
        </Typography>

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

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 1, height: 44, fontSize: 14 }}
          >
            Enviar link de recuperação
          </Button>

          <Typography sx={{ fontSize: 12, color: 'text.secondary', textAlign: 'center', mt: 1 }}>
            <Link
              onClick={() => navigate('/login')}
              sx={{ color: 'text.primary', fontWeight: 600, cursor: 'pointer', textDecoration: 'none' }}
            >
              Voltar para o login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  )
}

export default ForgotPasswordPage