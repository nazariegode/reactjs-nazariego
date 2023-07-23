
const ItemCount = ({ max, cantidad, setCantidad, handleAgregar }) => {
    

    const handleSumar = () => {
        cantidad < max && setCantidad(cantidad + 1)
    }

    const handleRestar = () => {
        cantidad > 1 && setCantidad(cantidad - 1)
    } 
    
    const darkMode = true


    return (
        <div>
            <button 
                onClick={handleRestar} 
                className={`btn  ${cantidad === 1 ? "btn btn-primary" : "btn btn-primary"}`}
                disabled={cantidad === 1}
            >
                -
            </button>

            <span className="mx-1">{cantidad}</span>
            <button 
                onClick={handleSumar} 
                className={cantidad === max ? "btn btn-primary" : "btn btn-primary"}
                disabled={cantidad === max}

            >
                +
            </button>
            <br/>
            <button onClick={handleAgregar} 
            className="btn btn-success my-2">Agregar al carrito</button>
        </div>
    )
}

export default ItemCount