import { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Button,
  TextField,
  Collapse,
  Rating,
} from '@mui/material';
import { ThumbUp, ThumbDown, Reply, ExpandMore, ExpandLess } from '@mui/icons-material';
import { Resposta } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface RespostaCardProps {
  resposta: Resposta;
  nivel?: number;
}

export function RespostaCard({ resposta, nivel = 0 }: RespostaCardProps) {
  const [showReplies, setShowReplies] = useState(nivel < 2);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');

  const hasReplies = resposta.respostas && resposta.respostas.length > 0;

  return (
    <Box
      sx={{
        ml: nivel * 3,
        pl: 2,
        borderLeft: nivel > 0 ? 2 : 0,
        borderColor: 'divider',
        mb: 2,
      }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.light' }}>
          {resposta.marreco.nome.charAt(0)}
        </Avatar>

        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Typography variant="subtitle2" fontWeight={600}>
              {resposta.marreco.nome}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {resposta.marreco.curso} • {resposta.marreco.semestre}º sem
            </Typography>
            <Typography variant="caption" color="text.secondary">
              • {formatDistanceToNow(new Date(resposta.data), { addSuffix: true, locale: ptBR })}
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ mb: 1 }}>
            {resposta.corpo}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton size="small"><ThumbUp fontSize="small" /></IconButton>
            <Typography variant="caption">12</Typography>
            <IconButton size="small"><ThumbDown fontSize="small" /></IconButton>

            <Button
              size="small"
              startIcon={<Reply />}
              onClick={() => setShowReplyInput(!showReplyInput)}
              sx={{ ml: 1 }}
            >
              Responder
            </Button>

            <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Rating
                value={resposta.avaliacao}
                max={5}
                size="small"
                readOnly
              />
              {resposta.avaliacao === 5 && (
                <Typography variant="caption" color="success.main" fontWeight={600}>
                  AJUDOU LEGAL!
                </Typography>
              )}
            </Box>
          </Box>

          <Collapse in={showReplyInput}>
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                size="small"
                multiline
                rows={2}
                placeholder="Escreva sua resposta..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                <Button variant="contained" size="small">Enviar</Button>
                <Button size="small" onClick={() => setShowReplyInput(false)}>Cancelar</Button>
              </Box>
            </Box>
          </Collapse>

          {hasReplies && (
            <Button
              size="small"
              startIcon={showReplies ? <ExpandLess /> : <ExpandMore />}
              onClick={() => setShowReplies(!showReplies)}
              sx={{ mt: 1 }}
            >
              {showReplies ? 'Ocultar' : 'Ver'} {resposta.respostas.length} respostas
            </Button>
          )}

          <Collapse in={showReplies}>
            {resposta.respostas?.map((r) => (
              <RespostaCard key={r._id} resposta={r} nivel={nivel + 1} />
            ))}
          </Collapse>
        </Box>
      </Box>
    </Box>
  );
}
