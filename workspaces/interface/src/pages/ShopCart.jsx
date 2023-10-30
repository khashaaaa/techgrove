import { useEffect, useState } from 'react'
import { MainLayout } from '../layouts/MainLayout'
import Cookies from 'js-cookie'

export const ShopCart = () => {
	const access_token = Cookies.get('access_token')
	const customer = Cookies.get('customer')

	const [cards, setCards] = useState()

	useEffect(() => {
		if (!access_token) {
			navigate('/login')
		}
		getCard()
	}, [])

	const getCard = async () => {
		const options = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${access_token}`
			}
		}

		const raw = await fetch('http://localhost:8080/cart', options)
		const resp = await raw.json()
		setCards(resp)
	}

	const decodedValue = decodeURIComponent(customer)
	const storedObject = JSON.parse(decodedValue)

	return (
		<MainLayout>
			<div className="w-4/5 mx-auto py-8 grid grid-cols-4">
				{cards?.map((card, num) => {
					return (
						<div
							key={num}
							className="border-dashed border-2 border-stone-400 rounded-2xl p-4"
						>
							<table>
								<tbody>
									<tr>
										<td>Customer:</td>
										<td>{storedObject.given_name}</td>
									</tr>
									<tr>
										<td>Model:</td>
										<td>iPhone {card.products.model}</td>
									</tr>
									<tr>
										<td>Color:</td>
										<td>{card.products.color}</td>
									</tr>
									<tr>
										<td>Storage:</td>
										<td>{card.products.storage}</td>
									</tr>
								</tbody>
							</table>
						</div>
					)
				})}
			</div>
		</MainLayout>
	)
}
