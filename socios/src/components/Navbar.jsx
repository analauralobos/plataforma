import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Navbar() {
    const links = [
        { name: "Inicio", link: "/home" },
        { name: "Socios", link: "/table" },
        { name: "Cuotas", link: "/cuota" },
        { name: "Pagos", link: "/pay" },
    ];

    return (
        <Container>
            <nav className="flex">
                <ul className="links flex">
                    {links.map(({ name, link }) => (
                        <li key={name}>
                            <Link to={link}>{name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 60px; /* Mantiene la altura del navbar */
    //background-color: #005b25; /* Verde más oscuro para contraste */
    background-color: #006637;
    position: fixed;
    top: 100px; /* Debajo del header */
    z-index: 999; 
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Sombra sutil */

    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        padding-top:5px;
        display: flex;
        justify-content: flex-start; /* Alineación a la derecha */
        align-items: center; /* Centrado vertical */
        height: 100%;
    }

    li {
        position: relative;
        padding: 10px 20px;
        color: white;
        font-weight: bold;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: rgba(255, 255, 255, 0.2); /* Efecto hover */
        }

        &::after {
            content: "";
            position: absolute;
            left: 50%;
            bottom: -5px;
            width: 0;
            height: 3px;
            background: white;
            transition: width 0.3s ease, left 0.3s ease;
        }

        &:hover::after {
            width: 100%;
            left: 0;
        }
    }

    .links {
        gap: 2rem;
        li {
            a {
                color: white;
                text-decoration: none;
                display: block;
                height: 100%;
            }
        }
    }
`;
