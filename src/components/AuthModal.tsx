'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa as AuthUITheme } from '@supabase/auth-ui-shared';
import { createClient } from '@/utils/supabase/client';
import { Zoom, Modal, Container } from '@mui/material';

const supabase = createClient();

export default function AuthModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();

  React.useEffect(() => {
    supabase.auth.onAuthStateChange(event => {
      if (event === 'SIGNED_IN') {
        // 로그인 성공 시 리다이렉트할 경로
        onClose();
        router.refresh();
        window.location.reload();
      }
    });
  }, [router, isOpen, onClose]);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Zoom in={isOpen} unmountOnExit>
        <Container
          sx={{
            maxWidth: '400px',
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
}
