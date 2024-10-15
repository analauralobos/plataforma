import React, { useState, useEffect } from "react";
import { Container, Table, TableHeader, TableBody, TableHeaderCell, TableCell, Button, TableContainer } from "./TablesStyles"; 
import { useNavigate } from "react-router-dom";

const URLPagos = 'http://localhost:8080/pagos';
const URLSocios = 'http://localhost:8080/personas';

export default function Pagos() {
    const [pagos, setPagos] = useState([]);
    const [socios, setSocios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [socioBusqueda, setSocioBusqueda] = useState('');
    const [sociosFiltrados, setSociosFiltrados] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resPagos = await fetch(URLPagos);
                if (!resPagos.ok) throw new Error('Error al obtener los pagos');
                const dataPagos = await resPagos.json();
                setPagos(dataPagos.data);

                const resSocios = await fetch(URLSocios);
                if (!resSocios.ok) throw new Error('Error al obtener los socios');
                const dataSocios = await resSocios.json();
                setSocios(dataSocios.data);

                setSociosFiltrados(dataPagos.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const filtrados = pagos.filter(pago => {
            const socio = socios.find(s => s.nro_socio === pago.ID_Socio);
            const socioNombre = socio ? socio.apellido_nombre.toLowerCase() : '';
            const socioDocumento = socio ? socio.documento : '';
            return (
                pago.ID_Socio.toString().includes(socioBusqueda) ||
                socioNombre.includes(socioBusqueda.toLowerCase()) ||
                socioDocumento?.toString().includes(socioBusqueda)
            );
        });
        setSociosFiltrados(filtrados);
    }, [socioBusqueda, pagos, socios]);

    const handleIngresarNuevoPago = () => {
        navigate('/nuevo-pago');
    };

    const handlePagarCuota = (idPago) => {
        navigate(`/pagar-cuota/${idPago}`); // Redirigir a la página de registro de pago
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Container>
            <h2>Pagos</h2>
            <div>
                <input
                    type="text"
                    value={socioBusqueda}
                    onChange={(e) => setSocioBusqueda(e.target.value)}
                    placeholder="Buscar Socio por ID, Nombre o Documento"
                />
                <Button onClick={handleIngresarNuevoPago}>Alta de Pago</Button>
            </div>

            <TableContainer>
                {sociosFiltrados.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <tr>
                                <TableHeaderCell>ID Pago</TableHeaderCell>
                                <TableHeaderCell>Fecha Inicio</TableHeaderCell>
                                <TableHeaderCell>Fecha Vencimiento</TableHeaderCell>
                                <TableHeaderCell>Cuotas Pagadas</TableHeaderCell>
                                <TableHeaderCell>Monto Total</TableHeaderCell>
                                <TableHeaderCell>ID Socio</TableHeaderCell>
                                <TableHeaderCell>Nombre del Socio</TableHeaderCell>
                                <TableHeaderCell>ID Cuota</TableHeaderCell>                                
                                <TableHeaderCell>Acciones</TableHeaderCell>
                            </tr>
                        </TableHeader>
                        <TableBody>
                            {sociosFiltrados.map(pago => {
                                const socio = socios.find(s => s.nro_socio === pago.ID_Socio);
                                return (
                                    <tr key={pago.ID_Pago}>
                                        <TableCell>{pago.ID_Pago}</TableCell>
                                        <TableCell>{new Date(pago.Fecha_Inicio).toLocaleDateString()}</TableCell>
                                        <TableCell>{new Date(pago.Fecha_Vencimiento).toLocaleDateString()}</TableCell>
                                        <TableCell>{pago.Cuotas_Pagadas}</TableCell>
                                        <TableCell>{pago.Monto_Total}</TableCell>
                                        <TableCell>{socio ? socio.nro_socio : 'Desconocido'}</TableCell>
                                        <TableCell>{socio ? socio.apellido_nombre : 'Desconocido'}</TableCell>
                                        <TableCell>{pago.ID_Cuota}</TableCell>                                        
                                        <TableCell>
                                            <Button onClick={() => handlePagarCuota(pago.ID_Pago)}>Pagar Cuota</Button>
                                        </TableCell>
                                    </tr>
                                );
                            })}
                        </TableBody>
                    </Table>
                ) : (
                    <div>
                        <p>No se encontraron pagos para este socio.</p>
                    </div>
                )}
            </TableContainer>

        </Container>
    );
}
