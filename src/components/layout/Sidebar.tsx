import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography, Divider, Chip } from '@mui/material';
import {
  Home,
  TrendingUp,
  NewReleases,
  CheckCircle,
  Category,
  School,
  Engineering,
  Architecture,
  ElectricalServices,
  Computer,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const categorias = [
  { nome: 'Engenharia Civil', icone: Architecture },
  { nome: 'Engenharia Elétrica', icone: ElectricalServices },
  { nome: 'Engenharia Mecânica', icone: Engineering },
  { nome: 'Engenharia de Computação', icone: Computer },
  { nome: 'Todas as Engenharias', icone: School },
];

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      sx={{
        width: 260,
        bgcolor: 'background.paper',
        borderRight: 1,
        borderColor: 'divider',
        height: 'calc(100vh - 64px)',
        position: 'sticky',
        top: 64,
        overflowY: 'auto',
      }}
    >
      <List>
        <ListItemButton selected={location.pathname === '/'} onClick={() => navigate('/')}>
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText primary="Início" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate('/?sort=trending')}>
          <ListItemIcon><TrendingUp /></ListItemIcon>
          <ListItemText primary="Em Alta" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate('/?sort=new')}>
          <ListItemIcon><NewReleases /></ListItemIcon>
          <ListItemText primary="Novas" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate('/?filter=resolvidas')}>
          <ListItemIcon><CheckCircle /></ListItemIcon>
          <ListItemText primary="Resolvidas" />
        </ListItemButton>
      </List>

      <Divider sx={{ my: 1 }} />

      <Typography variant="caption" sx={{ px: 2, py: 1, display: 'block', color: 'text.secondary' }}>
        CATEGORIAS
      </Typography>

      <List>
        {categorias.map((cat) => (
          <ListItemButton key={cat.nome} onClick={() => navigate(`/?categoria=${cat.nome}`)}>
            <ListItemIcon><cat.icone /></ListItemIcon>
            <ListItemText primary={cat.nome} />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ my: 1 }} />

      <Box sx={{ p: 2 }}>
        <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
          PRIORIDADE
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Chip label="Baixa" size="small" sx={{ bgcolor: 'success.main', color: 'white' }} />
          <Chip label="Média" size="small" sx={{ bgcolor: 'warning.main', color: 'white' }} />
          <Chip label="ME AJUDA!" size="small" sx={{ bgcolor: 'error.main', color: 'white' }} />
        </Box>
      </Box>
    </Box>
  );
}
