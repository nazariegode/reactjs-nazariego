import ItemCard from "../ItemCard/ItemCard"


const ItemList = ({items = []}) => {

    return (
            <div className='row'>
                {
                    items.map((prod) => <ItemCard key={prod.id} {...prod}/>)
                }
            </div>
    )
}

export default ItemList

 