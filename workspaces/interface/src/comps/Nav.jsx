import { Link } from "react-router-dom"
import { IconSearch, IconShoppingBag, IconLogin, IconUserPlus, IconDeviceMobile, IconDeviceIpad, IconDeviceImac, IconDeviceWatch, IconDeviceAirpods, IconDeviceLaptop } from "@tabler/icons-react"

export const Nav = () => {
  return (
    <div>
        <div className="bg-cyan-900 h-24 flex items-center justify-between">

            <Link to="/">
                <h1 className="text-green-400 text-2xl font-bold px-4">Tech Grove</h1>
            </Link>

            <div className="flex items-center w-1/2">
                <input type="text" className="outline-none border-none w-full rounded-l px-2 py-1.5" />
                <button type="button" className="bg-green-600 text-white rounded-r px-2 py-1.5"><IconSearch /></button>
            </div>

            <div className="flex">
                <Link to="/shopcart">
                    <button type="button" className="text-white text-xs flex flex-col items-center mr-4 w-16"><IconShoppingBag />Сагс</button>
                </Link>
                <Link to="/login">
                    <button type="button" className="text-white text-xs flex flex-col items-center mr-4 w-16"><IconLogin />Нэвтрэх</button>
                </Link>
                <Link to="register">
                    <button type="button" className="text-white text-xs flex flex-col items-center mr-4 w-16"><IconUserPlus />Бүртгүүлэх</button>
                </Link>
            </div>
        </div>

        <div className="bg-sky-950 flex items-center justify-center py-2">
            <button type="button" className="text-white text-xs flex items-center mx-2 px-1"><IconDeviceAirpods /><span className="ml-1">AirPods</span></button>
            <button type="button" className="text-white text-xs flex items-center mx-2 px-1"><IconDeviceWatch /><span className="ml-1">Watch</span></button>
            <button type="button" className="text-white text-xs flex items-center mx-2 px-1"><IconDeviceMobile /><span className="ml-1">Iphone</span></button>
            <button type="button" className="text-white text-xs flex items-center mx-2 px-1"><IconDeviceIpad /><span className="ml-1">Ipad</span></button>
            <button type="button" className="text-white text-xs flex items-center mx-2 px-1"><IconDeviceLaptop /><span className="ml-1">MacBook</span></button>
            <button type="button" className="text-white text-xs flex items-center mx-2 px-1"><IconDeviceImac /><span className="ml-1">Imac</span></button>
        </div>
    </div>
  )
}
