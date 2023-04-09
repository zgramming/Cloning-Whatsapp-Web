import { Button, Card, Group, Text } from '@mantine/core';
import Image from 'next/image';

import ImageUnsupport from '../../public/images/unsupport-mobile-view.png';

function Page() {
  return (
    <div className="min-h-screen bg-primary-teal">
      <div className="flex flex-col items-center justify-center min-h-screen p-5">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section className="relative w-full h-56">
            <Image alt="Unsupport mobile view" src={ImageUnsupport} fill />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>Unsupport Mobile View</Text>
          </Group>

          <Text size="sm" color="dimmed">
            Web ini belum support untuk mobile view, silahkan gunakan laptop atau PC untuk mengakses web ini.
          </Text>

          <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            Ayay Captain !
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Page;
