import {Form, Input} from 'antd';
import throttle from 'lodash/throttle';
import {useRef, useState} from 'react';

export const useFormItemOTP = (otpCount, form) => {
  const inputRefs = Array.from({length: otpCount}).map(() => useRef(null));
  const [isPressedDelete, setIsPressedDelete] = useState(false);
  const focusNextInput = (num) => {
    if (num === otpCount - 1) return;
    else {
      inputRefs[num + 1].current.focus();
      inputRefs[num + 1].current.select();
    }
  };
  const focusPrevInput = (num) => {
    if (num === 0) return;
    else {
      inputRefs[num - 1].current.focus();
      inputRefs[num - 1].current.select();
    }
  };
  const onKeyDown = throttle((event, num) => {
    const pressedKey = event.key;
    switch (pressedKey) {
      case 'ArrowLeft': {
        if (event.target.selectionStart == 0) {
          event.preventDefault();
          focusPrevInput(num);
        }
        break;
      }
      case 'ArrowRight': {
        if ((event.target.value.length == event.target.selectionStart) == 1) {
          event.preventDefault();
          focusNextInput(num);
        }
        break;
      }
      case 'F5':
        break;
      // case 'Delete':
      case 'Backspace': {
        if (event.target.value) setIsPressedDelete(true);
        break;
      }
      case 'v':
      case 'V': {
        if (event.ctrlKey) {
          navigator.clipboard.readText().then((text) => {
            const trim = (text || '').trim();
            if (trim.length === otpCount && /^[0-9]+$/.test(trim)) {
              form.setFieldsValue({
                ...Array.from({length: otpCount}).reduce(
                  (acc, i, idx) => ({...acc, [idx]: trim[idx]}),
                  {},
                ),
              });
              document.body.focus();
              form.submit();
            }
          });
        }
        break;
      }
      default: {
        event.preventDefault();
        if (pressedKey.length > 1 || /^[^0-9]$/.test(pressedKey)) {
          event.preventDefault();
          return;
        }

        form.setFieldsValue({[num]: pressedKey});
        if (num === otpCount - 1) form.submit();
        else focusNextInput(num);
        break;
      }
    }
  }, 50);

  const onKeyUp = throttle((event, num) => {
    const pressedKey = event.key;
    switch (pressedKey) {
      case 'Backspace': {
        if (isPressedDelete) {
          setIsPressedDelete(false);
          return;
        }
        if (!event.target.value) focusPrevInput(num);
        break;
      }
      // case 'Delete': {
      //   if (isPressedDelete) {
      //     setIsPressedDelete(false)
      //     return
      //   }
      //   if (!event.target.value)
      //     focusNextInput(num)
      //   break;
      // }
      // case 'v':
      // case 'V': {
      //   if (event.ctrlKey) {
      //     navigator.clipboard.readText().then((text) => {
      //       const trim = (text || '').trim();
      //       if (trim.length === otpCount && /^[0-9]+$/.test(trim)) {
      //         form.setFieldsValue({
      //           ...Array.from({length: otpCount}).reduce(
      //             (acc, i, idx) => ({...acc, [idx]: trim[idx]}),
      //             {},
      //           ),
      //         });
      //         document.body.focus();
      //         form.submit();
      //       }
      //     });
      //   }
      //   break;
      // }
      // default: {
      //   if (isValidInput && event.target.value) {
      //     setIsValidInput(false);
      //     if (num === otpCount - 1) form.submit();
      //     else focusNextInput(num);
      //   }
      //   break;
      // }
      default: {
        event.preventDefault();
        break;
      }
    }
  }, 50);

  const generateInput = () => {
    return Array.from({length: otpCount}).map((_, num) => (
      <Form.Item
        key={num}
        name={num}
        rules={[{required: true, message: ''}]}
        className='otp-field'>
        <Input
          autoFocus={num == 0}
          ref={inputRefs[num]}
          maxLength={1}
          onKeyUp={(e) => onKeyUp(e, num)}
          onKeyDown={(e) => onKeyDown(e, num)}
        />
      </Form.Item>
    ));
  };

  return {generateInput};
};
