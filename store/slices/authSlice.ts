import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';

type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
};

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ email, password }: { email: string; password: string }) => {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    const user = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
      photoURL: userCredential.user.photoURL,
      emailVerified: userCredential.user.emailVerified,
      isAnonymous: userCredential.user.isAnonymous,
    };

    return user;
  },
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }: { email: string; password: string }) => {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    const user = {
      uid: userCredential.user.uid,
      email: userCredential.user.email || '',
      displayName: userCredential.user.displayName,
      photoURL: userCredential.user.photoURL,
      emailVerified: userCredential.user.emailVerified,
      isAnonymous: userCredential.user.isAnonymous,
    };

    return user;
  },
);

export const signOut = createAsyncThunk('auth/signOut', async () => {
  await auth().signOut();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signUp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Sign up failed';
      })
      .addCase(signIn.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Sign in failed';
      })
      .addCase(signOut.fulfilled, state => {
        state.user = null;
      });
  },
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;
