import { Box, IconButton, Typography, Avatar, Tooltip } from '@mui/material'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { useNavigate, useLocation } from 'react-router-dom'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import useThemeStore from '../../store/themeStore'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/transacoes': 'Transações',
  '/contas': 'Contas a Pagar / Receber',
  '/fluxo-de-caixa': 'Fluxo de Caixa',
  '/categorias': 'Categorias',
  '/empresa': 'Dados da Empresa',
  '/perfil': 'Meu Perfil',
}

function Topbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { mode, toggleTheme } = useThemeStore()

  const pageTitle = pageTitles[location.pathname] ?? 'PJFin'

  return (
    <Box
      sx={{
        height: 64,
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E0E0E0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Título da página */}
      <Typography
        sx={{
          fontSize: 18,
          fontWeight: 700,
          color: '#212121',
          letterSpacing: '-0.3px',
        }}
      >
        {pageTitle}
      </Typography>

      {/* Ações */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Tooltip title={mode === 'light' ? 'Modo escuro' : 'Modo claro'}>
          <IconButton sx={{ color: '#9E9E9E' }} onClick={toggleTheme}>
            {mode === 'light' ? (
              <DarkModeOutlinedIcon fontSize="small" />
              ) : (
              <LightModeOutlinedIcon fontSize="small" />
            )}
          </IconButton>
        </Tooltip>
        <Tooltip title="Notificações">
          <IconButton sx={{ color: '#9E9E9E' }}>
            <NotificationsOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Meu perfil">
          <IconButton sx={{ color: '#9E9E9E' }} onClick={() => navigate('/perfil')}>
            <PersonOutlineOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Sair">
          <IconButton sx={{ color: '#9E9E9E' }} onClick={() => navigate('/login')}>
            <LogoutOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Avatar
          sx={{
            width: 32,
            height: 32,
            backgroundColor: '#212121',
            fontSize: 13,
            fontWeight: 700,
            ml: 1,
            cursor: 'pointer',
          }}
          onClick={() => navigate('/perfil')}
        >
          J
        </Avatar>
      </Box>
    </Box>
  )
}

export default Topbar