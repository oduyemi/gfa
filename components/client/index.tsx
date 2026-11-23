"use client";
import { useState } from "react";
import { ClientCTA } from "./CTA";
import { ContactDialog } from "@/dialogs/contact-dialog";

type ContactType =
  | "creation"
  | "execution"
  | "assistance"
  | "general"
  | null;

export const CTAClient = () => {
  const [dialogType, setDialogType] = useState<ContactType>(null);

  const openDialog = (type: ContactType) => {
    setDialogType(type);
  };

  const closeDialog = () => {
    setDialogType(null);
  };

  return (
    <>
      <ClientCTA
        onStart={() => openDialog("general")}
      />

      <ContactDialog
        type={dialogType}
        onClose={closeDialog}
      />
    </>
  );
};