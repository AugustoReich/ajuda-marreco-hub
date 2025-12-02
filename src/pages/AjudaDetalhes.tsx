import { useState } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  IconButton,
  Button,
  TextField,
  Divider,
  Stack,
  Rating,
} from '@mui/material';
import {
  ThumbUp,
  ThumbDown,
  CheckCircle,
  Schedule,
  Share,
  BookmarkBorder,
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { RespostaCard } from '@/components/ajuda/RespostaCard';
import { mockAjudas } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Prioridade } from '@/types';

const prioridadeConfig: Record<Prioridade, { label: string; color: string }> = {
  baixa: { label: 'Baixa', color: '#48bb78' },
  media: { label: 'Média', color: '#ed8936' },
  me_ajuda_ai_marreco: { label: 'ME AJUDA AÍ MARRECO!', color: '#fc8181' },
};

export default function AjudaDetalhes() {
  const { id } = useParams();
  const [resposta, setResposta] = useState('');
  const [avaliacao, setAvaliacao] = useState<number | null>(null);

  const ajuda = mockAjudas.find((a) => a._id === id) || mockAjudas[0];
  const prioridade = prioridadeConfig[ajuda.prioridade];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Header />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Container maxWidth="md" sx={{ py: 3 }}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                  <IconButton><ThumbUp /></IconButton>
                  <Typography variant="h6" fontWeight={600}>42</Typography>
                  <IconButton><ThumbDown /></IconButton>
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                    <Chip
                      label={prioridade.label}
                      sx={{ bgcolor: prioridade.color, color: 'white', fontWeight: 600 }}
                    />
                    <Chip label={ajuda.categoria} variant="outlined" />
                    {ajuda.resolvida && (
                      <Chip
                        icon={<CheckCircle />}
                        label="Resolvida"
                        sx={{ bgcolor: 'success.main', color: 'white' }}
                      />
                    )}
                  </Stack>

                  <Typography variant="h4" fontWeight={700} gutterBottom>
                    {ajuda.titulo}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Avatar sx={{ bgcolor: 'primary.light' }}>
                      {ajuda.marreco.nome.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {ajuda.marreco.nome}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {ajuda.marreco.curso} • {ajuda.marreco.universidade} • {ajuda.marreco.semestre}º semestre
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 'auto' }}>
                      <Schedule fontSize="small" sx={{ color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        {formatDistanceToNow(new Date(ajuda.data), { addSuffix: true, locale: ptBR })}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
                    {ajuda.corpo}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button startIcon={<Share />} size="small">Compartilhar</Button>
                    <Button startIcon={<BookmarkBorder />} size="small">Salvar</Button>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Sua Resposta
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Compartilhe seu conhecimento e ajude um marreco..."
                value={resposta}
                onChange={(e) => setResposta(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">Avalie sua resposta:</Typography>
                  <Rating value={avaliacao} onChange={(_, value) => setAvaliacao(value)} />
                </Box>
                <Button variant="contained" disabled={!resposta.trim()}>
                  Enviar Resposta
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Typography variant="h6" fontWeight={600} gutterBottom>
            {ajuda.respostas.length} Respostas
          </Typography>

          {ajuda.respostas.map((r) => (
            <Card key={r._id} sx={{ mb: 2 }}>
              <CardContent>
                <RespostaCard resposta={r} />
              </CardContent>
            </Card>
          ))}
        </Container>
      </Box>
    </Box>
  );
}
