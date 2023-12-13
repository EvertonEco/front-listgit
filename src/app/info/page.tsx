'use client'

import React, { useEffect, useState } from 'react';
import { IoMdExit } from 'react-icons/io';
import styles from './info.module.css';
import { BiSearchAlt } from 'react-icons/bi';
import Link from 'next/link';

interface ResultSearch {
  name: string;
  description: string;
  language: string | null;
  updated_at: string;
}

interface LastResult {
    searchTerm: string;
    timestamp: string;
    userName?: string;
    found: boolean;
    reposCount?: number;
}

const UserDetails: React.FC = () => {
  const [resultSearch, setResultSearch] = useState<ResultSearch[] | null>(null);
  const [lastSearch, setLastSearch] = useState<LastResult | null>(null);

  useEffect(() => {
    const resultSearchString = localStorage.getItem('result_search');
    const searchHistoryString = localStorage.getItem('searchHistory');

    if (resultSearchString) {
      const resultSearchData: ResultSearch[] = JSON.parse(resultSearchString);
      setResultSearch(resultSearchData);
    }

    if (searchHistoryString) {
      const searchHistoryData = JSON.parse(searchHistoryString);
  
      const ultimoObjeto = searchHistoryData[searchHistoryData.length - 1];
  
      setLastSearch(ultimoObjeto);
    }
  }, []);

  function formatarData(timestamp: string): string {
    const data = new Date(timestamp);
    const dia = data.getDate();
    const mes = data.getMonth() + 1; // Os meses começam do zero
    const ano = data.getFullYear();
  
    return `${dia}/${mes}/${ano}`;
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.infoUserContainer}>
          <div className={styles.infoUser}>
            <p><b>Repositórios do usuário</b> {lastSearch?.searchTerm}</p>
            <Link href={'/details'}>
              <IoMdExit size={25}/>
            </Link>
          </div>
          <p>Total encontrados: {resultSearch?.length}</p>
        </div>
        <div className={styles.iconContainer}>
          <Link href={'/search'}>
            <BiSearchAlt className={styles.searchIcon} />
          </Link>
        </div>
      </div>
      <div className={styles.list}>
        {resultSearch &&
          resultSearch.slice(0, 20).map((item: ResultSearch, index: number) => (
            <div key={index} className={styles.rectangle}>
              <p className={styles.name}>{item.name}</p>
              <p className={styles.description}>{item.description}</p>
              <div className={styles.languageUpdatedAt}>
                <p>{item.language}</p>
                <p>{formatarData(item.updated_at)}</p>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default UserDetails;
