import { useState } from "react"
import { useCartContext } from "../../context/CartContext"
import { Link, Navigate } from "react-router-dom"
import { writeBatch, collection, where, documentId, addDoc, updateDoc, doc, getDoc, query, getDocs } from "firebase/firestore"
import { db } from "../../firebase/config"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup'

const schema = Yup.object().shape({
    nombre: Yup.string()
        .required("Este campo es obligatorio")
        .min(3, "El nombre es muy corto")
        .max(20, "El nombre es demasiado largo"),
    direccion: Yup.string()
        .required("Este campo es obligatorio")
        .min(6, "La dirección es muy corta")
        .max(30, "La dirección es demasiado larga"),
    email: Yup.string()
        .required("Este campo es obligatorio")
        .email("Email inválido")
})


const Checkout = () => {
    const { cart, totalCompra, vaciarCarrito } = useCartContext()

    const [orderId, setOrderId] = useState(null)

    const crearOrden = async (values) => {
        const orden = {
            cliente: values,
            items: cart,
            total: totalCompra(),
            fecha: new Date()
        }

        const batch = writeBatch(db)
        const ordersRef = collection(db, "orders")
        const productosRef = collection(db, "productos")

        const q = query(productosRef, where(documentId(), "in", cart.map(item => item.id)))
        const productos = await getDocs(q)

        const outOfStock = []

        productos.docs.forEach((doc) => {
            const item = cart.find((prod) => prod.id === doc.id)
            const stock = doc.data().stock

            if (stock >= item.cantidad) {
                batch.update(doc.ref, {
                    stock: stock - item.cantidad
                })
            } else {
                outOfStock.push(item)
            }
        })

        if (outOfStock.length === 0) {
            batch.commit()
                .then(() => {
                    addDoc(ordersRef, orden)
                        .then((doc) => {
                            setOrderId(doc.id)
                            vaciarCarrito()
                        })
                        .catch(err => console.log(err))
                })
        } else {
            alert("Hay items sin stock")
        }

    }

    if (orderId) {
        return (
            <div className="container my-5">
                <h2>Tu compra se registró correctamente!</h2>
                <hr />
                <p>Tu número de compra es: <strong>{orderId}</strong></p>
                <Link to="/" className="btn btn-primary">Volver al inicio</Link>
            </div>
        )
    }

    if (cart.length === 0) {
        return <Navigate to="/" />
    }

    return (
        <div className="container my-5">
            <h2>Checkout</h2>
            <hr />

            <Formik
                initialValues={{
                    nombre: "",
                    direccion: "",
                    email: "",
                }}
                onSubmit={crearOrden}
                validationSchema={schema}
            >
                {() => (
                    <div className="container-formulario">
                        <Form className="container-input">
                            <div className="container-nombre">
                                <div className="container-titulo">
                                    <label htmlFor="nombre">Nombre:</label>
                                </div>
                                <Field type="text" name="nombre" className="form-control my-2" />
                                <ErrorMessage name="nombre" component={"p"} />
                            </div>
                            <div className="container-direccion">
                                <div className="container-titulo">
                                    <label htmlFor="direccion">Dirección:</label>
                                </div>
                                <Field type="text" name="direccion" className="form-control my-2" />
                                <ErrorMessage name="direccion" component={"p"} />
                            </div>
                            <div className="container-email">
                                <div className="container-titulo">
                                    <label htmlFor="email">Email:</label>
                                </div>
                                <Field type="email" name="email" className="form-control my-2" />
                                <ErrorMessage name="email" component={"p"} />
                            </div>


                            <div className="container-btn-enviar">
                                <button style={{ backgroundColor: "#4a90e2", color: 'white', width: 'width: 90px' }}
                                    className="btn">Confirmar</button>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    );
};


export default Checkout