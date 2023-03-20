import { MainSlide } from './modules/mainSlide';
import { withErrorBoundary } from '../../modules/errorBoundary/withErrorBoundary';

const Main = () => {
  return (
    <MainSlide />
  )
}

export default withErrorBoundary(Main);
