import { SliderProps } from '@mui/material/Slider';
import { Slider as MuiSlider } from '@mui/material';

export const Slider: React.FC<SliderProps> = (props) => {
  return <MuiSlider {...props}>{props.children}</MuiSlider>;
};
