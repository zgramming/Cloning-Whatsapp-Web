// eslint-disable-next-line import/prefer-default-export
export const scrollToBottomMessageChat = () => {
  const bottomChatMessage = document.getElementById('bottom-chat-message');

  if (bottomChatMessage) {
    bottomChatMessage.scrollIntoView({ block: 'end' });
  }
};

export const inserCharEveryNCharacter = (str: string = "why i'm so handsome", char: string = '', n: number = 4) => {
  const arr = str.split(''); // convert the string to an array of characters
  for (let i = n; i < arr.length; i += n + 1) {
    // loop through the array every n+1 characters
    arr.splice(i, 0, char); // insert the character at index i
  }
  return arr.join(''); // convert the array back to a stringF
};

export const openInNewTab = (url: string) => {
  const win = window.open(url, '_blank', 'noopener,noreferrer');

  if (win) {
    win.opener = null;
  }
};

// Path: src\utils\function.ts
