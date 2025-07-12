import type { RootState } from '@store';
import type { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';

// Use throughout your app instead of plain `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
