import { checkForName } from './nameChecker';

const postData = async (url = '', data = {}) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return await response.json();
  } catch (error) {
    console.log('Fetch error: ', error);
  }
};

const handleSubmit = async (event) => {
  event.preventDefault(); 

  const articleUrl = document.getElementById('article-url').value; // Get value from input field

  // Check if the URL is valid 
  if (checkForName(articleUrl)) {
    try {
      const mcData = await postData('http://localhost:8000/add-url', { articleUrl });
      const resultsContainer = document.getElementById('results');
      resultsContainer.innerHTML = ''; 

     // resultsContainer.innerHTML += `<h2>Form Results:</h2>`;
      resultsContainer.innerHTML += `<p id="text">${mcData.text}</p>`;
      resultsContainer.innerHTML += `<p id="agreement">${mcData.agreement}</p>`;
      resultsContainer.innerHTML += `<p id="confidence">${mcData.confidence}</p>`;
      resultsContainer.innerHTML += `<p id="score_tag">${mcData.score_tag}</p>`;
      resultsContainer.innerHTML += `<p id="subjectivity">${mcData.subjectivity}</p>`;
      resultsContainer.innerHTML += `<p id="irony">${mcData.irony}</p>`;
    } catch (error) {
      console.error('Error posting data: ', error);
    }
  } else {
    alert('Enter a valid URL'); 
  }
};

// formHandler.js
export const initialize = () => {
  document.getElementById('urlForm').addEventListener('submit', handleSubmit);
};

document.addEventListener('DOMContentLoaded', () => {
  initialize();
});

// Export the handleSubmit function
export { handleSubmit }; 
//export default handleSubmit;
