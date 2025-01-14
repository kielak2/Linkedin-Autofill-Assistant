

// Initialize the paste handler function
document.addEventListener('paste', function (e)  {

  let pastedText = (e.clipboardData || window.clipboardData).getData('text');

  if (!pastedText.includes('{name}')) {
    console.log('No {name} placeholder found in pasted text');
    return;
  }

  const selectors = [
    'h2.msg-entity-lockup__entity-title', 
    '.profile-card-one-to-one__profile-link',
  ];
  let recipientName = ''; 

  for (const selector of selectors) {
    const element = document.querySelector(selector);
    console.log(`Trying selector: ${selector}`, 'Element found:', element);

    if (element) {
      const fullName = element.textContent.trim();
      console.log('Found full name:', fullName);

      recipientName = fullName.split(' ')[0];
      break;
    }
  }

  if (!recipientName) {
    console.log('Could not find recipient name, paste proceeding normally');
    return;
  }

  const modifiedText = pastedText.replace(/{name}/g, recipientName);

  e.preventDefault();

  const activeElement = document.activeElement;
  if (activeElement && activeElement.classList.contains('msg-form__contenteditable')) {
    console.log('Active chat box detected');
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
  } else {
    console.log('No active chat box found');
  }
}
)
