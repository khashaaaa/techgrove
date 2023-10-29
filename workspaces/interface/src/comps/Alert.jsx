export const Alert = ({ msg, proc }) => {

    setTimeout(() => proc(), 2000)

    return (
        msg ? <div className="absolute top-4 bg-amber-600 p-4 rounded-xl">
            <p className="text-white text-md">{msg}</p>
        </div>
            :
            null
    )
}