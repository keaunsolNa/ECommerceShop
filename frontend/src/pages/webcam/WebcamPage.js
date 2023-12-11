import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';

function WebcamPage() {
  const [isShowVideo, setIsShowVideo] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const videoElement = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = videoElement.current.getScreenshot();
    console.log('imageSrc is : ', imageSrc);
    setImgSrc(imageSrc);
  }, [videoElement, setImgSrc]);

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: 'user'
  };

  const startCam = () => {
    setIsShowVideo(true);
  };

  const stopCam = () => {
    let stream = videoElement.current.stream;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    setIsShowVideo(false);
  };

  return (
    <div>
      <div>
        <div className="camView">{isShowVideo && <Webcam audio={false} ref={videoElement} videoConstraints={videoConstraints} />}</div>
        <button onClick={startCam}>Start Video</button>
        <button onClick={stopCam}>Stop Video</button>
        <button onClick={capture}>Capture photo</button>
      </div>
      {imgSrc && <img src={imgSrc} alt="profile" />}
    </div>
  );
}

export default WebcamPage;
