import React from 'react';
import { MainLayout } from 'features/layouts';
import { ContactForm } from 'features/supports/contact/createContact/ContactForm';

export const Contact: React.FC = () => {
  return (
    <>
      <MainLayout>
        <ContactForm />
      </MainLayout>
    </>
  );
};
