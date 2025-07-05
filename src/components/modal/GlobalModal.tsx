"use client";

import { CloseButton, Dialog, Portal } from "@chakra-ui/react";

export function GlobalModal({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (b: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <Dialog.Root
      lazyMount
      open={open}
      onOpenChange={(e) => onOpenChange(e.open)}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content p={5}>
            {children}
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
