import { Skeleton } from '@mantine/core';

function ChatListSkeleton() {
  const array = Array.from(Array(10)).map((_, index) => index);

  return (
    <>
      {array.map((value) => (
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

export default ChatListSkeleton;
