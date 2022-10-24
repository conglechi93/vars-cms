import {
    OTP_REQUEST_SUCCESS,
    OTP_REQUEST_FAIL,
    OTP_VERIFY_SUCCESS,
    OTP_VERIFY_FAIL,
    OTP_REQUEST_START,
    OTP_VERIFY_START,
    OTP_CHANGE_PHONE_NUMBER,
    OTP_RESET,
    OTP_RESET_TIMEOUT
} from '../../shared/constants/ActionTypes';
const INIT_STATE = {
    error: '',
    loading: false,
    otpSessionId: '',
    phoneNumber: '',
    action: '',
    otpToken: '',
    timeout: 60000
};


const OTPReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case OTP_REQUEST_START:
            return {
                ...state,
                error: '',
                loading: true,
                phoneNumber: action.payload.phoneNumber,
                action: action.payload.action
            }
        case OTP_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                loading: false,
                otpSessionId: action.payload.otpSessionId,
                timeout: INIT_STATE.timeout
            }
        case OTP_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case OTP_VERIFY_START:
            return {
                ...state,
                error: '',
                loading: true,
            }
        case OTP_VERIFY_SUCCESS:
            return {
                ...state,
                loading: false,
                otpSessionId: '',
                otpToken: action.payload.otpToken
            }
        case OTP_VERIFY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case OTP_CHANGE_PHONE_NUMBER:
            return {
                ...state,
                phoneNumber: '',
                otpSessionId: ''
            }
        case OTP_RESET:
            return {
                ...INIT_STATE
            }
        case OTP_RESET_TIMEOUT:
            return {
                ...state,
                timeout: 0
            }
        default:
            return state;
    }
}
export default OTPReducer;