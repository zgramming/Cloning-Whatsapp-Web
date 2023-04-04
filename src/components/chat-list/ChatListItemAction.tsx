function ChatListItemAction() {
  const time = new Date().toLocaleTimeString('id-ID', {
    timeStyle: 'short',
  });
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs text-primary-tealdark">{time}</div>
    </div>
  );
}

export default ChatListItemAction;
