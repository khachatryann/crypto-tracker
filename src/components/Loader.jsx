import { useEffect, useState } from "react";
import loader from "../loader.png"

const Loader = () => {

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }, [])

    return (
        <div className="loader-container">
            <div className="loader-spinner"><img src={loader} /></div>
        </div>
    );
}

export default Loader;  