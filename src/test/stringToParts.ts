import assert from 'assert';
import stringToParts from '../lib/stringToParts.js';

describe('stringToParts', function () {
  it('handles brackets for numbers', function () {
    assert.deepStrictEqual(stringToParts('list[0].name'), [
      'list',
      '0',
      'name',
    ]);
    assert.deepStrictEqual(stringToParts('list[0][1].name'), [
      'list',
      '0',
      '1',
      'name',
    ]);
  });

  it('handles dot notation', function () {
    assert.deepStrictEqual(stringToParts('a.b.c'), ['a', 'b', 'c']);
    assert.deepStrictEqual(stringToParts('a..b.d'), ['a', '', 'b', 'd']);
  });

  it('ignores invalid numbers in square brackets', function () {
    assert.deepStrictEqual(stringToParts('foo[1mystring]'), ['foo[1mystring]']);
    assert.deepStrictEqual(stringToParts('foo[1mystring].bar[1]'), [
      'foo[1mystring]',
      'bar',
      '1',
    ]);
    assert.deepStrictEqual(stringToParts('foo[1mystring][2]'), [
      'foo[1mystring]',
      '2',
    ]);
  });

  it('handles empty string', function () {
    assert.deepStrictEqual(stringToParts(''), ['']);
  });

  it('handles trailing dot', function () {
    assert.deepStrictEqual(stringToParts('a.b.'), ['a', 'b', '']);
  });
});
