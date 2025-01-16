document.addEventListener('paste', function (e)  {

  let pastedText = (e.clipboardData).getData('text');

  if (!pastedText.includes('{name}')) {
    return;
  }

  const recipientName = getRecipientName();
  if (!recipientName) {
    return;
  }

  const activeElement = document.activeElement;
  if (activeElement && activeElement.classList.contains('msg-form__contenteditable')) {
    const currentHTML = activeElement.innerHTML;
    const newHTML = currentHTML.replace('{name}', recipientName);

    activeElement.innerHTML = newHTML;

    // Move the cursor to the end of the modified content
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(activeElement);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}
)

function getRecipientName() {
  const selectors = [
    'h2.msg-entity-lockup__entity-title',
    '.profile-card-one-to-one__profile-link',
  ];

  for (const selector of selectors) {
    const element = document.querySelector(selector);

    if (element) {
      const fullName = element.textContent.trim();

      return fullName.split(' ')[0];
    }
  }

  return '';
}
