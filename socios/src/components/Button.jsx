import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Button (){
    const navigate = useNavigate();
    return (
        <Container>
         <button>Imprimir</button>
         <button>Exportar</button>
         <button onClick={()=>navigate("/new" )}>Nuevo</button>
        </Container>
      );
}
const Container = styled.div`
      
width:100%;
height:30px;
background-color:rgba(0, 0, 0, 0.3) ;
top: 130px;
position: fixed;
button{
    background-color: rgba(0, 215, 0, 1);
    padding: 0,5rem 1rem 1rem;
    higth: 20px;
    border: none;
    border-radius: 0.5rem;
    float: right;
    vertical-align:middle;  
    margin:2px 2px 2px 2px;
    font-size: 12px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
}
button:hover {background-color: #3e8e41}
`;