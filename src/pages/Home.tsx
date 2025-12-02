import { Box, Typography, ToggleButtonGroup, ToggleButton, Container } from '@mui/material';
import { TrendingUp, NewReleases, Whatshot } from '@mui/icons-material';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { AjudaCard } from '@/components/ajuda/AjudaCard';
import { mockAjudas } from '@/data/mockData';

export default function Home() {
  const [sortBy, setSortBy] = useState('hot');

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Header />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Container maxWidth="md" sx={{ py: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" fontWeight={600}>
              Ajudas Recentes
            </Typography>
            <ToggleButtonGroup
              value={sortBy}
              exclusive
              onChange={(_, value) => value && setSortBy(value)}
              size="small"
            >
              <ToggleButton value="hot">
                <Whatshot sx={{ mr: 0.5 }} /> Em Alta
              </ToggleButton>
              <ToggleButton value="new">
                <NewReleases sx={{ mr: 0.5 }} /> Novas
              </ToggleButton>
              <ToggleButton value="top">
                <TrendingUp sx={{ mr: 0.5 }} /> Top
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {mockAjudas.map((ajuda) => (
            <AjudaCard key={ajuda._id} ajuda={ajuda} />
          ))}
        </Container>
      </Box>
    </Box>
  );
}
