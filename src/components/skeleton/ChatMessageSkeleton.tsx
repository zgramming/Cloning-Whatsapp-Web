import { Skeleton } from '@mantine/core';

function ChatMessageSkeleton() {
  const array = Array.from(Array(10)).map((_, index) => index);

  return (
    <>
      {array.map((value) => (
        <div key={`${value}_key`}>
          <Skeleton height={50} circle mb="xl" />
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} mt={6} radius="xl" />
          <Skeleton height={8} mt={6} width="70%" radius="xl" />
        </div>
      ))}
    </>
  );
}

export default ChatMessageSkeleton;
