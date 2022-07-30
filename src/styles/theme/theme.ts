import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { colors } from './colors';

const theme = createTheme({
  palette: {
    // primary: {
    //   main: colors.purple.main,
    //   light: colors.purple.light,
    //   dark: colors.purple.dark,
    // },
    // secondary: {
    //   main: colors.green.main,
    // },
    background: {
      default: grey[200],
    },
  },
});
// const theme = createTheme();
export default theme;

// import { createTheme } from '@material-ui/core/styles';
// import { Fonts } from '_assets';
// import { colors } from './colors';
// import { AlertClassKey } from '@material-ui/lab/Alert';
// import { AutocompleteClassKey } from '@material-ui/lab';

// declare module '@material-ui/core/styles/overrides' {
//   export interface ComponentNameToClassKey {
//     MuiAlert: AlertClassKey;
//     MuiAutocomplete: AutocompleteClassKey;
//   }
// }

// let theme = createTheme({
//   palette: {
//     common: {
//       white: colors.white,
//       black: colors.black,
//     },
//     primary: {
//       main: colors.orange.main,
//       light: colors.orange.light,
//       dark: colors.orange.dark,
//     },
//     secondary: {
//       main: colors.purple.main,
//       dark: colors.grey.main,
//     },
//     grey: {
//       800: colors.grey.lightGray,
//       900: colors.grey.whiteGray,
//       A100: colors.grey.main,
//       A200: colors.grey.light,
//       A400: colors.grey.dark,
//       A700: colors.grey.darkLight,
//     },
//     background: {
//       default: '#fff',
//       paper: colors.purple.light,
//     },
//     error: {
//       main: colors.red.main,
//     },
//     success: {
//       main: colors.green.main,
//     },
//   },
//   typography: {
//     fontFamily: [
//       'NNDagnyDisplay',
//       'NNDagnyTextBold',
//       'NNDagnyTextRegular',
//       //  'nnDagnyLight'
//     ].join(','),
//     h1: {
//       fontFamily: 'NNDagnyDisplay',
//       fontSize: '1.75rem',
//     },
//     h2: {
//       fontFamily: 'NNDagnyDisplay',
//       fontSize: '1.5rem',
//     },
//     h3: {
//       fontFamily: 'NNDagnyDisplay',
//       fontSize: '1rem',
//     },
//     h4: {
//       fontFamily: 'NNDagnyDisplay',
//       fontSize: '0.75rem',
//     },
//     h5: {
//       fontFamily: 'NNDagnyDisplay',
//       fontSize: '0.5rem',
//     },
//     h6: {
//       //this is a substitute for subtitle3
//       fontFamily: 'NNDagnyTextRegular',
//       fontSize: '0.875rem',
//       color: colors.black,
//     },
//     caption: {
//       fontFamily: 'NNDagnyTextRegular',
//       fontSize: '0.75rem',
//       color: colors.black,
//     },
//     subtitle1: {
//       fontFamily: 'NNDagnyTextRegular',
//       fontSize: '1rem',
//     },
//     subtitle2: {
//       fontFamily: 'NNDagnyTextRegular',
//       fontSize: '0.813rem',
//       color: colors.grey.dark,
//     },
//   },
//   spacing: (factor: number) => `${0.5 * factor}rem`,
//   overrides: {
//     MuiCssBaseline: {
//       '@global': {
//         '@font-face': [Fonts.nnDagnyDisplay, Fonts.nnDagnyBold, Fonts.nnDagnyRegular, Fonts.nnDagnyLight],
//         html: {
//           '@media screen and (max-width: 600px)': {
//             fontSize: 10,
//           },
//           '@media screen and (min-width: 600px)': {
//             fontSize: 12,
//           },
//           '@media screen and (min-width: 960px)': {
//             fontSize: 14,
//           },
//           '@media screen and (min-width: 1280px)': {
//             fontSize: 16,
//           },
//         },
//         p: {
//           marginTop: 0,
//           marginBottom: 0,
//         },
//         body: {
//           zoom: '90%',
//           fontFamily: 'NNDagnyTextRegular',
//           fontSize: '0.813rem',
//         },
//       },
//     },
//     MuiContainer: {
//       root: {
//         display: 'flex',
//       },
//     },
//     MuiButton: {
//       root: {
//         fontFamily: 'NNDagnyTextRegular',
//         fontSize: '0.875rem',
//         height: '2.375rem',
//         borderRadius: 16,
//         textTransform: 'none',
//         '&$disabled': {
//           color: colors.white,
//           backgroundColor: colors.grey.main,
//         },
//       },
//       endIcon: {
//         '& div': {
//           display: 'flex',
//         },
//       },
//       textPrimary: {
//         color: colors.white,
//         backgroundColor: colors.orange.light,
//         '&:hover': {
//           backgroundColor: colors.orange.main,
//           opacity: 0.7,
//         },
//       },
//       textSecondary: {
//         color: colors.white,
//         backgroundColor: colors.purple.main,
//         '&:hover': {
//           backgroundColor: colors.purple.main,
//           opacity: 0.7,
//         },
//       },
//       outlinedPrimary: {
//         border: `2px solid ${colors.orange.light}`,
//         color: colors.orange.light,
//         '&:hover': {
//           border: `2px solid ${colors.orange.light}`,
//           opacity: 0.7,
//         },
//       },
//       outlinedSecondary: {
//         border: `2px solid ${colors.grey.dark}`,
//         color: colors.grey.dark,
//         backgroundColor: colors.white,
//         '&:hover': {
//           border: `2px solid ${colors.grey.dark}`,
//           backgroundColor: colors.white,
//           opacity: 0.7,
//         },
//       },
//       containedPrimary: {
//         border: `2px solid ${colors.orange.main}`,
//         color: colors.white,
//         boxShadow: 'none',
//         '&:hover': {
//           border: `2px solid ${colors.orange.main}`,
//           backgroundColor: colors.orange.main,
//           boxShadow: 'none',
//           opacity: 0.7,
//         },
//       },
//     },
//     MuiFab: {
//       primary: {
//         backgroundColor: colors.orange.main,
//         '&:hover': {
//           backgroundColor: colors.orange.main,
//         },
//       },
//       secondary: {
//         backgroundColor: colors.grey.light,
//         '&:hover': {
//           backgroundColor: colors.grey.light,
//         },
//       },
//     },
//     MuiRadio: {
//       root: {
//         color: colors.orange.light,
//         height: '36px',
//         '& .MuiIconButton-label': {
//           width: 18,
//         },
//       },
//     },
//     MuiAutocomplete: {
//       inputRoot: {
//         minHeight: '40px',

