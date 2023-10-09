export const AuthLayout = ({ children }) => {

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-emerald-500">TechGrove</p>
            {children}
        </div>
    )
}