import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  email: string;
  isEmailVerified: boolean;
  status: "active" | "blocked" | "pending";
  role: "admin" | "supplier" | "staff";
  profile: {
    name: string;
    phone: string;
    avatarUrl?: string | null;
    address?: string;
    employeeId?: string;
    joinDate?: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: {
    _id: "1",
    email: "admin@optiluxbd.com",
    isEmailVerified: true,
    status: "active",
    role: "supplier",
    profile: {
      name: "Admin User",
      phone: "+8801712345678",
      avatarUrl: null,
      address: "Dhaka, Bangladesh",
      employeeId: "ADM001",
      joinDate: "2024-01-01",
    },
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  token: "mock-jwt-token",
  isAuthenticated: true,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateProfile: (state, action: PayloadAction<Partial<User["profile"]>>) => {
      if (state.user) {
        state.user.profile = { ...state.user.profile, ...action.payload };
      }
    },
  },
});

export const { setCredentials, logout, setLoading, updateProfile } =
  authSlice.actions;
export default authSlice.reducer;
