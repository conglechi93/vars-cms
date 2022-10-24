import { appIntl } from "@crema/utility/helper/Utils";
import axios from "axios";
import { FETCH_ERROR, OTP_REQUEST_FAIL, OTP_REQUEST_START, OTP_REQUEST_SUCCESS, OTP_VERIFY_FAIL, OTP_VERIFY_SUCCESS, SHOW_MESSAGE } from "shared/constants/ActionTypes";
var server = process.env.REACT_APP_API_OTP_CAPTCHA_URL || 'http://localhost:5000';
export const requestOTP = ({ siteKey, phoneNumber, captchaToken, action }) => {
    return (dispatch) => {
        const { messages } = appIntl();
        dispatch({ type: OTP_REQUEST_START, payload: { phoneNumber: phoneNumber, action: action } });

        return axios.post("/otp/request", {
            siteKey: siteKey,
            phoneNumber: phoneNumber,
            captchaToken: captchaToken,
            action: action
        }, {
            baseURL: server
        })
            .then(({ data }) => {
                dispatch({ type: OTP_REQUEST_SUCCESS, payload: { otpSessionId: data.data.otpSessionId } })
            })
            .catch((e) => {
                dispatch({ type: OTP_REQUEST_FAIL, payload: messages['common.error'] });
                dispatch({ type: FETCH_ERROR, payload: messages['common.error'] })
            })
    }
}


export const verifyOTP = ({ siteKey, otpValue, otpSessionId }) => {
    return (dispatch) => {
        const { messages } = appIntl();
        axios.post("/otp/verify", {
            siteKey: siteKey,
            otpValue: otpValue,
            otpSessionId: otpSessionId
        }, {
            baseURL: server
        })
            .then(({ data }) => {
                dispatch({ type: OTP_VERIFY_SUCCESS, payload: { otpToken: data.data.otpToken } })
            })
            .catch(() => {
                dispatch({ type: OTP_VERIFY_FAIL, payload: messages['common.error'] });
                dispatch({ type: FETCH_ERROR, payload: messages['common.error'] });
            })
    }
}

