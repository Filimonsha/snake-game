import { FormSignUp } from './modules/form';
import { EntranceLayout } from '../../layout/entrance';
import { withErrorBoundary } from '../../modules/errorBoundary/withErrorBoundary';

const SignUp = () => {
  return (
    <EntranceLayout>
      <FormSignUp />
    </EntranceLayout>
  )
}

export default withErrorBoundary(SignUp);
