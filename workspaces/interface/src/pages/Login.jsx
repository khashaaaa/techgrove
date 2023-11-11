import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoaderContext } from '../context/LoaderContext'
import { SocialAuth } from '../comps/SocialAuth'
import { AuthLayout } from '../layouts/AuthLayout'
import { IconArrowRight, IconEye, IconEyeOff } from '@tabler/icons-react'
import { Alert } from '../comps/Alert'
import { Loader } from '../comps/Loader'
import Cookies from 'js-cookie'
import { server_url } from '../../constant'

export const Login = () => {
	const access_token = Cookies.get('access_token')
	const navigate = useNavigate()

	const [mobile, setMobile] = useState('')
	const [password, setPassword] = useState('')

	const [message, setMessage] = useState('')
	const [toggle, setToggle] = useState(false)

	const { show, hide } = useContext(LoaderContext)

	useEffect(() => {
		if (access_token) {
			navigate('/')
		}
	}, [])

	const handleMobile = (e) => {
		const val = e.target.value

		if (val.length <= 8) {
			setMobile(val)
		}
	}

	const handlePassword = (e) => {
		setPassword(e.target.value)
	}

	const loginUser = async () => {
		try {
			show()

			const form = {
				mobile,
				password
			}

			const options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(form)
			}

			const raw = await fetch(server_url + 'customer/login', options)
			const resp = await raw.json()

			if (resp.ok) {
				Cookies.set('access_token', resp.access_token)
				Cookies.set('customer', JSON.stringify(resp.customer))
				setTimeout(() => { hide(), navigate('/') }, 2000)
			} else {
				hide()
				setMessage(resp.message)
			}

			setTimeout(() => setMessage(), 2000)
		} catch (error) {
			console.error('Error:', error)
		}
	}

	return (
		<AuthLayout>
			{
				message ? <Alert msg={message} proc={setMessage} /> : null
			}
			<p className="my-4 text-center">Нэвтрэх хэсэг</p>
			<Link
				to="/register"
				className="flex items-center justify-end text-xs text-white bg-blue-400 rounded-xl px-2"
			>
				<IconArrowRight /> эсвэл бүртгүүлэх
			</Link>
			<div className="grid grid-rows-3 gap-4 mt-8 w-80 text-sm">
				<input
					onChange={handleMobile}
					value={mobile}
					type="number"
					placeholder="Утасны дугаар"
					className="outline-none border-none bg-stone-200 px-4 py-2 rounded-xl focus:ring-4 focus:ring-emerald-200 delay-100"
				/>
				<div className='flex items-center'>
					<input onChange={handlePassword} value={password} type={toggle ? 'text' : 'password'} placeholder='Нууц үг' className='w-full mr-2 outline-none border-none bg-stone-200 px-4 py-2 rounded-xl focus:ring-4 focus:ring-emerald-200 delay-100' />
					{
						toggle ? <IconEyeOff onClick={() => setToggle(!toggle)} className='cursor-pointer' /> : <IconEye onClick={() => setToggle(!toggle)} className='cursor-pointer' />
					}
				</div>
				<button
					onClick={loginUser}
					className="bg-emerald-600 text-white rounded-xl px-4 py-2 focus:ring-4 focus:ring-emerald-200 hover:bg-emerald-500 delay-100"
				>
					Нэвтрэх
				</button>
				<SocialAuth />
			</div>
		</AuthLayout>
	)
}
