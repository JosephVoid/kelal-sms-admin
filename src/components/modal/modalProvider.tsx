// components/modal/ModalProvider.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { GlobalModal } from "./GlobalModal";

type ModalContextType = {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useGlobalModal() {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("useGlobalModal must be used within ModalProvider");
  return context;
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const openModal = (content: ReactNode) => setModalContent(content);
  const closeModal = () => setModalContent(null);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {/* Modal UI renders here */}
      <GlobalModal
        open={!!modalContent}
        onOpenChange={(open) => (!open ? closeModal() : null)}
      >
        {modalContent}
      </GlobalModal>
    </ModalContext.Provider>
  );
}
