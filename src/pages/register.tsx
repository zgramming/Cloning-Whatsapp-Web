import Head from 'next/head';

import { Button, Card, LoadingOverlay, PasswordInput, TextInput } from '@mantine/core';
import { isNotEmpty, matches, useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { routes } from '@/utils/routes';
import API from '@/utils/api';
import { errorHandler } from '@/utils/error-handler';

type FormType = {
  name: string;
  phone: string;
  password: string;
};
const initialValues: FormType = {
  name: '',
  phone: '',
  password: '',
};

function Page() {
  const { push } = useRouter();
  const [isLoading, setLoading] = useState(false);

  const form = useForm({
    initialValues,
    validate: {
      name: isNotEmpty('Name is required'),
      phone: (value) => {
        if (isNotEmpty('Phone is required')(value)) return 'Phone is required';
        if (matches(/^\d+$/)(value)) return 'Phone must contain only numbers';
        if (matches(/^08[0-9]{9,}$/)(value)) return 'Phone must start with 08 and at least 11 characters long';

        return null;
      },
      password: (value) => (value.length < 8 ? 'Password must be at least 8 characters long' : null),
    },
  });

  const onSubmit = async (values: FormType) => {
    try {
      setLoading(true);
      const result = await API.register(values);

      notifications.show({
        title: 'Success',
        message: result.message,
        color: 'green',
      });
      push(routes.login);
    } catch (error) {
      const result = errorHandler(error);

      notifications.show({
        title: 'Error',
        message: result.message,
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Register" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col justify-center items-center min-h-screen bg-primary-teal">
        <Card shadow="md" padding="xl">
          <LoadingOverlay visible={isLoading} overlayBlur={2} />

          <form className="flex flex-col gap-5" onSubmit={form.onSubmit(onSubmit)}>
            <h1 className="text-2xl font-bold text-center">Register</h1>
            <TextInput placeholder="Masukkan Nama" label="Nama" {...form.getInputProps('name')} withAsterisk />
            <TextInput
              placeholder="Masukkan Nomor Telephone"
              description="Hanya formalitas saja"
              label="Nomor Telephone"
              {...form.getInputProps('phone')}
              withAsterisk
            />
            <PasswordInput
              placeholder="Password"
              label="Password"
              description="Password must be at least 8 characters long"
              {...form.getInputProps('password')}
              withAsterisk
            />
            <Button type="submit">Register</Button>
            <div className="text-center font-light">
              Sudah punya account ?
              <Button
                variant="subtle"
                onClick={() => {
                  push(routes.login);
                }}
              >
                Login Sekarang
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </>
  );
}

export default Page;
