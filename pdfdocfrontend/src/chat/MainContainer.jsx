import React, { useState, useContext, useEffect } from 'react';
import ChatArea from './ChatArea';
import RightPanel from './RightPanel';
import { FaArrowCircleUp } from "react-icons/fa";
// import { LanguageContext } from '../../context/LanguageContext';

async function createChatSession(apiKey, externalUserId) {
  const response = await fetch('https://api.on-demand.io/chat/v1/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': apiKey
    },
    body: JSON.stringify({
      pluginIds: [],
      externalUserId: externalUserId
    })
  });

  if (!response.ok) {
    throw new Error('Failed to create chat session');
  }

  const data = await response.json();
  return data.data.id;
}

async function submitQuery(apiKey, sessionId, query) {
  const response = await fetch(`https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': apiKey
    },
    body: JSON.stringify({
      endpointId: 'predefined-openai-gpt4o',
      query: query,
      pluginIds: ['plugin-1712327325', 'plugin-1713962163'],
      responseMode: 'sync'
    })
  });

  if (!response.ok) {
    throw new Error('Failed to submit query');
  }

  const data = await response.json();
  return data;
}

const MainContainer = () => {
  const [messages, setMessages] = useState([]);
  const [inputmssg, setInputMssg] = useState('');
    const [itinerary, setItinerary] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const url = 'https://abf0-2401-4900-838f-e94a-2480-70c4-7f15-9e98.ngrok-free.app/upload_image/';
  const query = 'hey is it done';
  // useEffect(() => {
  
    // handleSendImage(); // Call the async function
  // }, [uploadedImage]); // Dependency array includes uploadedImage if it's necessary to trigger this effect
  
  
  // const handleSendImage = async () => {
  //   if (!uploadedImage) {
  //     console.error('No image uploaded');
  //     return;
  //   }

  //   try {
  //     const requestOptions = {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(query) // Pass image URL to backend
  //     };

  //     const response = await fetch(url, requestOptions);
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };
  
  const handleSendtext = async () => {
    const apiKey = 'QYB6bZd7llKZnjImNfsWvyhMim0Yz0RP';
    const externalUserId = 'arihantjain';

    try {
      const sessionId = await createChatSession(apiKey, externalUserId);
      const response = await submitQuery(apiKey, sessionId, inputmssg);
      const answer = response.data.answer;
      
      // Update message state with both input and output
      setMessages((prevMessages) => [
        ...prevMessages,
        { input: inputmssg, output: answer }
      ]);
      setInputMssg(''); // Clear input message
    } catch (error) {
      console.error(error);
    }
  };
const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setItinerary("");
};
const handleUploadDoc = async () => {
  if (!selectedFile) return alert("Please select a DOC file first!");

  const formData = new FormData();
  formData.append('pdf', selectedFile);
  console.log(formData);
  // try {
  //   const response = await axios.post("http://localhost:5000/upload-doc", formData, {
  //     headers: { "Content-Type": "multipart/form-data" },
  //   });

  //   // Set itinerary to the response from the backend
  //   setItinerary(response.data.itinerary || "No itinerary could be generated.");
  // } catch (error) {
  //   console.error("Error generating response:", error);
  //   setItinerary("Error generating response.");
  // }
};
  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      {/* <div className="flex flex-col w-full md:w-1/4">
        <LeftPanel />
      </div> */}
      <div className="flex flex-col w-full md:w-3/4">
        <ChatArea messages={messages} />
        <div className="flex items-center p-2 bg-white border-t border-gray-300 rounded-lg mt-1 shadow-sm">
          <input
            type="text"
            value={inputmssg}
            onChange={(e) => setInputMssg(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg"
          />
          <button onClick={handleSendtext} className="ml-2 p-2 text-blue-500 hover:text-blue-700">
            <FaArrowCircleUp size={30} />
          </button>
          <input
          type="file"
           accept=".doc,.docx,.pdf"
          onChange={handleFileChange}
          className="ml-2"
        />
        <button className="ml-2 p-2 text-blue-500 hover:text-blue-700" onClick={handleUploadDoc}>
          <FaArrowCircleUp size={30}  />
        </button>
        </div>
      </div>
      <div className="flex flex-col w-full md:w-1/4">
      <RightPanel imageurl = {''}/>
      </div>
    </div>
  );
};

export default MainContainer;
