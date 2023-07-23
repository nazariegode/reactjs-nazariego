import { useContext } from "react"
import { CartContext } from "../../Context/CartContext"
import chef from '../../assets/chef.jpeg';

const Nosotros = () => {
    const contexto = useContext(CartContext)
    console.log(contexto)
    
    return (
            <div>
                <h2>Nosotros</h2>
                <hr />
                <img src={chef} alt="chef" width={500}/>
                <br />
                <p>En NAZARISUSHI nos caracterizamos por escoger los mejores ingredientes y el mejor sazón para el deleite de tu paladar, cocina con amplia experiencia en el rubro de la comida Japonesa como la comida Peruana. Nuestro Chef es un experto en sabores y tradiciones fusionando lo mejor de estos dos exquisitos mundos, Deleitate junto a nosotros en un vendaval que te aseguramos no te arrepentiras. ven a disfrutar del real sabor de la comida.</p>
            </div>
    )
}

export default Nosotros 