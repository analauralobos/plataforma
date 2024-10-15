import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FormContainer, ContainerSec, Button, CancelButton } from "./TablesStyles";

const URLEditarSocio = 'http://localhost:8080/personas'; 

export default function EditarSocio() {
    const { nro_socio } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nro_socio: "",
        apellido_nombre: "",
        documento: "",
        direccion: "",
        telefono: "",
        email: "",
        fecha_inicio: "",
        es_socio: "0", // Valor predeterminado "abonado"
    });

    useEffect(() => {
        const fetchSocio = async () => {
            try {
                const response = await fetch(`${URLEditarSocio}/${nro_socio}`);
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                console.error("Error al obtener los datos del socio:", error);
            }
        };
        fetchSocio();
    }, [nro_socio]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${URLEditarSocio}/${nro_socio}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert('Socio actualizado con éxito');
                navigate("/table");
            } else {
                alert('Error al actualizar el socio');
            }
        } catch (error) {
            console.error("Error al actualizar el socio:", error);
        }
    };

    const handleCancel = () => {
        navigate("/table");
    };

    return (
        <ContainerSec>
            <FormContainer>
                <form onSubmit={handleSubmit}>
                    <h1>Editar Socio</h1>
                    <label>
                        Número de Socio:
                        <input
                            type="text"
                            name="nro_socio"
                            value={formData.nro_socio}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Apellido y Nombre:
                        <input
                            type="text"
                            name="apellido_nombre"
                            value={formData.apellido_nombre}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Documento:
                        <input
                            type="text"
                            name="documento"
                            value={formData.documento}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Dirección:
                        <input
                            type="text"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Teléfono:
                        <input
                            type="tel"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Fecha de Inicio:
                        <input
                            type="date"
                            name="fecha_inicio"
                            value={formData.fecha_inicio}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        ¿Es Socio?
                        <select
                            name="es_socio"
                            value={formData.es_socio}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="0">Abonado</option>
                            <option value="1">Socio</option>
                        </select>
                    </label>

                </form>
                <Button type="submit">Guardar</Button>
                <CancelButton type="button" onClick={handleCancel}>Cancelar</CancelButton>
            </FormContainer>
        </ContainerSec>
    );
}
