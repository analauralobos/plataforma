import React from "react";
import Header from "../components/Header";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Cuotas from "../components/Quotas";

export default function Cuota() {
    return (
        <Container>
            <Header />
            <Navbar />
            <Content>
                <Cuotas />
            </Content>
        </Container>
    );
}

const Container = styled.div`
    position: relative;    
`;

const Content = styled.div`
    position: absolute;
    top: 100px; /* Ajusta este valor según la altura total del header y navbar */
    left: 0;
    height: calc(100vh - 100px); /* Resta la altura del header y navbar */
    width: 100vw;    
    overflow-y: auto; /* Permitir scroll si el contenido excede la altura */
    padding: 5px; /* Añade espaciado alrededor del contenido */
    box-sizing: border-box; /* Asegura que el padding no afecte las dimensiones del contenedor */
`;
