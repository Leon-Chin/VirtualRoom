import { createSlice } from "@reduxjs/toolkit"
import { AC_MODE, FAN_SPEED } from "../constants/AC"
const initialState = {
    system: {
        airConditioner: {
            temperature: 16,
            fanSpeed: FAN_SPEED.MEDIUM,
            mode: AC_MODE.COOL,
            isOn: false
        },
        computer: false,
        curtain: false,
        lighting: {
            leftSide: false,
            middle1: false,
            middle2: false,
            middle3: false,
            rightSide: false
        },
        window: false
    }
}

export const SystemSlicer = createSlice({
    name: 'system',
    initialState,
    reducers: {
        setSystem: (state, action) => {
            state.system = action.payload
        },
    }
})

export const { setSystem } = SystemSlicer.actions

export default SystemSlicer.reducer