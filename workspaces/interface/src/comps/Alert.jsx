export const Alert = ({ msg, proc }) => {

    setTimeout(() => proc(), 2000)

    return (
        <div className="fixed top-1/2 bg-amber-600 p-4 rounded-xl z-10 shadow-xl">
            <p className="text-white text-md">{msg}</p>
        </div>
    )
}