import { useContext, useEffect, useState } from "react"
import { MainLayout } from "../layouts/MainLayout"
import Select from 'react-select'
import Cookies from "js-cookie"
import { server_url } from "../../constant"
import { useNavigate } from "react-router-dom"
import { LoaderContext } from "../context/LoaderContext"
import { Alert } from "../comps/Alert"

export const TradeIn = () => {

    const navigate = useNavigate()
    const access_token = Cookies.get('access_token')
    const customer = Cookies.get('customer')

    const [currentPhone, setCurrentPhone] = useState()
    const [selectedPhone, setSelectedPhone] = useState()
    const [haveScratch, setHaveScratch] = useState(false)
    const [batteryHealth, setBatteryHealth] = useState(null)

    const [message, setMessage] = useState('')
    const { show, hide } = useContext(LoaderContext)

    const [queue, setQueue] = useState()

    useEffect(() => {
        if(!access_token && !customer) {
            navigate('/login')
            return
        }
        GetQueues()
    }, [])

    const offers = [
        { value: 'ip15', label: 'iPhone 15' },
        { value: 'ip15plus', label: 'iPhone 15 Plus' },
        { value: 'ip15pro', label: 'iPhone 15 Pro' },
        { value: 'ip15promax', label: 'iPhone 15 ProMax' }
    ]

    const choices = [
        { value: 'ipXR', label: 'iPhone XR' },
        { value: 'ipXS', label: 'iPhone XS' },
        { value: 'ipXSmax', label: 'iPhone XS Max' },
        { value: 'ip11', label: 'iPhone 11' },
        { value: 'ip11pro', label: 'iPhone 11 Pro' },
        { value: 'ip11promax', label: 'iPhone 11 ProMax' },
        { value: 'ip12mini', label: 'iPhone 12 Mini' },
        { value: 'ip12', label: 'iPhone 12' },
        { value: 'ip12pro', label: 'iPhone 12 Pro' },
        { value: 'ip12promax', label: 'iPhone 12 ProMax' },
        { value: 'ip13mini', label: 'iPhone 13 Mini' },
        { value: 'ip13', label: 'iPhone 13' },
        { value: 'ip13pro', label: 'iPhone 13 Pro' },
        { value: 'ip13promax', label: 'iPhone 13 ProMax' },
        { value: 'ip14', label: 'iPhone 14' },
        { value: 'ip14plus', label: 'iPhone 14 Plus' },
        { value: 'ip14pro', label: 'iPhone 14 Pro' },
        { value: 'ip14promax', label: 'iPhone 14 ProMax' }
    ]

    const GetQueues = async () => {

        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }

        const raw = await fetch(server_url + 'tradin', options)
        const resp = await raw.json()
        setQueue(resp[0])
    }

    const CreateQueue = async () => {

        if (!currentPhone || !selectedPhone || !haveScratch || !batteryHealth) {
            setMessage('Утгуудыг бүрэн оруулна уу')
            return
        }

        const decodedValue = decodeURIComponent(customer)
		const storedObject = JSON.parse(decodedValue)

        const request = {
            customer: storedObject,
            current_model: currentPhone,
            queued_model: selectedPhone,
            scatch: haveScratch,
            battery: parseInt(batteryHealth)
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access_token}`
            },
            body: JSON.stringify(request)
        }

        const raw = await fetch(server_url + 'tradin', options)
        const resp = await raw.json()

        show()
        
        if(resp.ok) {
            setTimeout(() => {
                hide()
            }, 2000)
            GetQueues()
        } else {
            hide()
            setMessage(resp.message)
        }
        setTimeout(() => setMessage(''), 2000)
    }

    return (
        <MainLayout>
            <div className="flex justify-center">
                {
                    message ? <Alert msg={message} proc={setMessage} /> : null
                }
            </div>
            <div className="h-screen w-4/5 mx-auto py-8 grid grid-cols-3 gap-4">
                <div className="col-span-2">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm">Таны одоогийн утас</p>
                            <Select onChange={(e) => setCurrentPhone(e.value)} options={choices} className="w-full mt-2" />
                        </div>
                        <div>
                            <p className="text-sm">Сонирхож буй утас</p>
                            <Select onChange={(e) => setSelectedPhone(e.value)} options={offers} className="w-full mt-2" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="flex flex-col">
                            <p className="text-sm">Сэв зураастай эсэх</p>
                            <div>
                                <div className="flex mt-2">
                                    <input onChange={() => setHaveScratch(true)} checked={haveScratch === true} name="scratch" type="radio" value="Тийм" id="yes" />
                                    <label htmlFor="yes" className="text-sm ml-2">Тийм</label>
                                </div>
                                <div className="flex">
                                    <input onChange={() => setHaveScratch(false)} checked={haveScratch === false} name="scratch" type="radio" value="Үгүй" id="not" />
                                    <label htmlFor="not" className="text-sm ml-2">Үгүй</label>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm">Батарейны үзүүлэлт</p>
                            <div className="flex items-center justify-between mt-2">
                                <input className="w-full mr-2" type="range" min="90" max="100" step="1" onChange={(e) => setBatteryHealth(e.target.value)} />
                                <p>{batteryHealth ? batteryHealth : 0}%</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button onClick={CreateQueue} className="bg-emerald-600 px-4 py-2 rounded-lg text-white font-bold hover:bg-emerald-500 focus:ring ring-emerald-300">Болсон</button>
                    </div>
                </div>
                
                <div>
                    {
                        queue ? (
                            <div className="p-4 border border-stone-200 rounded-xl">
                                <p className="text-center">Таны хүсэлт</p>
                                <div>
                                    <p>{queue.current_model}</p>
                                    <p>{queue.queued_model}</p>
                                </div>
                            </div>
                        )
                        :
                        null
                    }
                </div>
            </div>
        </MainLayout>
    )
}