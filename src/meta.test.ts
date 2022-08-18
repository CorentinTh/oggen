import { describe, expect, it } from 'vitest';
import { buildMetaStrings } from './meta';

describe('meta', () => {
  describe('buildMetaString', () => {
    it('generates meta tags', () => {
      const meta = {
        'og:title': 'Lorem ipsum',
        'og:description': 'Dolor sit',
      };
      expect(buildMetaStrings({ meta, type: 'property' })).to.eql(['<meta property="og:title" value="Lorem ipsum" />', '<meta property="og:description" value="Dolor sit" />']);
    });
  });
});
