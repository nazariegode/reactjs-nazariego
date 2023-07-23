import { useContext } from "react"
import { CartContext } from "../../Context/CartContext"

const Contacto = () => {
    const contexto = useContext(CartContext)
    console.log(contexto)
    
    return (
            <div>
                <h2>Contacto</h2>
                <hr />
                <p>Para mayor informacion, ubicanos en las siguientes direcciones... </p>

            </div>
    )
}

export default Contacto 