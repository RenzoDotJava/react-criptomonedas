import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import cryptomonedas from "./cryptomonedas.png";
import Formulario from "./components/Formulario";
import Cotizacion from "./components/Cotizacion";
import Spinner from "./components/Spinner";

const Contenedor = styled.div`
    max-width: 900px;
    margin: 0 auto;
    @media (min-width: 992px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 2rem;
    }
`;

const Imagen = styled.img`
    max-width: 100%;
    margin-top: 5rem;
`;

const Heading = styled.h1`
    font-family: "Bebas Neue", cursive;
    color: #fff;
    text-align: left;
    font-weight: 700;
    font-size: 50px;
    margin-bottom: 50px;
    margin-top: 80px;

    &::after {
        content: "";
        width: 100px;
        height: 6px;
        background-color: #66a2fe;
        display: block;
    }
`;

function App() {
    const [moneda, guardarMoneda] = useState("");
    const [criptomoneda, guardarCriptomoneda] = useState("");
    const [resultado, guardarResultado] = useState({});
    const [cargando, guardarCargando] = useState(false);

    const cotizarCriptomoneda = async () => {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

        const res = await axios.get(url);

        //spinner
        guardarCargando(true);
        //ocultar el spinner y mostrar resultado
        setTimeout(() => {
            guardarCargando(false);
            guardarResultado(res.data.DISPLAY[criptomoneda][moneda]);
        }, 2000);
    };

    useEffect(() => {
        if (moneda === "") return;
        //Consulta
        cotizarCriptomoneda();
        //eslint-disable-next-line
    }, [moneda, criptomoneda]);

    //Mostrar spiiner o resultado
    const componente = cargando ? (
        <Spinner />
    ) : (
        <Cotizacion resultado={resultado} />
    );

    return (
        <Contenedor>
            <div>
                <Imagen src={cryptomonedas} alt="imagen crypto" />
            </div>
            <div>
                <Heading>Cotiza Criptomonedas al instante</Heading>
                <Formulario
                    guardarMoneda={guardarMoneda}
                    guardarCriptomoneda={guardarCriptomoneda}
                />
                {componente}
            </div>
        </Contenedor>
    );
}

export default App;
