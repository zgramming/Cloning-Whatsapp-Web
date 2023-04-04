import { Skeleton } from '@mantine/core';

function ChatMessageSkeleton() {
  return (
    <>
      {Array.from<number>({ length: 10 }).map((value) => (
        <div key={value}>
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
