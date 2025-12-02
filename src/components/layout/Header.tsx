import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  InputBase,
  Box,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import { Search, Add, Notifications } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.08),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(3),
  width: '100%',
  maxWidth: 500,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

export function Header() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider', boxShadow: 1 }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ cursor: 'pointer', fontWeight: 700, color: 'primary.dark' }}
          onClick={() => navigate('/')}
        >
          🦆 Ajuda Aí, Marreco
        </Typography>

        <SearchWrapper>
          <SearchIconWrapper>
            <Search />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Buscar ajudas..." inputProps={{ 'aria-label': 'search' }} />
        </SearchWrapper>

        <Box sx={{ flexGrow: 1 }} />

        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ mr: 2, bgcolor: 'primary.main', color: 'white' }}
          onClick={() => navigate('/nova-ajuda')}
        >
          Pedir Ajuda
        </Button>

        <IconButton sx={{ color: 'text.secondary' }}>
          <Notifications />
        </IconButton>

        <IconButton onClick={handleMenu}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', color: 'white' }}>M</Avatar>
        </IconButton>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={() => { navigate('/perfil'); handleClose(); }}>Meu Perfil</MenuItem>
          <MenuItem onClick={() => { navigate('/minhas-ajudas'); handleClose(); }}>Minhas Ajudas</MenuItem>
          <MenuItem onClick={handleClose}>Sair</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
