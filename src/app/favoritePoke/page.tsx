'use client'

import React, { useEffect, useState } from 'react';
import styles from './info.module.css';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import { BiPencil } from "react-icons/bi";
import Link from 'next/link';

interface Pokemon {
  id: number;
  name: string;
  types: string[];
  imageUrl: string;
  color: string;
}


const UserDetails: React.FC = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem('idUser');
    if (!userId) {
      console.error('idUser não encontrado no localStorage');
      return;
    }

    const fetchFavoritePokemons = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/pokemon/${userId}/favorites`);
        setFavoritePokemons(response.data);
      } catch (error) {
        console.error('Erro ao obter os pokémons favoritos:', error);
      }
    };

    fetchFavoritePokemons();
  }, []);

  const handleEditPokemonName = (pokemonId: number) => {
    const newName = prompt('Digite o novo nome do Pokémon:');
    if (newName) {
      // Lógica para editar o nome do Pokémon aqui
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="/pokeHome" className={styles.backButton}>
          <FaArrowLeft />
          Voltar
        </Link>
        <h1>Meus pokemons favoritos</h1>
        <div className={styles.containerPokedex}>
          {favoritePokemons.length === 0 ? (
            <p className={styles.nonePoke}>Você ainda não capturou nenhum pokemon.</p>
          ) : (
            favoritePokemons.map((pokemon) => (
              <div key={pokemon.id} className={styles.cardPoke} style={{ backgroundColor: pokemon.color }}>
              <div className={styles.imgContainer}>
                <img className={styles.imgPoke} src={pokemon.imageUrl} alt='pokemon' />
              </div> 
              <div className={styles.infoPoke}>
                <span className={styles.number}>#{pokemon.id}</span>
                <h3 className={styles.name}>
                  <p>{pokemon.name}</p>
                  <BiPencil className={styles.editIcon} onClick={() => handleEditPokemonName(pokemon.id)} />
                </h3>
                <small className={styles.type}>Type: <span>{pokemon.types}</span></small>
              </div>      
            </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
