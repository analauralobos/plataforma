import React, { useState, useEffect } from "react";
import { ButtonContainer, EditButton, DeleteButton, Container, Table, TableHeader, TableBody, TableHeaderCell, TableCell, Button, TableContainer } from "./TablesStyles";
import { useNavigate } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import { FiEdit, FiXCircle, FiSave } from "react-icons/fi";

const URLTodos = 'http://localhost:8080/personas';
const URLSocios = 'http://localhost:8080/personas/socios';
const URLAbonados = 'http://localhost:8080/abonados';

function Conectar(URL, searchTerm, cuota, tipoPersona) {
    const [personas, setPersonas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(URL);
                if (!res.ok) throw new Error('Error al obtener los datos');
                const data = await res.json();
                setPersonas(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [URL]);

    const filteredPersonas = personas.filter(persona => {
        const apellidoNombre = persona.apellido_nombre ? persona.apellido_nombre.toLowerCase() : '';
        const documento = persona.documento ? persona.documento.toLowerCase() : '';
        return apellidoNombre.includes(searchTerm.toLowerCase()) || documento.includes(searchTerm.toLowerCase());
    });

    const filteredByCuota = filteredPersonas.filter(persona =>
        cuota === "todos" ? true : persona.tipo_cuota === cuota
    );

    const filteredByTipoPersona = filteredByCuota.filter(persona =>
        tipoPersona === "todos" ? true : persona.tipo_persona === tipoPersona
    );

    return { personTable: filteredByTipoPersona, loading, error };
}

export default function Tables() {
    const [url, setUrl] = useState(URLTodos);
    const [i, setI] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [cuota, setCuota] = useState("todos");
    const [tipoPersona, setTipoPersona] = useState("todos");

    const { personTable, loading, error } = Conectar(url, searchTerm, cuota, tipoPersona);
    const navigate = useNavigate();

    const handlePrev = () => {
        if (i > 0) setI(i - 10);
    };

    const handleNext = () => {
        if ((i + 10) < personTable.length) setI(i + 10);
    };

    const handleFilterChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleUrlChange = (e) => {
        const selectedValue = e.target.value;
        switch (selectedValue) {
            case 'socios':
                setUrl(URLSocios);
                break;
            case 'abonados':
                setUrl(URLAbonados);
                break;
            default:
                setUrl(URLTodos);
                break;
        }
    };

    const handleCuotaChange = (e) => {
        setCuota(e.target.value);
    };

    const handleTipoPersonaChange = (e) => {
        setTipoPersona(e.target.value);
    };

    const handleDelete = async (nro_socio) => {
        const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este socio?");
        if (confirmDelete) {
            try {
                const response = await fetch(`${URLTodos}/${nro_socio}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    alert('Socio eliminado con éxito');
                    window.location.reload();  // Recarga la página para actualizar la lista
                } else {
                    alert('Error al eliminar el socio');
                }
            } catch (error) {
                console.error("Error al eliminar el socio:", error);
            }
        }
    };

    const handleEdit = (nro_socio) => {
        navigate(`/editar-socio/${nro_socio}`);
    };

    const handleAdd = () => {
        navigate(`/agregar-socio`);  // Redirige a la página para agregar un nuevo socio
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Container>
            <h2>Socios</h2>
            <div>
                <select onChange={handleUrlChange} defaultValue="todos">
                    <option value="todos">Todos</option>
                    <option value="socios">Socios</option>
                    <option value="abonados">Abonados</option>
                </select>

                <input
                    type="text"
                    placeholder="Buscar por nombre, apellido o DNI"
                    value={searchTerm}
                    onChange={handleFilterChange}
                />

                <select onChange={handleCuotaChange} value={cuota}>
                    <option value="todos">Tipo de Cuota (Todos)</option>
                    <option value="Socio">Socio</option>
                    <option value="Rifa">Rifa</option>
                </select>

                <Button onClick={handleAdd}>Agregar Socio</Button> {/* Botón para agregar socio */}
            </div>

            <TableContainer>
                <Table>
                    <TableHeader>
                        <tr>
                            <TableHeaderCell className="nro">Nº Socio</TableHeaderCell>
                            <TableHeaderCell>Apellido y Nombre</TableHeaderCell>
                            <TableHeaderCell className="dni">Documento</TableHeaderCell>
                            <TableHeaderCell>Dirección</TableHeaderCell>
                            <TableHeaderCell>Teléfono</TableHeaderCell>
                            <TableHeaderCell>Email</TableHeaderCell>
                            <TableHeaderCell>Fecha de Inicio</TableHeaderCell>
                            <TableHeaderCell>Acciones</TableHeaderCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {personTable.slice(i, i + 10).map((persona) => (
                            <tr key={persona.nro_socio}>
                                <TableCell className="nro">{persona.nro_socio}</TableCell>
                                <TableCell>{persona.apellido_nombre}</TableCell>
                                <TableCell className="dni">{persona.documento}</TableCell>
                                <TableCell>{persona.direccion}</TableCell>
                                <TableCell>{persona.telefono}</TableCell>
                                <TableCell>{persona.email}</TableCell>
                                <TableCell>{persona.fecha_inicio}</TableCell>
                                <TableCell>
                                    <ButtonContainer>
                                        <EditButton onClick={() => handleEdit(persona.nro_socio)}>
                                            <FiEdit size={20} />
                                        </EditButton>
                                        <DeleteButton onClick={() => handleDelete(persona.nro_socio)}>
                                            <BsFillTrashFill size={20} />
                                        </DeleteButton>
                                    </ButtonContainer>
                                </TableCell>
                            </tr>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className="pagination">
                <Button onClick={handlePrev} disabled={i === 0}>
                    Anterior
                </Button>
                <Button
                    onClick={handleNext}
                    disabled={(i + 10) >= personTable.length}
                >
                    Siguiente
                </Button>
            </div>
        </Container>
    );
}

