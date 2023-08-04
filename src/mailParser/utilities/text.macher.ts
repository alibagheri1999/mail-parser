import { MacherType } from '../ports/macher.type';

export function findPatterns(text: string): MacherType {
  const patternRegex = /{{([^=]+)=([^}]+)}}/g;
  const foundPatterns = {};
  let match: unknown;

  while ((match = patternRegex.exec(text)) !== null) {
    const key = match[1];
    if (key === 'mobile') {
      foundPatterns['phone_no'] = match[2];
    } else {
      foundPatterns[key] = match[2];
    }
  }
  return <MacherType>foundPatterns;
}
