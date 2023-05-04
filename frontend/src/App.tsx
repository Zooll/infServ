import { useState } from 'react'
import TextFieldWithSendButton from './TextBox';
import FileUploader from './FileUploader';
import ImageField from './ImageField';
import './App.css'

function App() {




  const [messages, setMessages] = useState<string[]>([]);
  const [file_jpg, setFileJPG] = useState<File>();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [generatedImages, setGeneratedImagesSRC] = useState<string[]>([]);

  const handleFileUpload = (file: File) => {
    console.log(`Uploaded file: ${file.name}`);
    setFileJPG(file);
    setSelectedImage(file)
  };

  function handleModelData(data) {
    const curImage = "data:image/png;base64," + data.image;
    setGeneratedImagesSRC([...generatedImages, curImage])
  }

  const handleSend = (message: string) => {
    if (message == "")
      return;

    const reader = new FileReader();
    reader.onload = function () {
      const img = new Image();
      img.onload = function () {

        // create a temporary canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // set the canvas dimensions to match the desired width and height
        const newWidth = 640;
        const scaleFactor = newWidth / img.width;
        canvas.width = newWidth;
        canvas.height = img.height * scaleFactor;

        // draw the image onto the canvas with the desired dimensions
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // export the canvas contents to a new Blob object that contains the resized image
        canvas.toBlob(function (resizedBlob) {

          // create a new FileReader object to read the contents of the resized Blob object
          const resizedReader = new FileReader();
          resizedReader.onload = function () {

            // convert the binary data to a base64-encoded string
            const base64String = btoa(resizedReader.result);

            // send the base64-encoded string to the server via an HTTP POST request
            const data = new FormData();
            data.append('image', base64String);
            data.append('prompt', message);
            //const model_name = "instruct-pix2pix"
            fetch(`http://87.120.210.2:5000/predict`, {
              method: 'POST',
              body: data
            })
              .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json();
              })
              .then(data => {
                // access the 'image' property of the response data object
                handleModelData(data)
                setMessages([...messages, message]);
              })
              .catch(error => console.error(error));
          };
          resizedReader.readAsBinaryString(resizedBlob);
        }, 'image/jpeg', 0.8); // convert the resized image to JPEG with 80% quality
      };
      img.src = URL.createObjectURL(file_jpg);
    };
    reader.readAsArrayBuffer(file_jpg);


  };

  return (
    <>
      <h1>Please use with care </h1>
      <ImageField src={selectedImage ? URL.createObjectURL(selectedImage) : ''} alt="Image 1" width={400} />
      <FileUploader label="Upload a file:" onFileUpload={handleFileUpload} />

      <div className="my-chat-app-container">
        <div className="my-chat-app-message-container">
          {messages.map((message, index) => (
            <div key={index} className={`my-chat-app-message my-chat-app-message-me`}>
              <ImageField src={generatedImages ? generatedImages[index] : ''} alt="Image 2" width={400} />
              <div className="my-chat-app-message-sender">{message}</div>
            </div>
          ))}
        </div>
        <TextFieldWithSendButton
          label="Enter message"
          value=""
          onChange={() => { }}
          onSend={handleSend}
        />
      </div>


      <p className="read-the-docs">
        This site is fucking chat GPT based frontend
      </p>
    </>
  )
}

export default App
