import { describe, expect, it } from 'vitest';
import { generateMeta, getMetaTagsAndValue } from './generator';

describe('generators', () => {
  describe('generateMeta', () => {
    it('generates meta strings', () => {
      expect(generateMeta({ title: 'it-tools', description: 'A website with tools' })).to.eql(
        ['<!-- og meta -->', '<meta property="og:title" value="it-tools" />', '<meta property="og:description" value="A website with tools" />'].join('\n'),
      );
    });

    it('omit empty string as value', () => {
      expect(generateMeta({ title: '' })).to.eql('');
    });

    it('handle array of values', () => {
      expect(generateMeta({ movie: { author: ['Jane Mi', 'John Do'] } })).to.eql(
        '<!-- og meta -->\n<meta property="og:movie:author" value="Jane Mi" />\n<meta property="og:movie:author" value="John Do" />',
      );
    });

    it('can handle extra twitter conf', () => {
      expect(generateMeta({ title: 'it-tools', description: 'Lorem ipsum', twitter: { title: 'it-tools twitter' } }, { generateTwitterCompatibleMeta: true })).to.eql(
        [
          '<!-- og meta -->',
          '<meta property="og:title" value="it-tools" />',
          '<meta property="og:description" value="Lorem ipsum" />',
          '',
          '<!-- twitter meta -->',
          '<meta name="twitter:title" value="it-tools twitter" />',
          '<meta name="twitter:description" value="Lorem ipsum" />',
        ].join('\n'),
      );
    });

    it('can add indentation', () => {
      expect(
        generateMeta({ title: 'it-tools', description: 'A website with tools', weirdCaseURLStuff: true }, { indentation: 3, indentWith: ' ', generateTwitterCompatibleMeta: true }),
      ).to.eql(
        [
          '   <!-- og meta -->',
          '   <meta property="og:title" value="it-tools" />',
          '   <meta property="og:description" value="A website with tools" />',
          '   <meta property="og:weird_case_url_stuff" value="true" />',
          '',
          '   <!-- twitter meta -->',
          '   <meta name="twitter:title" value="it-tools" />',
          '   <meta name="twitter:description" value="A website with tools" />',
        ].join('\n'),
      );
    });
  });

  describe('getMetaTagsAndValue', () => {
    it('returns true if the parameter is a record', () => {
      expect(getMetaTagsAndValue({ rawMetadata: { a: 1 } })).to.eql({ a: 1 });
      expect(getMetaTagsAndValue({ rawMetadata: { a: { a: 1 } } })).to.eql({ 'a:a': 1 });
      expect(getMetaTagsAndValue({ rawMetadata: { a: { a: 1 }, b: {} } })).to.eql({ 'a:a': 1 });
    });
  });
});
