import getPaginationData from '../../utils/getPaginationData';

describe('utils/getPaginationData', () => {
  test('it shoud return a limit with 10 value when the paramter limit is empty', () => {
    const data = getPaginationData('', '2');

    expect(data.limit).toEqual(10);
    expect(data.page).toEqual(2);
  });

  test('it shoud return a limit with 10 value when the parameter limit is negative', () => {
    const data = getPaginationData('-1', '2');

    expect(data.limit).toEqual(10);
    expect(data.page).toEqual(2);
  });

  test('it shoud return a limit with 10 value when the parameter limit is not a number', () => {
    const data = getPaginationData('abc', '2');

    expect(data.limit).toEqual(10);
    expect(data.page).toEqual(2);
  });

  test('it shoud return a page with 1 value when the parameter page is empty', () => {
    const data = getPaginationData('5', '');

    expect(data.limit).toEqual(5);
    expect(data.page).toEqual(1);
  });

  test('it shoud return a page with 1 value when the parameter page is negative', () => {
    const data = getPaginationData('5', '-1');

    expect(data.limit).toEqual(5);
    expect(data.page).toEqual(1);
  });

  test('it shoud return a page with 1 value when the parameter page is not a number', () => {
    const data = getPaginationData('5', 'abc');

    expect(data.limit).toEqual(5);
    expect(data.page).toEqual(1);
  });

  test('it shoud return a page and a limit with type number when parameters are valids', () => {
    const data = getPaginationData('7', '3');

    expect(data.limit).toEqual(7);
    expect(data.page).toEqual(3);
  });
});
