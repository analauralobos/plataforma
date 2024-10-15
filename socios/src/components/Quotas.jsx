import React, { useState, useEffect } from "react";
import { ButtonContainer, DeleteButton, EditButton, Container, TableContainer, Table, TableHeader, TableBody, Button, TableCell, TableHeaderCell, SaveButton, CancelButtonIcon } from "./TablesStyles"; // Asegúrate de que el nombre sea correcto
import { BsFillTrashFill } from "react-icons/bs";
import { FiEdit, FiXCircle, FiSave } from "react-icons/fi";
const URLCuotas = 'http://localhost:8080/cuotas';  // URL para obtener todas las cuotas

// Función para conectar con el backend y manejar los datos de cuotas
function useCuotas(URL) {
    const [cuotas, setCuotas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(URL);
                if (!res.ok) throw new Error('Error al obtener los datos');
                const data = await res.json();
                setCuotas(data || []);  // Asegúrate de que `data` esté definido
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [URL]);

    return { cuotas, loading, error };
}

export default function Cuotas() {
    const [i, setI] = useState(0);  // Paginación
    const [montoEditado, setMontoEditado] = useState("");
    const [fechaVencimientoEditada, setFechaVencimientoEditada] = useState("");
    const [cuotaEnEdicion, setCuotaEnEdicion] = useState(null);
    const [tipoEditado, setTipoEditado] = useState("");
    const [cantidadEditada, setCantidadEditada] = useState("");
    const [nuevaCuota, setNuevaCuota] = useState({ Tipo: "", Monto: "", Cantidad: "", Fecha_Vencimiento: "", ID_Administrador: "" });  // Para agregar cuota

    const { cuotas, loading, error } = useCuotas(URLCuotas);

    const handlePrev = () => {
        if (i > 0) setI(i - 10);
    };

    const handleNext = () => {
        if ((i + 10) < cuotas.length) setI(i + 10);
    };

    const handleEdit = (cuota) => {
        setCuotaEnEdicion(cuota.ID_Cuota);
        setMontoEditado(cuota.Monto);
        setFechaVencimientoEditada(new Date(cuota.Fecha_Vencimiento).toISOString().split('T')[0]);  // Convertimos a formato "YYYY-MM-DD"
        setTipoEditado(cuota.Tipo);
        setCantidadEditada(cuota.Cantidad);
    };

    const handleSave = async (cuotaId) => {
        try {
            const updatedCuota = {
                Monto: montoEditado,
                Fecha_Vencimiento: fechaVencimientoEditada,
                Tipo: tipoEditado,
                Cantidad: cantidadEditada
            };

            const res = await fetch(`${URLCuotas}/${cuotaId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedCuota)
            });

            if (!res.ok) throw new Error('Error al actualizar la cuota');

            // Recargar datos después de editar
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    const handleCancelEdit = () => {
        setCuotaEnEdicion(null);
        setMontoEditado("");
        setFechaVencimientoEditada("");
        setTipoEditado("");
        setCantidadEditada("");
    };
    const handleDelete = () => {
        const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar la cuota?");
    };

    const handleAddCuota = async () => {
        try {
            const res = await fetch(URLCuotas, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevaCuota)
            });

            if (!res.ok) throw new Error('Error al agregar la cuota');

            // Limpiar el formulario
            setNuevaCuota({ Tipo: "", Monto: "", Cantidad: "", Fecha_Vencimiento: "", ID_Administrador: "" });
            // Recargar datos después de agregar
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Container>
            <h2>Cuotas Activas</h2>
            <div>
                <input
                    type="text"
                    placeholder="Tipo"
                    value={nuevaCuota.Tipo}
                    onChange={(e) => setNuevaCuota({ ...nuevaCuota, Tipo: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Monto"
                    value={nuevaCuota.Monto}
                    onChange={(e) => setNuevaCuota({ ...nuevaCuota, Monto: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Cantidad"
                    value={nuevaCuota.Cantidad}
                    onChange={(e) => setNuevaCuota({ ...nuevaCuota, Cantidad: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Fecha de Vencimiento"
                    value={nuevaCuota.Fecha_Vencimiento}
                    onChange={(e) => setNuevaCuota({ ...nuevaCuota, Fecha_Vencimiento: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="ID Administrador"
                    value={nuevaCuota.ID_Administrador}
                    onChange={(e) => setNuevaCuota({ ...nuevaCuota, ID_Administrador: e.target.value })}
                />
                <Button onClick={handleAddCuota}>Agregar Cuota</Button>
            </div>

            {cuotas && cuotas.length > 0 ? (
                <>
                    <TableContainer>
                        <Table>
                            <TableHeader>
                                <tr>
                                    <TableHeaderCell>ID Cuota</TableHeaderCell>
                                    <TableHeaderCell>Tipo</TableHeaderCell>
                                    <TableHeaderCell>Monto</TableHeaderCell>
                                    <TableHeaderCell>Cantidad</TableHeaderCell>
                                    <TableHeaderCell>Fecha de Vencimiento</TableHeaderCell>                                    
                                    <TableHeaderCell>Acciones</TableHeaderCell>
                                </tr>
                            </TableHeader>
                            <TableBody>
                                {cuotas.slice(i, i + 10).map((cuota) => (
                                    <tr key={cuota.ID_Cuota}>
                                        <TableCell>{cuota.ID_Cuota}</TableCell>
                                        <TableCell>
                                            {cuotaEnEdicion === cuota.ID_Cuota ? (
                                                <input
                                                    type="text"
                                                    value={tipoEditado}
                                                    onChange={(e) => setTipoEditado(e.target.value)}
                                                />
                                            ) : (
                                                cuota.Tipo
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {cuotaEnEdicion === cuota.ID_Cuota ? (
                                                <input
                                                    type="number"
                                                    value={montoEditado}
                                                    onChange={(e) => setMontoEditado(e.target.value)}
                                                />
                                            ) : (
                                                cuota.Monto
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {cuotaEnEdicion === cuota.ID_Cuota ? (
                                                <input
                                                    type="number"
                                                    value={cantidadEditada}
                                                    onChange={(e) => setCantidadEditada(e.target.value)}
                                                />
                                            ) : (
                                                cuota.Cantidad
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {cuotaEnEdicion === cuota.ID_Cuota ? (
                                                <input
                                                    type="date"
                                                    value={fechaVencimientoEditada}
                                                    onChange={(e) => setFechaVencimientoEditada(e.target.value)}
                                                />
                                            ) : (
                                                new Date(cuota.Fecha_Vencimiento).toLocaleDateString()
                                            )}
                                        </TableCell>
                                        
                                        <TableCell>
                                            <ButtonContainer>
                                                {cuotaEnEdicion === cuota.ID_Cuota ? (
                                                    <>
                                                        <SaveButton onClick={() => handleSave(cuota.ID_Cuota)}>
                                                            <FiSave size={20} />
                                                        </SaveButton>
                                                        <CancelButtonIcon onClick={() => handleCancelEdit()}>
                                                            <FiXCircle size={20} />
                                                        </CancelButtonIcon>
                                                    </>
                                                ) : (
                                                    <>
                                                        <EditButton onClick={() => handleEdit(cuota)}>
                                                            <FiEdit size={20} />
                                                        </EditButton>
                                                        <DeleteButton onClick={() => handleDelete(cuota)}>
                                                            <BsFillTrashFill size={20} />
                                                        </DeleteButton>
                                                    </>
                                                )}
                                            </ButtonContainer>
                                        </TableCell>
                                    </tr>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Paginación */}
                    <div className="pagination">
                        <Button onClick={handlePrev} disabled={i === 0}>
                            Anterior
                        </Button>
                        <Button
                            onClick={handleNext}
                            disabled={(i + 10) >= cuotas.length}
                        >
                            Siguiente
                        </Button>
                    </div>

                </>
            ) : (
                <p>No hay cuotas disponibles.</p>
            )}
        </Container>
    );
}