//         height: 'fit-content',
//       },
//       tagSizeSmall: {
//         backgroundColor: colors.purple.main,
//       },
//     },
//     MuiTextField: {
//       root: {
//         '& :-webkit-autofill': {
//           transitionDelay: '9999s',
//         },
//         '& .MuiInputBase-formControl': {
//           borderRadius: '10px',
//         },
//         '& .MuiOutlinedInput-adornedEnd': {
//           paddingRight: '0px',
//         },
//         '& .MuiOutlinedInput-root': {
//           minHeight: '40px',
//           border: 'none',
//           '& fieldset': {
//             borderWidth: '1px',
//             transition: 'border 300ms',
//             borderColor: colors.grey.main,
//           },
//           '&:hover fieldset': {
//             borderColor: colors.grey.dark,
//           },
//           '&.Mui-focused fieldset': {
//             border: `3px solid ${colors.orange.main}`,
//           },
//         },
//         '& .MuiInputLabel-root': {
//           color: colors.grey.whiteGray,
//         },
//       },
//     },
//     MuiInputBase: {
//       root: {
//         height: '2.5rem',
//         border: `0.063rem solid ${colors.grey.main}`,
//         borderRadius: 10,
//         color: colors.black,
//         fontFamily: 'NNDagnyDisplay',
//         fontSize: '0.875rem',
//         '&.Mui-disabled': {
//           border: `0.063rem solid ${colors.purple.dark}`, // needed for the input components contained by table cells
//           backgroundColor: colors.purple.dark,
//         },
//         '&.Mui-error': {
//           borderColor: colors.red.main,
//         },
//         '&.Mui-focused': {
//           borderColor: colors.orange.light,
//         },
//       },
//       input: {
//         padding: '1rem 1.313rem 1rem 1.313rem',
//         '&::placeholder': {
//           color: colors.grey.dark,
//         },
//       },
//     },
//     MuiTooltip: {
//       arrow: {
//         fontSize: '10px',
//         left: '30px !important',
//         '&::before': {
//           backgroundColor: colors.purple.main,
//         },
//       },
//       popperArrow: {
//         marginLeft: -25,
//       },
//       tooltip: {
//         maxWidth: '100%',
//         borderRadius: '16px',
//         color: colors.white,
//         backgroundColor: colors.purple.main,
//         padding: '17px 16px 17px 26px',
//       },
//       tooltipArrow: {
//         maxWidth: '100%',
//         borderRadius: '16px',
//         color: colors.white,
//         backgroundColor: colors.purple.main,
//         padding: '17px 16px 17px 26px',
//       },
//     },
//     MuiChip: {
//       root: {
//         fontFamily: 'NNDagnyTextBold',
//         fontSize: '0.85rem',
//         width: 93,
//         color: colors.white,
//       },
//       clickable: {
//         '&:hover': { backgroundColor: colors.purple.light }, //TODO: change :hover color when
//         '&:focus': { backgroundColor: colors.purple.main },
//       },
//     },
//     MuiSnackbar: {
//       anchorOriginBottomRight: {
//         bottom: '100px !important',
//         right: '40px !important',
//       },
//     },
//     MuiAlert: {
//       root: {
//         borderRadius: '16px',
//         minWidth: 300,
//         maxWidth: 450,
//         height: 'auto',
//       },
//       standardSuccess: {
//         backgroundColor: colors.purple.main,
//         color: colors.white,
//       },
//       standardInfo: {
//         backgroundColor: colors.white,
//         color: colors.black,
//         boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
//       },
//       message: {
//         fontFamily: 'NNDagnyTextRegular',
//         fontSize: '14px',
//       },
//     },
//     MuiTableCell: {
//       root: {
//         borderBottom: 'none',
//       },
//     },
//     MuiPaper: {
//       root: {
//         backgroundColor: colors.white,
//       },
//     },
//   },
//   props: {
//     // Name of the component ⚛️
//     MuiButtonBase: {
//       // The default props to change
//       disableRipple: true, // No more ripple, on the whole application 💣!
//     },
//   },
// });

// export default theme;
