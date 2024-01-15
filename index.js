const inputTextbox = document.getElementById('inputTextbox');
    const charCountSpan = document.getElementById('charCount');

    // Add an input event listener to the textbox
    inputTextbox.addEventListener('input', function() {
        // Get the length of the entered text
        const charCount = inputTextbox.value.length;

        // Update the character count in the span
        charCountSpan.textContent = charCount;
    });
     

    const submit_btn=document.getElementById('submit_btn')
     
      submit_btn.addEventListener('click', generatePost);
    function generatePost() {
       // Get user input

      const message = document.getElementById('inputTextbox').value;
    
      // Prepare data for OpenAI API
      const prompt = `On ${getSelectedSocialPlatform()}, write a ${getSelectedTone()} post in the ${getSelectedStyle()} style. \n\n${message}`;
    
      // Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
      const apiKey = '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';
    
      // Make a request to OpenAI API
      fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',  // Specify the model you are using
          messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: prompt }],
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          if (data.choices && data.choices.length > 0) {
            const generatedPost = data.choices[0].message.content.trim();
            console.log(generatedPost);
            document.getElementById('generatedPost').innerText = generatedPost;
          } else {
            console.error('No choices found in the response.');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          // alert('An error occurred while generating the post. Please try again.');
        });
    }
  
    

var btnVal = "";
const socialIcons = document.querySelectorAll('.social_icons .social img');
for (let icon of socialIcons) {
  icon.addEventListener("click", (elem) => {
    // Remove "selected" class from all icons
    socialIcons.forEach(icon => icon.classList.remove("selected"));

    icon.classList.add("selected");
    btnVal = getPlatformName(icon.src);
    // console.log(btnVal);
  });
}

function getSelectedSocialPlatform() {
  return btnVal;
}

function getPlatformName(iconSrc) {
  if (iconSrc.includes('facebook')) {
    return 'Facebook';
  } else if (iconSrc.includes('twitter')) {
    return 'Twitter';
  } else if (iconSrc.includes('reddit')) {
    return 'Reddit';
  } else if (iconSrc.includes('linkedin')) {
    return 'LinkedIn';
  }

  return 'Unknown';
}

var toneVal = "";
const toneOfVoice = document.querySelectorAll('.tone input');
for (let btn of toneOfVoice) {
  btn.addEventListener("click", (elem) => {
    // console.log(btn.value);
    toneVal = btn.value;

    // Remove "select" class from all tone buttons
    toneOfVoice.forEach(btn => btn.classList.remove("select"));
    btn.classList.add("select");
  });
}

function getSelectedTone() {
  return toneVal;
}

var postVal = "";
const postStyle = document.querySelectorAll('.post_style input');
for (let btn of postStyle) {
  btn.addEventListener("click", (elem) => {
    // console.log(btn.value);
    postVal = btn.value;

    // Remove "select" class from all post style buttons
    postStyle.forEach(btn => btn.classList.remove("select"));
    btn.classList.add("select");
  });
}

function getSelectedStyle() {
  return postVal;
}
