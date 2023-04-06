// eslint-disable-next-line import/prefer-default-export
export const scrollToBottomMessageChat = () => {
  const bottomChatMessage = document.getElementById('bottom-chat-message');

  if (bottomChatMessage) {
    bottomChatMessage.scrollIntoView({ block: 'end' });
  }
};
