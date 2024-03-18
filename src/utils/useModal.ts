import * as React from 'react';

// useModal 훅의 반환 타입을 정의합니다.
interface UseModalReturn {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
}

// useModal 훅 구현
const useModal = (): UseModalReturn => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  // 모달을 열기 위한 함수
  const openModal = React.useCallback(() => {
    setIsModalOpen(true);
  }, []);

  // 모달을 닫기 위한 함수
  const closeModal = React.useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // 모달의 열림/닫힘 상태를 토글하는 함수
  const toggleModal = React.useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);

  return { isModalOpen, openModal, closeModal, toggleModal };
};

export default useModal;
