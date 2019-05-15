import { PartialBreakpoint } from '../breakpoint';

export function getPreferredUnit(...possibleUnits: PartialBreakpoint['unit'][]): string {
  const finalUnit = possibleUnits.find(
    possibleUnit => typeof possibleUnit !== 'undefined' && possibleUnit !== ''
  );
  if (finalUnit) {
    return finalUnit;
  }
  throw new Error(
    `Could not get a valid CSS unit from these possible values: ${JSON.stringify(possibleUnits)}`
  );
}
