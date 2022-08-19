import { describe, expect, it } from 'vitest';
import { buildMetaStrings, flattenMetadata, generateMeta } from './generator';

describe('generators', () => {
  describe('buildMetaString', () => {
    it('generates meta tags', () => {
      const flatMetadata = [
        { key: 'og:title', value: 'it-tools' },
        { key: 'og:description', value: 'Lorem ipsum' },
      ];
      expect(buildMetaStrings({ flatMetadata, type: 'property' })).to.eql([
        '<meta property="og:title" value="it-tools" />',
        '<meta property="og:description" value="Lorem ipsum" />',
      ]);
    });
  });

  describe('flattenMetadata', () => {
    it('flattens metadata in an array', () => {
      expect(
        flattenMetadata({
          title: 'it-tools',
          author: { name: 'Corentin', age: '42' },
          tags: ['foo', 'bar'],
          directors: [
            { name: 'Aimie', age: '43' },
            { name: 'Pocky', age: '44' },
          ],
        }),
      ).to.eql([
        { key: 'title', value: 'it-tools' },
        { key: 'author:name', value: 'Corentin' },
        { key: 'author:age', value: '42' },
        { key: 'tags', value: 'foo' },
        { key: 'tags', value: 'bar' },
        { key: 'directors:name', value: 'Aimie' },
        { key: 'directors:age', value: '43' },
        { key: 'directors:name', value: 'Pocky' },
        { key: 'directors:age', value: '44' },
      ]);

      expect(flattenMetadata(undefined)).to.eql([]);
    });
  });

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
});
