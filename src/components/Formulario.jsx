import React, { useEffect, useState } from 'react';
import styled from "@emotion/styled";
import axios from 'axios';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Error from './Error';


const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326ac0;
        cursor: pointer;
    }
`

const Formulario = ({ guardarMoneda, guardarCriptomoneda }) => {
    //States
    const [listacripto, guardarCriptomonedas] = useState([]);
    const [error, guardarError] = useState(false);
    //Monedas
    const monedas = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        { codigo: 'MXN', nombre: 'Peso Mexicano' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' },
        { codigo: 'PEN', nombre: 'Sol' }
    ]
    //useMoneda
    const [moneda, SelectMonedas] = useMoneda('Elige tu moneda', '', monedas);
    //useCriptomoneda
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto);
    //Consulta
    const consultarAPI = async () => {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
        const resultado = await axios.get(url);

        guardarCriptomonedas(resultado.data.Data);
    }
    //useEffect
    useEffect(() => {
        consultarAPI();
    }, [])
    //Submit
    const cotizarMoneda = e => {
        e.preventDefault();

        //validar si ambos campos estan llenos
        if (moneda === '' || criptomoneda === '') {
            guardarError(true);
            return;
        }
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    }

    return (
        <form onSubmit={cotizarMoneda}>
            {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
            <SelectMonedas />
            <SelectCripto />
            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
    );
}

export default Formulario;