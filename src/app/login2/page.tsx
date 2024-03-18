'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa as AuthUITheme } from '@supabase/auth-ui-shared';
import { createClient } from '@/utils/supabase/client';
import { Zoom, Modal, Box, Container } from '@mui/material';

const supabase = createClient();

const App = () => (
  <Modal open={true}>
    <Zoom in={true} unmountOnExit>
      <Container
        sx={{
          maxWidth: '400px',
          width: '100%',
          bgcolor: '#fff',
          p: '16px',
          borderRadius: '16px',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) !important',
        }}
      >
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: AuthUITheme }}
          providers={[]}
        />
      </Container>
    </Zoom>
  </Modal>
);

export default App;
