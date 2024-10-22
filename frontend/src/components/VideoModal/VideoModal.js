import React from 'react';
import CustomVideoPlayer from '../customvideoplayer/CustomVideoPlayer';
import { useGlobalContext } from '../../context/persons/GlobalState';

const VideoModal = ({
  closeModal,
  isVideoGalleryOpen,
  isPlaying,
  setIsPlaying,
}) => {
  const { videosData } = useGlobalContext();

  const videos = videosData.videos;

  return (
    <CustomVideoPlayer
      videos={videos}
      closeModal={closeModal}
      isVideoGalleryOpen={isVideoGalleryOpen}
      isPlaying={isPlaying}
      setIsPlaying={setIsPlaying}
    />
  );
};

export default VideoModal;
