const inputTextbox = document.getElementById('inputTextbox');
    const charCountSpan = document.getElementById('charCount');

    // Add an input event listener to the textbox
    inputTextbox.addEventListener('input', function() {
        // Get the length of the entered text
        const charCount = inputTextbox.value.length;

        // Update the character count in the span
        charCountSpan.textContent = charCount;
    });