import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoaderContext } from '../context/LoaderContext';
import { IconArrowRight } from '@tabler/icons-react';
import { SocialAuth } from '../comps/SocialAuth';
import { AuthLayout } from '../layouts/AuthLayout';
import { Alert } from '../comps/Alert';
import Cookies from 'js-cookie';
import { server_url } from '../../constant';

export const Register = () => {
  const access_token = Cookies.get('access_token');
  const navigate = useNavigate();
  const { show, hide } = useContext(LoaderContext);

  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [given_name, setGivenName] = useState('');
  const [parent_name, setParentName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (access_token) {
      navigate('/');
    }
  }, [access_token, navigate]);

  const handleInputChange = (e, setValue) => {
    setValue(e.target.value);
  };

  const registerUser = async () => {
    try {
      show();
      const form = { mobile, email, given_name, parent_name };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      };

      const response = await fetch(server_url + 'customer', options);
      const data = await response.json();

      if (data.ok) {
        setTimeout(() => {
          hide();
          navigate('/login');
        }, 2000);
      } else {
        hide();
        setMessage(data.message);
      }
      setTimeout(() => setMessage(''), 2000);
    } catch (error) {
      console.error('Алдаа гарлаа: ', error);
    }
  };

  const inputFieldStyles =
    'outline-none border-none bg-stone-200 px-4 py-2 rounded-xl focus:ring-4 focus:ring-emerald-200 delay-100';
  const buttonStyles =
    'bg-emerald-600 text-white rounded-xl px-4 py-2 focus:ring-4 focus:ring-emerald-200 hover:bg-emerald-500 delay-100';

  const styles = {
    inputField: inputFieldStyles,
    buttonStyle: buttonStyles,
  };

  return (
    <AuthLayout>
      {message && <Alert msg={message} proc={setMessage} />}
      <p className='my-4 text-center'>Шинэ хэрэглэгч бүртгүүлэх хэсэг</p>
      <Link
        to='/login'
        className='flex items-center justify-end text-xs text-white bg-blue-400 rounded-xl px-2'
      >
        <IconArrowRight /> эсвэл нэвтрэх
      </Link>
      <div className='grid grid-rows-4 gap-4 mt-8 w-80 text-sm'>
        <input
          onChange={(e) => handleInputChange(e, setMobile)}
          value={mobile}
          type='number'
          placeholder='Утасны дугаар'
          className={styles.inputField}
        />
        <input
          onChange={(e) => handleInputChange(e, setEmail)}
          value={email}
          type='text'
          placeholder='Имэйл'
          className={styles.inputField}
        />
        <input
          onChange={(e) => handleInputChange(e, setGivenName)}
          value={given_name}
          type='text'
          placeholder='Нэр'
          className={styles.inputField}
        />
        <input
          onChange={(e) => handleInputChange(e, setParentName)}
          value={parent_name}
          type='text'
          placeholder='Овог'
          className={styles.inputField}
        />
        <button onClick={registerUser} className={styles.buttonStyle}>
          Болсон
        </button>
        <SocialAuth />
      </div>
    </AuthLayout>
  );
};
