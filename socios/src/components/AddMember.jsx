import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, CancelButton, ContainerSec, FormContainer } from "./TablesStyles";


const URLAgregarSocio = 'http://localhost:8080/personas'; // Cambia según tu API

export default function AgregarSocio() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        apellido_nombre: '',
        documento: '',
        direccion: '',
        telefono: '',
        email: '',
        fecha_inicio: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCancel = () => {
        navigate("/table");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(URLAgregarSocio, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert('Socio agregado con éxito');
                navigate("/");  // Redirige de vuelta a la lista de socios
            } else {
                alert('Error al agregar el socio');
            }
        } catch (error) {
            console.error("Error al agregar el socio:", error);
        }
    };

    return (
        <ContainerSec>
            <FormContainer>
                <form onSubmit={handleSubmit}>
                    <h1>Agregar Socio</h1>
                    <label>
                        Apellido y Nombre:
                        <input
                            type="text"
                            name="apellido_nombre"
                            value={formData.apellido_nombre}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Documento:
                        <input
                            type="text"
                            name="documento"
                            value={formData.documento}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Dirección:
                        <input
                            type="text"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Teléfono:
                        <input
                            type="text"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Fecha de Inicio:
                        <input
                            type="date"
                            name="fecha_inicio"
                            value={formData.fecha_inicio}
                            onChange={handleInputChange}
                        />
                    </label>                    
                </form>
                <Button type="submit">Guardar</Button>
                <CancelButton type="button" onClick={handleCancel}>Cancelar</CancelButton>
            </FormContainer>
        </ContainerSec>
    );
}
