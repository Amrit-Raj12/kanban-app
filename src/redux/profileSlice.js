import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const ProfileSlice = createSlice({
    name: 'profileInfo',
    initialState,
    reducers: {
        setProfile(state, { payload }) {
            state.profile = payload
        }
    }
})

export const profileAction = ProfileSlice.actions
export default ProfileSlice.reducer 