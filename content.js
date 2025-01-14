// Initialize the paste handler function
document.addEventListener('paste', function (e) {

  let pastedText = (e.clipboardData || window.clipboardData).getData('text');

  if (!pastedText.includes('{name}')) {
    console.log('No {name} placeholder found in pasted text');
    return;
  }

  // Find the active chat box
  const activeElement = document.activeElement;

  if (!activeElement || !activeElement.classList.contains('msg-form__contenteditable')) {
    console.log('No active chat box found');
    return;
  }

  console.log('Active chat box detected:', activeElement);

  // Try to locate the closest recipient name relative to the active chat box
  const chatContainer = activeElement.closest('.msg-form');
  let recipientName = '';

  if (chatContainer) {
    const nameSelectors = [
      'h2.msg-entity-lockup__entity-title',
      '.profile-card-one-to-one__profile-link',
    ];

    for (const selector of nameSelectors) {
      const nameElement = chatContainer.querySelector(selector);
      console.log(`Trying selector: ${selector}, Element found:`, nameElement);

      if (nameElement) {
        const fullName = nameElement.textContent.trim();
        console.log('Found full name:', fullName);

        recipientName = fullName.split(' ')[0]; // Extract first name
        break;
      }
    }
  }

  if (!recipientName) {
    console.log('Could not find recipient name, paste proceeding normally');
    return;
  }

  // Replace {name} with the recipient's name
  const modifiedText = pastedText.replace(/{name}/g, recipientName);

  e.preventDefault();

  // Modify the chat input field
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
});
