import React, { useState } from 'react';
import ChatArea from './ChatArea';
import RightPanel from './RightPanel';
import { FaArrowCircleUp } from "react-icons/fa";
import axios from 'axios';

const MainContainer = () => {
  const [messages, setMessages] = useState([]);
  const [inputmssg, setInputMssg] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [filename, setFilename] = useState('');
  const [imageurl, setImageurl] = useState('');
  
  const handleSendtext = async () => {
    if (!inputmssg) {
      alert("Please enter a message first!");
      return;
    }

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/getresult/${filename}/${inputmssg}`
      );

      console.log('Response data:', response.content);

      // Assuming response.data.result contains the result
      setMessages((prevMessages) => [
        ...prevMessages,
        { input: inputmssg, output: response.content},
      ]);

      setInputMssg(''); // Clear the input field after sending the message
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message. Please try again.');
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setFilename('');
  };

  const handleUploadDoc = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/uploadpdf/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            accept: 'application/json',
          },
        }
      );

      console.log('Upload successful:', response.data);
      setFilename(response.data.filename); // Update the filename state
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
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
          <button
            onClick={handleSendtext}
            className="ml-2 p-2 text-blue-500 hover:text-blue-700"
          >
            <FaArrowCircleUp size={30} />
          </button>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="ml-2"
          />
          <button
            onClick={handleUploadDoc}
            className="ml-2 p-2 text-blue-500 hover:text-blue-700"
          >
            Upload File
          </button>
        </div>
        {filename && (
          <p className="mt-2 text-sm text-green-500">
            File "{filename}" uploaded successfully!
          </p>
        )}
      </div>
      <div className="flex flex-col w-full md:w-1/4">
        <RightPanel imageurl={imageurl} />
      </div>
    </div>
  );
};

export default MainContainer;
