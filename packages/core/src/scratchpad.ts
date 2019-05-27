import { newLimina } from '.';
import { tablet /* , desktop */ } from './standardBreakpoints';

// const styles = {
//   color: 'blue',
//   textDecoration: 'underline',
// };

// const mediaQueryStyles = {
//   [tablet]: {
//     fontSize: 54,
//     [desktop]: {
//       fontSize: 54,
//     },
//   },
// };

const heading /* css( */ = newLimina({
  fontSize: 32,
  lineHeight: 48,
  [tablet]: {
    fontSize: 54,
    // [tablet]: {
    //   fontSize: 54,
    // },
  },
  // ...styles,
  // ...mediaQueryStyles,
});
/* ) */

console.log(heading);
