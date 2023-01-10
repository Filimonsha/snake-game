import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { EntranceLayout } from '.';

describe('Component: EntranceLayout', () => {
  it('should render correctly', () => {
    const component = render(
      <Router>
        <EntranceLayout>
          <p>Test child</p>
        </EntranceLayout>
      </Router>
    );

    expect(component.getByText(/Test child/)).toBeInTheDocument();
  });

});
