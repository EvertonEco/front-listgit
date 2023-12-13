'use client'

import React, { useEffect, useState } from 'react';
import styles from './search.module.css';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {

  const [search, setSearch] = useState("")
  const [searchHistory, setSearchHistory] = useState<Array<SearchEntry>>([]);
  const [ resultSearch, setResultsSearch ] = useState({})

  interface SearchEntry {
    searchTerm: string;
    timestamp: string;
    userName?: string;
    found: boolean;
    reposCount?: number;
  }

  useEffect(() => {
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }

    localStorage.removeItem('result_search');
  }, []);

  const loadUser = async (userName: string) => {
    try {
      const accessToken = localStorage.getItem('access_token');

      const response = await axios.get(`http://localhost:3001/github/users/${userName}/repos`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = response.data;
      const entry: SearchEntry = {
        searchTerm: userName,
        timestamp: new Date().toISOString(),
        found: true,
        reposCount: data.length || null,
      };  
    
      const updatedHistory = [...searchHistory, entry];
      setSearchHistory(updatedHistory);
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
      setResultsSearch(data)
      localStorage.setItem('result_search', JSON.stringify(data));
      localStorage.setItem('search', search)
      window.location.reload();
      console.log(resultSearch, 'resultSearch')
    } catch (err) {
      console.error('Erro na requisição:', err);
    }
  }
  
  return (
    <div className={styles.container}>
      <h1>Busque por um usuário</h1>
      <div className={styles.wrapper}>
        <input type="text" placeholder='Nome do usuário para buscar' onChange={(e) => setSearch(e.target.value)} />
        <Link onClick={() => loadUser(search)} href={'/info'}>
          <button className={styles.searchButton} onClick={() => loadUser(search)}>
            BUSCAR
          </button>
        </Link>
        <Link href={'/history'}>
          <button className={styles.historyButton}>
            HISTÓRICO
          </button>
        </Link>
      </div>
    </div>
  );
};