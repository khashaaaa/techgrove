import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NumericFormat } from 'react-number-format'
import { IconX } from '@tabler/icons-react'
import Cookies from 'js-cookie'
import { server_url } from '../../constant'

export const PurchaseInfo = ({ product, price, close }) => {
	const { version, model, color, storage } = product

	const navigate = useNavigate()
	const access_token = Cookies.get('access_token')
	const customer = Cookies.get('customer')

	const [productImage, setProductImage] = useState('')
	const [message, setMessage] = useState('')

	useEffect(() => {
		generateImage()
	}, [productImage])

	const modelMap = {
		'14Base': '14',
		'14Plus': '14 plus',
		'15Base': '15',
		'15Plus': '15 plus',
		'15Pro': '15 pro',
		'15ProMax': '15 pro max'
	}

	const colorMap = {
		'14Blue': 'blue',
		'14Purple': 'purple',
		'14Yellow': 'yellow',
		'14Midnight': 'midnight',
		'14Starlight': 'starlight',
		'14Red': 'red',
		'15Blue': 'blue',
		'15Pink': 'pink',
		'15Yellow': 'yellow',
		'15Green': 'green',
		'15Black': 'black',
		'15ProNaturalTitanium': 'natural titanium',
		'15ProBlueTitanium': 'blue titanium',
		'15ProWhiteTitanium': 'white titanium',
		'15ProBlackTitanium': 'black titanium'
	}

	const selectedModel = modelMap[model] || model
	const selectedColor = colorMap[color] || color

	const generateImage = () => {
		if (model && color && storage) {
			let imageName = ''

			switch (model) {
				case '14Base':
				case '14Plus':
					switch (color) {
						case '14Blue':
							imageName = '14blue.png'
							break
						case '14Purple':
							imageName = '14purple.png'
							break
						case '14Yellow':
							imageName = '14yellow.png'
							break
						case '14Midnight':
							imageName = '14midnight.png'
							break
						case '14Starlight':
							imageName = '14starlight.png'
							break
						case '14Red':
							imageName = '14red.png'
							break
						default:
							break
					}
					break

				case '15Base':
				case '15Plus':
					switch (color) {
						case '15Blue':
							imageName = '15blue.png'
							break
						case '15Pink':
							imageName = '15pink.png'
							break
						case '15Yellow':
							imageName = '15yellow.png'
							break
						case '15Green':
							imageName = '15green.png'
							break
						case '15Black':
							imageName = '15black.png'
							break
						default:
							break
					}
					break

				case '15Pro':
				case '15ProMax':
					switch (color) {
						case '15ProNaturalTitanium':
							imageName = '15pro_naturaltitanium.png'
							break
						case '15ProBlueTitanium':
							imageName = '15pro_bluetitanium.png'
							break
						case '15ProWhiteTitanium':
							imageName = '15pro_whitetitanium.png'
							break
						case '15ProBlackTitanium':
							imageName = '15pro_blacktitanium.png'
							break
						default:
							break
					}
					break

				default:
					break
			}

			setProductImage(imageName)
		}
	}

	const InsertCart = async () => {
		const decodedValue = decodeURIComponent(customer)
		const storedObject = JSON.parse(decodedValue)

		const formdata = {
			customer: storedObject,
			products: {
				...product
			},
			total_price: price
		}

		try {
			const options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${access_token}`
				},
				body: JSON.stringify(formdata)
			}

			const raw = await fetch(server_url + 'cart', options)
			const resp = await raw.json()

			if (resp.ok) {
				setMessage(resp.message)
				Cookies.set('access_token', resp.access_token)
				close({})
				navigate('/cart')
			} else {
				setMessage(resp.message)
			}
		} catch (error) {
			console.error('Error:', error)
		}
	}

	return (
		<div className="mt-8 w-full flex justify-center items-center">
			<div className="flex justify-between rounded-2xl border-dashed border-2 border-stone-400 p-4 relative">
				<IconX
					onClick={() => close({})}
					className="absolute top-1 right-1 cursor-pointer"
				/>
				<div>
					<img
						style={{ height: '200px' }}
						className="w-full rounded-2xl"
						src={`/${productImage}`}
						alt=""
					/>
				</div>
				<div className="ml-8 flex flex-col justify-between">
					<table>
						<tbody>
							<tr>
								<td>Model:</td>
								<td>iPhone {selectedModel}</td>
							</tr>
							<tr>
								<td>Color:</td>
								<td>{selectedColor}</td>
							</tr>
							<tr>
								<td>Storage:</td>
								<td>{storage}</td>
							</tr>
						</tbody>
					</table>

					<div className="mt-8 flex justify-between items-center">
						<p className="font-bold">
							Дүн:{' '}
							<NumericFormat value={price} suffix={'₮'} thousandSeparator="," />
						</p>
						<button
							onClick={() => InsertCart()}
							className="bg-green-800 hover:bg-green-600 font-bold text-white text-sm rounded px-3 py-1 ml-4"
						>
							Сагслах
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
