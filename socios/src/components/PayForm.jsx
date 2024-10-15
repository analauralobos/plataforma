import React, { useState, useEffect } from "react";
import { CancelButton, FormContainer, Button} from "./TablesStyles"; 
import { useNavigate, useParams } from "react-router-dom"; 

const URLPagos = 'http://localhost:8080/pagos';
const URLCuotas = 'http://localhost:8080/cuotas';
const URLPagosRealizados = 'http://localhost:8080/pagosrealizados';

export default function PagoForm() {
    const { id } = useParams(); 
    const [cuotas, setCuotas] = useState([]); 
    const [ID_Socio, setID_Socio] = useState('');
    const [socioNombre, setSocioNombre] = useState(''); 
    const [cuotaSeleccionada, setCuotaSeleccionada] = useState(null); 
    const [cuotasAPagar, setCuotasAPagar] = useState(1); 
    const [montoTotal, setMontoTotal] = useState(0);
    const [metodoPago, setMetodoPago] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPago = async () => {
            try {
                const response = await fetch(`${URLPagos}/${id}`);
                if (!response.ok) {
                    const errorText = await response.text(); 
                    throw new Error(`Error al obtener el pago: ${errorText}`);
                }
                const result = await response.json();
                const pago = result.data; 
                
                setID_Socio(pago.ID_Socio);
                setSocioNombre(`Socio #${pago.ID_Socio}`);
            } catch (err) {
                setError(err.message);
                console.error("Error detallado:", err);
            }
        };

        const fetchCuotas = async () => {
            try {
                const response = await fetch(URLCuotas);
                if (!response.ok) throw new Error('Error al obtener cuotas');
                const data = await response.json();
                console.log('Cuotas obtenidas:', data); 
                setCuotas(data); 
            } catch (err) {
                setError(err.message);
            }
        };

        fetchPago(); 
        fetchCuotas(); 
    }, [id]);

    const handleCuotaChange = (e) => {
        const cuotaID = e.target.value;
        const cuota = cuotas.find(c => c.ID_Cuota === parseInt(cuotaID));
        setCuotaSeleccionada(cuota);
        
        if (cuota) {
            setMontoTotal(cuota.Monto * cuotasAPagar); 
        } else {
            setMontoTotal(0);
        }
    };

    const handleCuotasAPagarChange = (e) => {
        const cantidad = parseInt(e.target.value);
        setCuotasAPagar(cantidad);
        
        if (cuotaSeleccionada) {
            setMontoTotal(cuotaSeleccionada.Monto * cantidad); 
        }
    };
    const handleCancel = () => {
        navigate("/pay");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevoPagoRealizado = {
            ID_Socio: ID_Socio,
            Cuotas_Pagadas: cuotasAPagar,
            Monto: montoTotal, 
            Fecha_Pago: new Date().toISOString().slice(0, 10),
            Metodo_Pago: metodoPago,
            ID_Cuota: cuotaSeleccionada ? cuotaSeleccionada.ID_Cuota : null,
            Nombre_Socio: socioNombre, 
        };

        try {
                // 1. Guardar en Pagos_Realizados
                try {
                    const responseRealizado = await fetch(URLPagosRealizados, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(nuevoPagoRealizado),
                    });
                
                    const responseText = await responseRealizado.text(); 
                     if (!responseRealizado.ok) {
                        console.error('Error de respuesta:', responseText);
                         throw new Error(`Error al guardar fdfdel pago realizado: ${responseText}`);
                        }

                
                    const dataRealizado = JSON.parse(responseText); 
                    console.log('Pago realizado:', dataRealizado);
                } catch (err) {
                    console.error('Error:', err);
                    setError(err.message);
                }
                

            // 2. Obtener el número actual de Cuotas_Pagadas
            const responsePagoActual = await fetch(`${URLPagos}/${id}`);
            const pagoActual = await responsePagoActual.json();
            const totalCuotasPagadas = (pagoActual.data.Cuotas_Pagadas || 0) + cuotasAPagar;

            // 3. Actualizar el Pago
            const nuevoPago = {
                Cuotas_Pagadas: totalCuotasPagadas,
            };

            const responsePago = await fetch(`${URLPagos}/${id}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoPago),
            });

            if (!responsePago.ok) throw new Error('Error al actualizar el pago');

            
            //navigate('/pay');
        } catch (err) {
            setError(err.message);
        }
    };

    if (error) return <p>Error: {error}</p>;

    return (
        <FormContainer>
            <h1>Nuevo Pago</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID Socio:</label>
                    <input 
                        type="text" 
                        value={ID_Socio} 
                        readOnly 
                    />
                </div>
                <div>
                    <label>Nombre del Socio:</label>
                    <input 
                        type="text" 
                        value={socioNombre} 
                        readOnly 
                    />
                </div>
                <div>
                    <label>Cuota a Pagar:</label>
                    <select 
                        onChange={handleCuotaChange} 
                        required
                    >
                        <option value="">Seleccionar Cuota</option>
                        {cuotas.length > 0 && cuotas.map(cuota => (
                            <option key={cuota.ID_Cuota} value={cuota.ID_Cuota}>
                                {cuota.Tipo} - ${cuota.Monto} (ID: {cuota.ID_Cuota})
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Cantidad de Cuotas a Pagar:</label>
                    <input 
                        type="number" 
                        value={cuotasAPagar}
                        onChange={handleCuotasAPagarChange} 
                        min="1" 
                        required 
                    />
                </div>
                <div>
                    <label>Método de Pago:</label>
                    <input 
                        type="text" 
                        value={metodoPago}
                        onChange={(e) => setMetodoPago(e.target.value)} 
                        required 
                    />
                </div>                
                <div>
                    <label>Monto Total:</label>
                    <input 
                        type="number" 
                        value={montoTotal}
                        readOnly 
                    />
                </div>                
            </form>
            <Button type="submit">Confirmar Pago</Button>
            <CancelButton type="button" onClick={handleCancel}>Cancelar</CancelButton>
        </FormContainer>
    );
}

