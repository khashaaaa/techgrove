import { Link, useNavigate } from 'react-router-dom'
import {
	IconSearch,
	IconShoppingBag,
	IconLogin,
	IconUserPlus,
	IconDeviceMobile,
	IconDeviceIpad,
	IconDeviceImac,
	IconDeviceWatch,
	IconDeviceAirpods,
	IconDeviceLaptop,
	IconPower,
	IconTransform
} from '@tabler/icons-react'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { server_url } from '../../constant'

export const Nav = () => {
	const navigate = useNavigate()

	const access_token = Cookies.get('access_token')
	const customer = Cookies.get('customer')

	const [count, setCount] = useState(null)
	const [parsed, setParsed] = useState()

	useEffect(() => {
		if(!customer) {
			return
		}
		else {
			const decodedValue = decodeURIComponent(customer)
			const storedObject = JSON.parse(decodedValue)
			setParsed(storedObject)
			getCard(storedObject)
		}
	}, [])

	const getCard = async (user) => {

		const options = {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${access_token}`
			},
			body: {
				customer: user
			}
		}

		const raw = await fetch(server_url + 'cart/customer', options)
		const resp = await raw.json()

		setCount(resp.length)
	}

	const Logout = async () => {
		Cookies.remove('access_token')
		Cookies.remove('customer')
		navigate('/')
	}

	return (
		<div>
			<div className="bg-cyan-900 h-16 flex items-center justify-between">
				<Link to="/">
					<h1 className="text-green-400 text-2xl font-bold px-4">Tech Grove</h1>
				</Link>

				<div className="flex items-center w-1/2">
					<input
						type="text"
						className="outline-none border-none w-full rounded-l px-2 py-1.5"
					/>
					<button
						type="button"
						className="bg-green-600 text-white rounded-r px-2 py-1.5"
					>
						<IconSearch />
					</button>
				</div>

				<div className="flex">
					<Link to="/tradein">
						<button
							type="button"
							className="text-white text-xs flex flex-col items-center mr-4 w-16 relative"
						>
							<IconTransform />
							Солилцоо
						</button>
					</Link>
					<Link to="/shopcart">
						<button
							type="button"
							className="text-white text-xs flex flex-col items-center mr-4 w-16 relative"
						>
							<IconShoppingBag />

							{
								count ? (
									<p className="absolute right-4 top-0 flex items-center justify-center bg-emerald-600 w-4 h-4 rounded-full font-bold">
										{count}
									</p>
								)
								:
								null
							}
							Сагс
						</button>
					</Link>
					{access_token ? (
						<button
							onClick={Logout}
							type="button"
							className="text-white text-xs flex flex-col items-center mr-4 w-16"
						>
							<IconPower />
							Гарах
						</button>
					) : (
						<>
							<Link to="/login">
								<button
									type="button"
									className="text-white text-xs flex flex-col items-center mr-4 w-16"
								>
									<IconLogin />
									Нэвтрэх
								</button>
							</Link>
							<Link to="register">
								<button
									type="button"
									className="text-white text-xs flex flex-col items-center mr-4 w-16"
								>
									<IconUserPlus />
									Бүртгүүлэх
								</button>
							</Link>
						</>
					)}
				</div>
			</div>

			<div className="bg-sky-950 flex items-center justify-center py-2">
				<button
					type="button"
					className="text-white text-xs flex items-center mx-2 px-1"
				>
					<IconDeviceAirpods />
					<span className="ml-1">AirPods</span>
				</button>
				<button
					type="button"
					className="text-white text-xs flex items-center mx-2 px-1"
				>
					<IconDeviceWatch />
					<span className="ml-1">Watch</span>
				</button>
				<button
					type="button"
					className="text-white text-xs flex items-center mx-2 px-1"
				>
					<IconDeviceMobile />
					<span className="ml-1">Iphone</span>
				</button>
				<button
					type="button"
					className="text-white text-xs flex items-center mx-2 px-1"
				>
					<IconDeviceIpad />
					<span className="ml-1">Ipad</span>
				</button>
				<button
					type="button"
					className="text-white text-xs flex items-center mx-2 px-1"
				>
					<IconDeviceLaptop />
					<span className="ml-1">MacBook</span>
				</button>
				<button
					type="button"
					className="text-white text-xs flex items-center mx-2 px-1"
				>
					<IconDeviceImac />
					<span className="ml-1">Imac</span>
				</button>
			</div>
		</div>
	)
}
