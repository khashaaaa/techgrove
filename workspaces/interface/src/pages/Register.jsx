import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoaderContext } from '../context/LoaderContext'
import { IconArrowRight, IconEye, IconEyeOff } from '@tabler/icons-react'
import { SocialAuth } from '../comps/SocialAuth'
import { AuthLayout } from '../layouts/AuthLayout'
import { Alert } from '../comps/Alert'
import Cookies from 'js-cookie'
import { server_url } from '../../constant'

export const Register = () => {
  const access_token = Cookies.get('access_token')
  const navigate = useNavigate()
  const { show, hide } = useContext(LoaderContext)

  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [given_name, setGivenName] = useState('')
  const [parent_name, setParentName] = useState('')
  const [message, setMessage] = useState('')

  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    if (access_token) {
      navigate('/')
    }
  }, [access_token, navigate])

  const handleInputChange = (e, setValue) => {
    setValue(e.target.value)
  }

  const registerUser = async () => {
    try {
      show()
      const form = { mobile, email, password, given_name, parent_name }
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      }

      const response = await fetch(server_url + 'customer', options)
      const data = await response.json()

      if (data.ok) {
        setTimeout(() => {
          hide()
          navigate('/login')
        }, 2000)
      } else {
        hide()
        setMessage(data.message)
        console.log(data)
      }
      setTimeout(() => setMessage(''), 2000)
    } catch (error) {
      console.error('Алдаа гарлаа: ', error)
    }
  }

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
      <div className='grid grid-rows-6 gap-4 mt-8 w-80 text-sm'>
        <input
          onChange={(e) => handleInputChange(e, setMobile)}
          value={mobile}
          type='number'
          placeholder='Утасны дугаар'
          className='outline-none border-none bg-stone-200 px-4 py-2 rounded-xl focus:ring-4 focus:ring-emerald-200 delay-100'
        />
        <input
          onChange={(e) => handleInputChange(e, setEmail)}
          value={email}
          type='text'
          placeholder='Имэйл'
          className='outline-none border-none bg-stone-200 px-4 py-2 rounded-xl focus:ring-4 focus:ring-emerald-200 delay-100'
        />
        <div className='flex items-center'>
          <input onChange={(e) => handleInputChange(e, setPassword)} value={password} type={toggle ? 'text' : 'password'} placeholder='Нууц үг' className='w-full mr-2 outline-none border-none bg-stone-200 px-4 py-2 rounded-xl focus:ring-4 focus:ring-emerald-200 delay-100' />
          {
            toggle ? <IconEyeOff onClick={() => setToggle(!toggle)} className='cursor-pointer' /> : <IconEye onClick={() => setToggle(!toggle)} className='cursor-pointer' />
          }
        </div>
        <input
          onChange={(e) => handleInputChange(e, setGivenName)}
          value={given_name}
          type='text'
          placeholder='Нэр'
          className='outline-none border-none bg-stone-200 px-4 py-2 rounded-xl focus:ring-4 focus:ring-emerald-200 delay-100'
        />
        <input
          onChange={(e) => handleInputChange(e, setParentName)}
          value={parent_name}
          type='text'
          placeholder='Овог'
          className='outline-none border-none bg-stone-200 px-4 py-2 rounded-xl focus:ring-4 focus:ring-emerald-200 delay-100'
        />
        <button onClick={registerUser} className='bg-emerald-600 text-white rounded-xl px-4 py-2 focus:ring-4 focus:ring-emerald-200 hover:bg-emerald-500 delay-100'>
          Болсон
        </button>
        <SocialAuth />
      </div>
    </AuthLayout>
  )
}
