import { render } from '@testing-library/react';
import Forum from './Forum';
import '@testing-library/jest-dom/extend-expect';

describe('Страница форума', () => {
  test('должна корректно рендериться', () => {
    const { getByText } = render(<Forum />);
    expect(getByText('Forum')).toBeInTheDocument();
  });
});