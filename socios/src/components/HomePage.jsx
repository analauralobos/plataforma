import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Bar } from "react-chartjs-2"; 
import { Chart, registerables } from 'chart.js'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { ContainerSec } from "./TablesStyles";

// Registra todos los componentes de Chart.js necesarios
Chart.register(...registerables);

const data = {
  labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
  datasets: [
    {
      label: "Socios Activos",
      data: [12, 19, 3, 5, 2],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
    {
      label: "Abonados",
      data: [7, 11, 5, 8, 3],
      backgroundColor: "rgba(153, 102, 255, 0.6)",
      borderColor: "rgba(153, 102, 255, 1)",
      borderWidth: 1,
    },
  ],
};

export default function HomePage() {
  return (
    <ContainerSec>
    <Container fluid>
      <h2 className="my-4">Bienvenido a la Administración del Club</h2>
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>Gráfico de Socios y Abonados</Card.Header>
            <Card.Body>
              <Bar data={data} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header>Información General</Card.Header>
            <Card.Body>
              <p><strong>Total de Socios:</strong> 120</p>
              <p><strong>Total de Abonados:</strong> 45</p>
              <p><strong>Cuotas Pendientes:</strong> 15</p>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>Acciones Rápidas</Card.Header>
            <Card.Body>
              <button className="btn btn-primary w-100 mb-2">Agregar Socio</button>
              <button className="btn btn-secondary w-100">Ver Cuotas</button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </ContainerSec>
  );
}
