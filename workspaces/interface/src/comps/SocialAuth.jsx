import { IconBrandGoogle, IconBrandFacebook } from "@tabler/icons-react"

export const SocialAuth = () => {

    return (
        <div className="w-full grid grid-cols-2 gap-4">
            <button className="flex items-center justify-between px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-500 delay-100"><IconBrandGoogle />Google</button>
            <button className="flex items-center justify-between px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 delay-100"><IconBrandFacebook />Facebook</button>
        </div>
    )
}