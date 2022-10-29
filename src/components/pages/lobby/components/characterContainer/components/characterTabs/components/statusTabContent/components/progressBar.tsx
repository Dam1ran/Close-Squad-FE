import { getNormalized } from '../../../../../../../../../../support/utils';
import { Box, Row, Typography } from '../../../../../../../../../elements';

export const ProgressBar: React.FC<{
  percent?: boolean;
  tag: string;
  currentValue: number;
  maxValue?: number;
  color: string;
}> = ({ maxValue = 100, ...props }) => {
  const currentValueWidth = getNormalized(maxValue, props.currentValue);
  return (
    <Row
      sx={{
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 1,
        border: (theme) => `1px solid ${theme.palette.grey[600]}`,
        position: 'relative',
        height: '13px',
        paddingTop: 1,
        paddingBottom: 1,
        margin: 0.5,
        width: '300px',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          backgroundColor: props.color,
          left: 0,
          width: `${currentValueWidth}%`,
          content: '""',
          borderRadius: 1,
          zIndex: 5,
          opacity: 0.8,
          background: (theme) =>
            `linear-gradient(0deg, ${props.color} 0%, ${theme.palette.grey[200]} 50%, ${props.color} 100%)`,
        }}
      />
      <Typography
        sx={{
          fontSize: '12px',
          color: (theme) => theme.palette.common.black,
          paddingRight: 0.5,
          paddingLeft: 0.5,
          borderRadius: 1,
          lineHeight: '14px',
          marginTop: '1px',
          zIndex: 10,
        }}
      >
        {props.tag}
      </Typography>
      <Typography
        sx={{
          fontSize: '12px',
          color: (theme) => theme.palette.common.black,
          paddingRight: 0.5,
          paddingLeft: 0.5,
          borderRadius: 1,
          lineHeight: '14px',
          marginTop: '1px',
          zIndex: 10,
        }}
      >
        {props.currentValue.toFixed(props.percent ? 2 : 0)}
        {props.percent && '%'}
      </Typography>
      <Typography
        sx={{
          fontSize: '12px',
          color: (theme) => theme.palette.common.black,
          paddingRight: 0.5,
          paddingLeft: 0.5,
          borderRadius: 1,
          lineHeight: '14px',
          marginTop: '1px',
          zIndex: 10,
        }}
      >
        {props.percent ? '' : maxValue.toFixed(0)}
      </Typography>
    </Row>
  );
};
