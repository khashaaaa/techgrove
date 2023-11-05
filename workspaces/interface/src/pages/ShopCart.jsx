import { useContext, useEffect, useState } from 'react'
import { MainLayout } from '../layouts/MainLayout'
import Cookies from 'js-cookie'
import { server_url } from '../../constant'
import { useNavigate } from 'react-router-dom'
import { IconTrash } from '@tabler/icons-react'
import { LoaderContext } from '../context/LoaderContext'

export const ShopCart = () => {
	const navigate = useNavigate()
	const access_token = Cookies.get('access_token')
	const customer = Cookies.get('customer')

	const [cards, setCards] = useState()
	const [parsed, setParsed] = useState()

	const [message, setMessage] = useState('')
    const { show, hide } = useContext(LoaderContext)

	useEffect(() => {
		if (!access_token) {
			navigate('/login')
		}
		else {
			getCards()
		}
	}, [])

	const getCards = async () => {
		try {
			const decodedValue = decodeURIComponent(customer)
			const storedObject = JSON.parse(decodedValue)
			setParsed(storedObject)
	
			const options = {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${access_token}`
				},
				body: {
					customer: storedObject
				}
			}
	
			const raw = await fetch(server_url + 'cart/customer', options)
			const resp = await raw.json()
			setCards(resp)
		} catch (error) {
			setMessage('Мэдээлэл татахад алдаа гарлаа: ' + error)
		}

		setTimeout(() => setMessage(''), 2000)
	}

	const deleteCard = async (mark) => {
		try {
			show()
			const options = {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${access_token}`
				}
			}
	
			const raw = await fetch(`${server_url}cart/${mark}`, options)
			const resp = await raw.json()
			if (resp.ok) {
				setTimeout(() => {hide(), getCards()}, 2000)
			}
		}
		catch (error) {
			setMessage('Алдаа гарлаа: ' + error)
		}
		setTimeout(() => setMessage(''), 2000)
	}

	return (
		<MainLayout>
			<div className="w-4/5 mx-auto py-8 grid grid-cols-4 gap-4">
				<div className='grid grid-cols-3 gap-4 col-span-3 h-min'>
					{cards?.map((card, num) => {
						return (
							<div
								key={num}
								className="relative border-dashed border-2 border-stone-400 rounded-2xl p-4"
							>
								<IconTrash onClick={() => deleteCard(card.mark)} className='absolute top-2 right-2 cursor-pointer' />
								<table>
									<tbody>
										<tr>
											<td>Customer:</td>
											<td>{parsed.given_name}</td>
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

				<div>
					<div className='bg-emerald-400 rounded-2xl p-4'>
						<p className='text-center font-bold mb-4'>Үйлчилгээний нөхцөл</p>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum sit praesentium, impedit illo aliquam ipsum ducimus non aliquid possimus, expedita nesciunt commodi sequi fugiat, repudiandae minima facere rem consequuntur dolorum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, aliquam? Hic provident, non repellendus error fugiat velit modi sit! Minus autem temporibus voluptate deserunt tempore, numquam sit sunt asperiores aliquam! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam dolore distinctio aperiam quasi minima quod inventore nihil, optio hic, recusandae obcaecati amet iste sunt, officia corrupti omnis alias mollitia quae.</p>
					</div>
				</div>
			</div>
		</MainLayout>
	)
}
