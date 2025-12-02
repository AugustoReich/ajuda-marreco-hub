import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { theme } from '@/theme/muiTheme';
import Home from '@/pages/Home';
import AjudaDetalhes from '@/pages/AjudaDetalhes';
import NovaAjuda from '@/pages/NovaAjuda';
import Perfil from '@/pages/Perfil';
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ajuda/:id" element={<AjudaDetalhes />} />
          <Route path="/nova-ajuda" element={<NovaAjuda />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
