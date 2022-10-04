import { CircularProgress, Column, ModalBackground, Typography } from '../../..';

export const LoadingModal: React.FC = () => {
  return (
    <ModalBackground sx={{ userSelect: 'none' }}>
      <Column>
        <CircularProgress color="secondary" size={40} thickness={5} sx={{ margin: 'auto', opacity: 0.7 }} />
        <Typography mt={4} ml={4} variant="h4" sx={{ fontWeight: 700, opacity: 0.4 }}>
          LOADING...
        </Typography>
      </Column>
    </ModalBackground>
  );
};
