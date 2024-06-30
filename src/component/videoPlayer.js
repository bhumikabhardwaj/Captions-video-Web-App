import React, { useState } from 'react';
import ReactPlayer from 'react-player';


function VideoPlayer() {
  const [videoUrl, setVideoUrl] = useState('');
  const [captions, setCaptions] = useState([]);
  const [currentCaption, setCurrentCaption] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [playing, setPlaying] = useState(false);

  const handleAddCaption = () => {
    if (currentCaption && currentTime) {
      setCaptions([...captions, { text: currentCaption, time: parseFloat(currentTime) }]);
      setCurrentCaption('');
      setCurrentTime('');
    }
  };

  return (
    <div className="App">
      <h1>Video Caption App</h1>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <textarea
          placeholder="Enter caption text"
          value={currentCaption}
          onChange={(e) => setCurrentCaption(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter timestamp (in seconds)"
          value={currentTime}
          onChange={(e) => setCurrentTime(e.target.value)}
        />
        <button onClick={handleAddCaption}>Add Caption</button>
      </div>
      <div className="video-section">
        {videoUrl && (
          <ReactPlayer
            url={videoUrl}
            playing={playing}
            controls
            onProgress={({ playedSeconds }) => {
              const currentCaption = captions.find(
                (caption) => Math.abs(caption.time - playedSeconds) < 0.5
              );
              if (currentCaption) {
                document.getElementById('caption-display').innerText = currentCaption.text;
              } else {
                document.getElementById('caption-display').innerText = '';
              }
            }}
          />
        )}
        <div id="caption-display" className="caption-display"></div>
      </div>
    </div>
  );
}

export default VideoPlayer;
