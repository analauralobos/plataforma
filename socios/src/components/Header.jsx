import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { BsPersonCircle } from "react-icons/bs";

export default function Header(props) {
    const navigate = useNavigate();
    
    return (
        <Container className="flex a-center j-between">
            <div className="header">
                <div className="header_logo" onClick={() => navigate("/home")}>
                    <img src={logo} alt="Logo" />
                </div>
                <div className="header_text">
                    <h1>C. S. y A. Ferro Carril Oeste</h1>
                </div>
                <div className="header_text_CS">
                    <BsPersonCircle size={'4rem'} color="white" />
                    <button onClick={() => navigate("/")}>Cerrar Sesión</button>
                </div>
            </div>
        </Container>
    );
}

const Container = styled.div`
    .header {
        position: fixed;
        width: 100%;
        height: 100px; /* Aumenté la altura del header */
        background-color: #007A33; /* Verde Ferro */
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        z-index: 1000;

       /* &:hover {
            background-color: #005b25; /* Efecto hover */
        }*/
    }

    img {
        height: 80px; /* Ajusté la altura del logo */
        cursor: pointer;
    }

    h1 {
        color: white;
        font-size: 2rem; /* Aumenté el tamaño del texto */
        margin: 0 10px;
    }

    .header_text_CS {
        display: flex;
        align-items: center;
        gap: 10px; /* Espacio entre icono y botón */
        
        button {
            padding: 0.5rem 1rem;
            border: none;
            cursor: pointer;
            border-radius: 0.2rem;
            font-size: 1rem;
            background-color: transparent; /* Sin fondo */
            color: white;
            text-decoration: underline;
            transition: color 0.3s ease;

            &:hover {
                color: rgba(255, 255, 255, 0.8); /* Efecto hover para el botón */
            }
        }
    }
`;
