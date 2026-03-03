
import { Box, Paper, Typography } from '@mui/material'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from 'recharts'

const kpis = [
  { label: 'Receita do Mês', value: 'R$ 3.500,00', sub: 'Total de entradas' },
  { label: 'Despesas do Mês', value: 'R$ 1.630,00', sub: 'Total de saídas' },
  { label: 'Lucro', value: 'R$ 1.870,00', sub: 'Receita − Despesas' },
  { label: 'Saldo em Caixa', value: 'R$ 1.870,00', sub: 'Saldo atual' },
]

const barData = [
  { mes: 'Out', entradas: 2800, saidas: 1200 },
  { mes: 'Nov', entradas: 3200, saidas: 1800 },
  { mes: 'Dez', entradas: 2900, saidas: 2100 },
  { mes: 'Jan', entradas: 4100, saidas: 1500 },
  { mes: 'Fev', entradas: 3500, saidas: 1630 },
]

const lineData = [
  { mes: 'Out', saldo: 1600 },
  { mes: 'Nov', saldo: 1400 },
  { mes: 'Dez', saldo: 800 },
  { mes: 'Jan', saldo: 2600 },
  { mes: 'Fev', saldo: 1870 },
]

const ultimasTransacoes = [
  { descricao: 'Serviço prestado', categoria: 'Serviços', data: '20/02/2026', tipo: 'Entrada', valor: 'R$ 3.500,00', status: 'Pago' },
  { descricao: 'Aluguel escritório', categoria: 'Aluguel', data: '15/02/2026', tipo: 'Saída', valor: 'R$ 1.200,00', status: 'Pago' },
  { descricao: 'Plano internet', categoria: 'Internet', data: '10/02/2026', tipo: 'Saída', valor: 'R$ 150,00', status: 'Pendente' },
  { descricao: 'Energia elétrica', categoria: 'Energia', data: '05/02/2026', tipo: 'Saída', valor: 'R$ 280,00', status: 'Vencido' },
]

const statusColor: Record<string, string> = {
  Pago: '#424242',
  Pendente: '#9E9E9E',
  Vencido: '#616161',
}

const tipoColor: Record<string, string> = {
  Entrada: '#212121',
  Saída: '#757575',
}

function DashboardPage() {
  return (
    <Box>
      {/* KPI Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 3 }}>
        {kpis.map((kpi) => (
          <Paper
            key={kpi.label}
            elevation={0}
            sx={{ p: 2.5, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}
          >
            <Typography sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'text.secondary', mb: 1 }}>
              {kpi.label}
            </Typography>
            <Typography sx={{ fontSize: 22, fontWeight: 700, color: 'text.primary', letterSpacing: '-0.5px' }}>
              {kpi.value}
            </Typography>
            <Typography sx={{ fontSize: 11, color: 'text.secondary', mt: 0.5 }}>
              {kpi.sub}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Gráficos */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
        {/* Entradas x Saídas */}
        <Paper elevation={0} sx={{ p: 2.5, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: 'text.primary', mb: 2 }}>
            Entradas x Saídas
          </Typography>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: '#9E9E9E' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9E9E9E' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E0E0E0', boxShadow: 'none' }}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="entradas" name="Entradas" fill="#616161" radius={[4, 4, 0, 0]} />
              <Bar dataKey="saidas" name="Saídas" fill="#BDBDBD" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>

        {/* Evolução Mensal */}
        <Paper elevation={0} sx={{ p: 2.5, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: 'text.primary', mb: 2 }}>
            Evolução Mensal
          </Typography>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: '#9E9E9E' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9E9E9E' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E0E0E0', boxShadow: 'none' }}
              />
              <Line type="monotone" dataKey="saldo" name="Saldo" stroke="#616161" strokeWidth={2} dot={{ r: 4, fill: '#616161' }} />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Box>

      {/* Tabela de últimas transações */}
      <Paper elevation={0} sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
        <Box sx={{ px: 2.5, py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: 'text.primary' }}>
            Últimas Transações
          </Typography>
        </Box>
        <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
          <Box component="thead">
            <Box component="tr" sx={{ backgroundColor: 'action.hover' }}>
              {['Descrição', 'Categoria', 'Data', 'Tipo', 'Valor', 'Status'].map((col) => (
                <Box
                  key={col}
                  component="th"
                  sx={{ px: 2.5, py: 1.5, textAlign: 'left', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'text.secondary', borderBottom: '1px solid', borderColor: 'divider' }}
                >
                  {col}
                </Box>
              ))}
            </Box>
          </Box>
          <Box component="tbody">
            {ultimasTransacoes.map((t, i) => (
              <Box
                key={i}
                component="tr"
                sx={{ '&:not(:last-child) td': { borderBottom: '1px solid', borderColor: 'divider' }, '&:hover td': { backgroundColor: 'action.hover' } }}
              >
                <Box component="td" sx={{ px: 2.5, py: 1.8, fontSize: 13, color: 'text.primary' }}>{t.descricao}</Box>
                <Box component="td" sx={{ px: 2.5, py: 1.8, fontSize: 13, color: 'text.secondary' }}>{t.categoria}</Box>
                <Box component="td" sx={{ px: 2.5, py: 1.8, fontSize: 13, color: 'text.secondary' }}>{t.data}</Box>
                <Box component="td" sx={{ px: 2.5, py: 1.8 }}>
                  <Box component="span" sx={{ fontSize: 11, fontWeight: 700, color: tipoColor[t.tipo], backgroundColor: 'action.hover', px: 1.2, py: 0.4, borderRadius: 10 }}>
                    {t.tipo}
                  </Box>
                </Box>
                <Box component="td" sx={{ px: 2.5, py: 1.8, fontSize: 13, fontWeight: 600, color: 'text.primary' }}>{t.valor}</Box>
                <Box component="td" sx={{ px: 2.5, py: 1.8 }}>
                  <Box component="span" sx={{ fontSize: 11, fontWeight: 700, color: statusColor[t.status], backgroundColor: 'action.hover', px: 1.2, py: 0.4, borderRadius: 10 }}>
                    {t.status}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default DashboardPage