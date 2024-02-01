import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/list.css';

const PokemonList = () => {
    const [pokemonData, setPokemonData] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    const capitalizeFirstLetter = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    const getColorById = (id) => {
        const colorPalette = [
            '#70e0bb', // Color ID 1
            '#70e0bb', // Color ID 2
            '#70e0bb', // Color ID 3
            '#fe9441', // Color ID 4
            '#fe9441', // Color ID 5
            '#fe9441', // Color ID 6
            '#5a9ca4', // Color ID 7
            '#5a9ca4', // Color ID 8
            '#5a9ca4', // Color ID 9
            '#63a053', // Color ID 10
        ];

        // Devolver un color de la paleta basado en el ID del Pokémon
        return colorPalette[(id - 1) % colorPalette.length];
    };

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10');
                const data = await Promise.all(response.data.results.map(async (pokemon, index) => {
                    const pokemonDetail = await axios.get(pokemon.url);
                    return {
                        id: index + 1,
                        name: pokemon.name,
                        weight: pokemonDetail.data.weight,
                        height: pokemonDetail.data.height,
                        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
                    };
                }));
                setPokemonData(data);
            } catch (error) {
                console.log('Error fetching Pokemon data:', error);
            }
        };
    
        fetchPokemonData();
    }, []);

    const sortPokemonList = (criteria, order) => {
        
        // Si no se ha seleccionado un criterio u orden, no hagas nada
        if (!criteria || !order) {
            return;
        }
    
        const sortedList = [...pokemonData];
    
        sortedList.sort((a, b) => {
            let valueA, valueB;
            switch (criteria) {
                case 'number':
                    valueA = a.id;
                    valueB = b.id;
                    break;
                case 'name':
                    valueA = a.name;
                    valueB = b.name;
                    break;
                case 'weight':
                    valueA = a.weight;
                    valueB = b.weight;
                    break;
                case 'height':
                    valueA = a.height;
                    valueB = b.height;
                    break;
                default:
                    break;
            }
    
            if (order === 'asc') {
                if (criteria === 'name') {
                    return valueA.localeCompare(valueB);
                } else {
                    return valueA - valueB;
                }
            } else {
                if (criteria === 'name') {
                    return valueB.localeCompare(valueA);
                } else {
                    return valueB - valueA;
                }
            }
        });
    
        setPokemonData(sortedList);
    };

    const handleSortCriteriaChange = (e) => {
        setSortCriteria(e.target.value);
        sortPokemonList(e.target.value, sortOrder);
    };

    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value);
        sortPokemonList(sortCriteria, e.target.value);
    };

    return (
        <div className='pokemon-list-container'>
            <div className='sort-controls'>
                <label htmlFor="sort-criteria">Ordenar por:</label>
                <select id="sort-criteria" value={sortCriteria} onChange={handleSortCriteriaChange}>
                    <option value="">Selecciona una opción</option>
                    <option value="name">Nombre</option>
                    <option value="number">Numero</option>
                    <option value="weight">Peso</option>
                    <option value="height">Altura</option>
                </select>
                <select id="sort-order" value={sortOrder} onChange={handleSortOrderChange}>
                    <option value="">Selecciona un orden</option>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
            </div>
            <div className='pokemon-list'>
                {pokemonData.map((pokemon) => (
                    <Link to = {`/pokemon/${pokemon.id}`} key={pokemon.id}> 
                        <div className='pokemon-card' key={pokemon.id} style={{ border: `5px solid ${getColorById(pokemon.id)}`,backgroundColor: `${getColorById(pokemon.id)}50` }}>
                            <div className='image-container'>
                                <img className='pokemon-image' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={pokemon.name} />
                            </div>
                            <div className='pokemon-info'>
                                <h2 className='pokemon-name'>{capitalizeFirstLetter(pokemon.name)}</h2>
                                <p className='pokemon-details'>Numero: {pokemon.id}</p>
                                <p className='pokemon-details'>Peso: {pokemon.weight}</p>
                                <p className='pokemon-details'>Altura: {pokemon.height}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>        
    );
};

export default PokemonList;
