import { useState } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  Alert,
} from '@mui/material';
import { Send } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';

const categorias = [
  'Engenharia Civil',
  'Engenharia Elétrica',
  'Engenharia Mecânica',
  'Engenharia de Computação',
  'Engenharia Química',
  'Engenharia de Produção',
  'Outras',
];

export default function NovaAjuda() {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [corpo, setCorpo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [prioridade, setPrioridade] = useState('media');

  const handleSubmit = () => {
    console.log({ titulo, corpo, categoria, prioridade });
    navigate('/');
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Header />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Container maxWidth="md" sx={{ py: 3 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Pedir Ajuda
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Descreva sua dúvida de forma clara e detalhada. Quanto mais informações, melhor!
          </Typography>

          <Card>
            <CardContent sx={{ p: 3 }}>
              <TextField
                fullWidth
                label="Título"
                placeholder="Ex: Como calcular momento fletor em viga contínua?"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                sx={{ mb: 3 }}
              />

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Categoria</InputLabel>
                <Select value={categoria} label="Categoria" onChange={(e) => setCategoria(e.target.value)}>
                  {categorias.map((cat) => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>Prioridade</Typography>
                <ToggleButtonGroup
                  value={prioridade}
                  exclusive
                  onChange={(_, value) => value && setPrioridade(value)}
                  fullWidth
                >
                  <ToggleButton value="baixa" sx={{ color: 'success.main' }}>
                    Baixa
                  </ToggleButton>
                  <ToggleButton value="media" sx={{ color: 'warning.main' }}>
                    Média
                  </ToggleButton>
                  <ToggleButton value="me_ajuda_ai_marreco" sx={{ color: 'error.main' }}>
                    ME AJUDA AÍ MARRECO!
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>

              {prioridade === 'me_ajuda_ai_marreco' && (
                <Alert severity="warning" sx={{ mb: 3 }}>
                  Use esta prioridade apenas para dúvidas urgentes, como provas ou trabalhos com prazo curto!
                </Alert>
              )}

              <TextField
                fullWidth
                multiline
                rows={8}
                label="Descrição"
                placeholder="Descreva sua dúvida em detalhes. Inclua o que você já tentou, fórmulas relevantes, e qualquer contexto importante..."
                value={corpo}
                onChange={(e) => setCorpo(e.target.value)}
                sx={{ mb: 3 }}
              />

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button onClick={() => navigate('/')}>Cancelar</Button>
                <Button
                  variant="contained"
                  startIcon={<Send />}
                  onClick={handleSubmit}
                  disabled={!titulo || !corpo || !categoria}
                >
                  Publicar Ajuda
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}
