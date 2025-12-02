import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Tabs,
  Tab,
  Divider,
  Stack,
} from '@mui/material';
import { School, CalendarMonth, Star, CheckCircle } from '@mui/icons-material';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { AjudaCard } from '@/components/ajuda/AjudaCard';
import { mockMarrecos, mockAjudas } from '@/data/mockData';

export default function Perfil() {
  const [tab, setTab] = useState(0);
  const marreco = mockMarrecos[0];
  const minhasAjudas = mockAjudas.filter((a) => a.marreco._id === marreco._id);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Header />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Container maxWidth="md" sx={{ py: 3 }}>
          <Card sx={{ mb: 3 }}>
            <Box sx={{ height: 120, bgcolor: 'primary.dark' }} />
            <CardContent sx={{ position: 'relative' }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: 'primary.light',
                  fontSize: 40,
                  border: 4,
                  borderColor: 'background.paper',
                  position: 'absolute',
                  top: -50,
                }}
              >
                {marreco.nome.charAt(0)}
              </Avatar>

              <Box sx={{ ml: 14 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="h5" fontWeight={700}>
                    {marreco.nome}
                  </Typography>
                  {marreco.moderador && (
                    <Chip label="Moderador" size="small" color="primary" />
                  )}
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {marreco.biografia || 'Nenhuma biografia adicionada.'}
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <School fontSize="small" sx={{ color: 'text.secondary' }} />
                    <Typography variant="body2">{marreco.curso}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2">{marreco.universidade}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarMonth fontSize="small" sx={{ color: 'text.secondary' }} />
                    <Typography variant="body2">{marreco.semestre}º Semestre</Typography>
                  </Box>
                </Stack>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Stack direction="row" spacing={3} justifyContent="center" textAlign="center">
                <Box>
                  <Typography variant="h4" fontWeight={700}>12</Typography>
                  <Typography variant="body2" color="text.secondary">Ajudas</Typography>
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight={700}>48</Typography>
                  <Typography variant="body2" color="text.secondary">Respostas</Typography>
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                    <Star sx={{ color: 'warning.main' }} />
                    <Typography variant="h4" fontWeight={700}>4.8</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">Avaliação</Typography>
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                    <CheckCircle sx={{ color: 'success.main' }} />
                    <Typography variant="h4" fontWeight={700}>8</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">Resolvidas</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
            <Tab label="Minhas Ajudas" />
            <Tab label="Minhas Respostas" />
            <Tab label="Salvos" />
          </Tabs>

          <Divider sx={{ mb: 3 }} />

          {tab === 0 && minhasAjudas.map((ajuda) => (
            <AjudaCard key={ajuda._id} ajuda={ajuda} />
          ))}

          {tab === 1 && (
            <Typography color="text.secondary" textAlign="center" py={4}>
              Suas respostas aparecerão aqui.
            </Typography>
          )}

          {tab === 2 && (
            <Typography color="text.secondary" textAlign="center" py={4}>
              Itens salvos aparecerão aqui.
            </Typography>
          )}
        </Container>
      </Box>
    </Box>
  );
}
