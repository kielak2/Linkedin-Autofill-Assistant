document.addEventListener('paste', function (e) {
  let pastedText = (e.clipboardData).getData('text');

  if (!pastedText.includes('{name}')) {
    return;
  }

  const activeElement = document.activeElement;

  if (!activeElement || !activeElement.classList.contains('msg-form__contenteditable')) {
    return;
  }

  // Find the closest chat container
  const chatContainer = activeElement.closest('.msg-convo-wrapper');
  if (!chatContainer) {
    return;
  }

  const recipientName = getRecipientNameFromContainer(chatContainer);
  if (!recipientName) {
    return;
  }

  const currentHTML = activeElement.innerHTML;
  const newHTML = currentHTML.replace('{name}', recipientName);
  activeElement.innerHTML = newHTML;

  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(activeElement);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);

  const event = new Event('input', { bubbles: true });
  activeElement.dispatchEvent(event);
});

function getRecipientNameFromContainer(container) {
  const selectors = [
    '.profile-card-one-to-one__profile-link',
    '.msg-compose__profile-link',
    '.msg-entity-lockup__entity-title',
    '.msg-overlay-bubble-header__title',
  ];

  for (const selector of selectors) {
    const element = container.querySelector(selector);

    if (element) {
      const fullName = element.textContent.trim();
      return fullName.split(' ')[0];
    }
  }
  return '';
}