import React, { useState } from 'react';
import { useGlobalContext } from '../../context/persons/GlobalState';
import Loader from '../loader/Loader';
import './videoGallery.scss';
import StopAudioButton from '../../icons/StopAudioButton';
import PlayAudioButton from '../../icons/PlayAudioButton';

function VideoGallery({ selectedMedia, openModal, isPlaying, setIsPlaying }) {
  const { getVideosData } = useGlobalContext();
  const [loading, setLoading] = useState(false);

  const onClickHandler = (index) => {
    const videoData = selectedMedia.videos?.map((video) => video.url);
    const data = {
      index,
      videos: videoData,
    };
    getVideosData(data);
    openModal();
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className='video-gallery'>
      {loading ? (
        <Loader />
      ) : (
        selectedMedia?.videos.map((video, index) => (
          <div
            key={'videos' + index}
            className='video-container'
            style={{
              alignItems: video.name < 28 ? 'center' : 'flex-start',
            }}
          >
            <div onClick={() => onClickHandler(index)}>
              {isPlaying ? (
                <div onClick={togglePlay}>
                  <StopAudioButton color={'#45A6D5'} />
                </div>
              ) : (
                <div onClick={togglePlay}>
                  <PlayAudioButton color={'#45A6D5'} />
                </div>
              )}
            </div>

            <span>{video.name}</span>
          </div>
        ))
      )}
    </div>
  );
}

export default VideoGallery;
