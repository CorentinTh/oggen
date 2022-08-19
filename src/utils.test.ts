import { describe, expect, it } from 'vitest';
import { isObject, toSnakeCase } from './utils';

describe('utils', () => {
  describe('isObject', () => {
    it('returns true if the parameter is a record', () => {
      expect(isObject({ title: 'it-tools' })).to.eql(true);
      expect(isObject({})).to.eql(true);

      expect(isObject(null)).to.eql(false);
      expect(isObject(undefined)).to.eql(false);
      expect(isObject([])).to.eql(false);
      expect(isObject(1)).to.eql(false);
      expect(isObject('df')).to.eql(false);
      expect(isObject(new Date())).to.eql(false);
    });
  });

  describe('toSnakeCase', () => {
    it('convert a camel case string to snake case', () => {
      expect(toSnakeCase('HelloWorld')).to.eql('hello_world');
      expect(toSnakeCase('helloWorld')).to.eql('hello_world');
      expect(toSnakeCase('URLStuff')).to.eql('url_stuff');
      expect(toSnakeCase('myURL')).to.eql('my_url');
      expect(toSnakeCase('a:b')).to.eql('a:b');
      expect(toSnakeCase('')).to.eql('');
    });
  });
});
