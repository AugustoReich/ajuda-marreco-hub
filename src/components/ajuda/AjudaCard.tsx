import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  IconButton,
  Stack,
} from '@mui/material';
import {
  ChatBubbleOutline,
  ThumbUp,
  ThumbDown,
  CheckCircle,
  Schedule,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Ajuda, Prioridade } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface AjudaCardProps {
  ajuda: Ajuda;
}

const prioridadeConfig: Record<Prioridade, { label: string; color: string }> = {
  baixa: { label: 'Baixa', color: '#48bb78' },
  media: { label: 'Média', color: '#ed8936' },
  me_ajuda_ai_marreco: { label: 'ME AJUDA AÍ MARRECO!', color: '#fc8181' },
};

export function AjudaCard({ ajuda }: AjudaCardProps) {
  const navigate = useNavigate();
  const prioridade = prioridadeConfig[ajuda.prioridade];

  return (
    <Card
      sx={{
        mb: 2,
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': {
          bgcolor: 'rgba(255,255,255,0.03)',
          transform: 'translateY(-2px)',
        },
      }}
      onClick={() => navigate(`/ajuda/${ajuda._id}`)}
    >
      <CardContent>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
            <IconButton size="small"><ThumbUp fontSize="small" /></IconButton>
            <Typography variant="body2" fontWeight={600}>42</Typography>
            <IconButton size="small"><ThumbDown fontSize="small" /></IconButton>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <Chip
                label={prioridade.label}
                size="small"
                sx={{ bgcolor: prioridade.color, color: 'white', fontWeight: 600 }}
              />
              <Chip label={ajuda.categoria} size="small" variant="outlined" />
              {ajuda.resolvida && (
                <Chip
                  icon={<CheckCircle />}
                  label="Resolvida"
                  size="small"
                  sx={{ bgcolor: 'success.main', color: 'white' }}
                />
              )}
            </Stack>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              {ajuda.titulo}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {ajuda.corpo.length > 200 ? `${ajuda.corpo.substring(0, 200)}...` : ajuda.corpo}
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.light' }}>
                  {ajuda.marreco.nome.charAt(0)}
                </Avatar>
                <Typography variant="caption" color="text.secondary">
                  {ajuda.marreco.nome} • {ajuda.marreco.curso}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Schedule fontSize="small" sx={{ color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary">
                  {formatDistanceToNow(new Date(ajuda.data), { addSuffix: true, locale: ptBR })}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ChatBubbleOutline fontSize="small" sx={{ color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary">
                  {ajuda.respostas.length} respostas
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
