'use client';

import * as React from 'react';
import { AppBar, Box, Button } from '@mui/material';
import { createClient } from '@/utils/supabase/client';
import AuthModal from './AuthModal';
import useModal from '@/utils/useModal';

const Header = () => {
  const supabase = createClient();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setIsUserLoggedIn(true);
      }
    };

    checkUser();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();

    window.location.href = '/';
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }}>
          <h3>Header</h3>
          <Button
            onClick={isUserLoggedIn ? signOut : openModal}
            variant="contained"
            color="info"
            sx={{ zIndex: 20 }}
          >
            {isUserLoggedIn ? 'Logout' : 'Login'}
          </Button>
        </AppBar>
      </Box>
      <AuthModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Header;
