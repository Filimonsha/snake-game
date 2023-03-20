import { FormSignIn } from './modules/form';
import { EntranceLayout } from '../../layout/entrance';
import { withErrorBoundary } from '../../modules/errorBoundary/withErrorBoundary';

const SignIn = () => {
  return (
    <EntranceLayout>
      <FormSignIn />
    </EntranceLayout>
  )
}

export default withErrorBoundary(SignIn);
