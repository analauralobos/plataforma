import React from "react";
import styled from "styled-components";
import { CiSearch } from "react-icons/ci";

export default function Filter(){

    return (
        <Container>

            <div className="contenedor">
                <div className="filtro">
                    <h4>Nombre / Apellido</h4>
                    <input className="busqueda"></input>
                    <CiSearch size={'1.5rem'} ></CiSearch>
                </div>
                <div className="filtro">
                    <h4>Tipo de Cuota</h4>
                    <select name="cuotas" id="cuotas">
                        <option>Socios</option>
                        <option>Festival</option>
                    </select>
                </div>
                <div className="filtro">
                    <h4>Tipo de Persona</h4>
                    <label>
                        <input type="checkbox" id="cbox1" value="1" /> Socios
                    </label>
                    <label>
                        <input type="checkbox" id="cbox2" value="0" /> Abonados
                    </label>
                </div>
            </div>
        </Container>
      );
}
const Container = styled.div`
      
width:100%;
height:90px;
background-color:rgba(0, 0, 0, 0.3) ;
top: 160px;
position: fixed;
.contenedor{
display: flex;
padding: 2px 2px 4px 2px;
}
.filtro{
width:500px;
}
h4{
font-size: 16px;}
.busqueda{
width: 200px;
height: 25px;
padding: 0.25em 0.5em;
border-radius: 4px;
}
select{
width:200px;
height: 25px;}
label{
width:150px;
text-aling: left;}
CiSearch{
box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
text-align:center;
vertical-align:middle;  
}
`;