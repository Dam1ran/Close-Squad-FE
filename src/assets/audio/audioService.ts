/* eslint-disable @typescript-eslint/explicit-function-return-type */
import ding from './../../assets/audio/ding.mp3';

export const useAudioService = (isSoundEnabled: boolean) => {
  const whisperDing = (): void => {
    if (isSoundEnabled) {
      const dingAudio = new Audio(ding);
      dingAudio.volume = 0.35;
      dingAudio.play();
    }
  };
  return {
    whisperDing,
  };
};
