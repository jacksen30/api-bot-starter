import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';


const Home = () => {
  
  const [userInput, setUserInput] = useState('');

  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}

  const onUserChangedText = (event) => {
  // used to check input text - console.log(event.target.value);
  setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Echo: I will tell you why you should...</h1>
          </div>
          <div className="header-subtitle">
            <h2>The App That Reinforces Your Beliefs with Compelling Reasons</h2>
          </div>
        </div>
    
        <div className="prompt-container">
          <textarea
            className="prompt-box"
            placeholder="start typing here.... example:  quit my job and go trekking across South America for a year."
            value={userInput}
            onChange={onUserChangedText}
          />
        </div>
        
        <div className="prompt-buttons">
          <a className={isGenerating ? 'generate-button loading' : 'generate-button'} onClick={callGenerateEndpoint}>
          <div className="generate">
            {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
          </div>
          </a>
        </div>
        {apiOutput && (
        <div className="output">
          <div className="output-header-container">
            <div className="output-header"> 
              <h3></h3>
            </div>
          </div>
          <div className="output-content">
            <p>{apiOutput}</p>
          </div>
  </div>
)}
      </div>
    </div>
  );
};

export default Home;