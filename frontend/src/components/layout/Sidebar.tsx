import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Divider,
  Typography,
} from '@mui/material'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined'
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

const DRAWER_WIDTH = 220
const DRAWER_MINI = 64

const navItems = [
  {
    section: 'Principal',
    items: [
      { label: 'Dashboard', icon: <DashboardOutlinedIcon />, path: '/dashboard' },
    ],
  },
  {
    section: 'Financeiro',
    items: [
      { label: 'Transações', icon: <SwapVertOutlinedIcon />, path: '/transacoes' },
      { label: 'Contas', icon: <ReceiptLongOutlinedIcon />, path: '/contas' },
      { label: 'Fluxo de Caixa', icon: <AccountBalanceWalletOutlinedIcon />, path: '/fluxo-de-caixa' },
    ],
  },
  {
    section: 'Configurações',
    items: [
      { label: 'Categorias', icon: <CategoryOutlinedIcon />, path: '/categorias' },
      { label: 'Empresa', icon: <BusinessOutlinedIcon />, path: '/empresa' },
    ],
  },
]

function Sidebar() {
  const [open, setOpen] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  const toggleSidebar = () => setOpen(prev => !prev)

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? DRAWER_WIDTH : DRAWER_MINI,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        transition: 'width 0.2s ease',
        '& .MuiDrawer-paper': {
          width: open ? DRAWER_WIDTH : DRAWER_MINI,
          overflowX: 'hidden',
          backgroundColor: '#1A1A1A',
          borderRight: 'none',
          transition: 'width 0.2s ease',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: open ? 'space-between' : 'center',
          px: open ? 2.5 : 1,
          py: 2,
          borderBottom: '1px solid #2A2A2A',
          minHeight: 64,
        }}
      >
        {open && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              component="img"
              src="/src/assets/pjfin-logo-dark.svg"
              alt="PJFin"
              sx={{ width: 28, height: 28 }}
            />
            <Typography
              sx={{ color: '#FFFFFF', fontWeight: 700, fontSize: 16, letterSpacing: '-0.3px' }}
            >
              PJFin
            </Typography>
          </Box>
        )}
        {!open && (
          <Box
            component="img"
            src="/src/assets/pjfin-logo-dark.svg"
            alt="PJFin"
            sx={{ width: 28, height: 28 }}
          />
        )}
        <IconButton onClick={toggleSidebar} sx={{ color: '#555' }}>
            {open ? <ChevronLeftIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
        </IconButton>
      </Box>

      {/* Nav items */}
      <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', py: 1 }}>
        {navItems.map((group) => (
          <Box key={group.section}>
            {open && (
              <Typography
                sx={{
                  px: 2.5,
                  pt: 2,
                  pb: 0.5,
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1.2px',
                  color: '#444',
                }}
              >
                {group.section}
              </Typography>
            )}
            {!open && <Divider sx={{ borderColor: '#2A2A2A', my: 1 }} />}
            <List disablePadding>
              {group.items.map((item) => {
                const isActive = location.pathname === item.path

                return (
                  <Tooltip
                    key={item.path}
                    title={!open ? item.label : ''}
                    placement="right"
                  >
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => navigate(item.path)}
                        sx={{
                          px: open ? 2.5 : 0,
                          py: 1,
                          justifyContent: open ? 'flex-start' : 'center',
                          borderLeft: isActive ? '3px solid #FFFFFF' : '3px solid transparent',
                          backgroundColor: isActive ? '#2A2A2A' : 'transparent',
                          '&:hover': { backgroundColor: '#242424' },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            color: isActive ? '#FFFFFF' : '#666',
                            minWidth: open ? 36 : 'unset',
                            justifyContent: 'center',
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        {open && (
                          <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{
                              fontSize: 13,
                              fontWeight: isActive ? 600 : 400,
                              color: isActive ? '#FFFFFF' : '#888',
                            }}
                          />
                        )}
                      </ListItemButton>
                    </ListItem>
                  </Tooltip>
                )
              })}
            </List>
          </Box>
        ))}
      </Box>

      {/* Botão de expandir quando recolhida */}
      {!open && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            py: 1.5,
            borderTop: '1px solid #2A2A2A',
          }}
        >
          <IconButton onClick={toggleSidebar} sx={{ color: '#555' }}>
            <ChevronRightIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Drawer>
  )
}

export default Sidebar