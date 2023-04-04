import { Skeleton } from '@mantine/core';

function ChatListSkeleton() {
  return (
    <>
      {Array.from<number>({ length: 10 }).map((_) => (
        <div key={_}>
          <Skeleton height={50} circle mb="xl" />
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} mt={6} radius="xl" />
          <Skeleton height={8} mt={6} width="70%" radius="xl" />
        </div>
      ))}
    </>
  );
}

export default ChatListSkeleton;
