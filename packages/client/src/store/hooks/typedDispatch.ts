import { AppDispatch } from '../store'
import { useDispatch } from 'react-redux'

export const useTypedDispatch: () => AppDispatch = useDispatch;
