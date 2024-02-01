import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/details.scss';

const PokemonDetails = () => {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);

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
        const fetchPokemonDetails = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                setPokemon(response.data);
            } catch (error) {
                console.log('The pokemon escaped...', error);
            }
        };

        fetchPokemonDetails();
    }, [id]);

    return (
        <div className='pokemon-details'>
            {pokemon ? (
                <div className='pokemon-card' key={pokemon.id} style={{ border: `5px solid ${getColorById(pokemon.id)}`,backgroundColor: `${getColorById(pokemon.id)}50` }}>
                <img className='pokemon-image' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={pokemon.name} />
                <div className='pokemon-info'>
                    <h2 className='pokemon-name'>{capitalizeFirstLetter(pokemon.name)}</h2>
                    <p className='pokemon-details'>Numero: {pokemon.id}</p>
                    <p className='pokemon-details'>Peso: {pokemon.weight}</p>
                    <p className='pokemon-details'>Altura: {pokemon.height}</p>
                    
                </div>
            </div>
            ) : (
                <p className='loading-message'>Loading Pokemon Details...</p>
            )}
        </div>
    );
};

export default PokemonDetails;