"use client";

import { useEffect, useState } from "react";
interface CitySelectorProps {
  cityselector: Cityselector;
}

interface State {
  sigla: string;
  nome: string;
}

interface City {
  id: number;
  nome: string;
}


export default function CitySelector({cityselector}: CitySelectorProps) {
  const [states, setStates] = useState<State[]>([]);
  const [selectedState, setSelectedState] = useState<string>('');
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    async function fetchStates() {
      try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        const statesData = await response.json();
        setStates(statesData);
      } catch (error) {
        console.error('Erro ao buscar estados:', error);
      }
    }
    fetchStates();
  }, []);

  useEffect(() => {
    async function fetchCities() {
      if (selectedState) {
        try {
          const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`);
          const citiesData = await response.json();
          setCities(citiesData);
        } catch (error) {
          console.error('Erro ao buscar municípios:', error);
        }
      } else {
        setCities([]);
      }
    }

    fetchCities();
  }, [selectedState]);
  
  return (
    <div>
      <label htmlFor="stateSelect">{cityselector.estate}:</label>
      <select id="stateSelect" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
        <option value="" disabled>Selecione um estado</option>
        {states.map(state => (
          <option key={state.sigla} value={state.sigla}>{state.sigla}</option>
        ))}
      </select>

      <label htmlFor="citySelect">{cityselector.city}:</label>
      <select id="citySelect">
        {selectedState ? (
          cities.length > 0 ? (
            cities.map(city => (
              <option key={city.id} value={city.nome}>{city.nome}</option>
            ))
          ) : (
            <option value="" disabled>Nenhum município encontrado</option>
          )
        ) : (
          <option value="" disabled>Selecione um estado primeiro</option>
        )}
      </select>
    </div>
  );
}
