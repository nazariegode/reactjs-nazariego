import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ItemCard.scss"


const ItemCard = ({id, producto, precio, descripcion, img, stock}) => {

    return (
        <div className='col-3 m-2'>
                <h4>{producto}</h4>
                <img src={img} alt={producto}/>
                <p>{descripcion}</p>
                {stock <= 5 && <p style={{fontWeight: 700, color: 'red'}}>Quedan sólo {stock} unidades!</p>}
                <p>Precio: ${precio}</p>
                <Link className="btn btn-primary" to={`/detail/${id}`}>Ver más</Link>
        </div>
    )
}

export default ItemCard