'use client'

import React, { useEffect, useState } from 'react';
import styles from './history.module.css';
import { BiSearchAlt } from 'react-icons/bi';
import Link from 'next/link';
import axios from 'axios';

interface HistoryProps {
  searchTerm: string;
  timestamp: string;
  userName?: string;
  found: boolean;
  reposCount?: number;
}

interface UserData {
  id: string;
  email: string;
  password: string;
  userName: string;
}


const UserDetails: React.FC = () => {
  const [history, setHistory] = useState<HistoryProps[] | null>(null);
  const [nameUser, setNameUser] = useState<UserData | null>(null)

  useEffect(() => {
    const searchHistoryString = localStorage.getItem('searchHistory');
    const emailUser = localStorage.getItem('emailUser2');
    const accessToken = localStorage.getItem('access_token');

    if (searchHistoryString) {
      const searchHistoryData: HistoryProps[] = JSON.parse(searchHistoryString);

      setHistory(searchHistoryData);
    }

    if (emailUser && accessToken) {
      axios.post('http://localhost:3001/user/find', { email: emailUser }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then(response => {
          setNameUser(response.data);
        })
        .catch(error => {
          console.error('Erro na requisição:', error);
        });
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.infoUser}>
          Total pesquisados: {history?.length ?? 0}
        </div>
        <div className={styles.iconContainer}>
          <Link href={'/search'}>
            <BiSearchAlt className={styles.searchIcon} />
          </Link>
        </div>
      </div>
      <div className={styles.mediumRectangles}>
      {history &&
        history.map((item, index) => {
          const timestampDate = new Date(item.timestamp);
          const formattedTime = `${timestampDate.getHours()}:${String(timestampDate.getMinutes()).padStart(2, '0')}`;
        
          return (
            <div key={index} className={styles.rectangle}>
              <Link href={`/details?searchTerm=${nameUser?.userName}`}>
                <h2>{item?.searchTerm}</h2>
              </Link>
              <p>Pesquisado às {formattedTime} com <b>{item.found ? 'sucesso' : 'falha'}</b></p>
              <Link href={`/info?searchTerm=${item.searchTerm}`}>
                <p>Total de repositórios encontrados: {item.reposCount}</p>
              </Link>
              <button
                className={styles.delete}
                onClick={() => {
                  const updatedHistory = [...history];
                  updatedHistory.splice(index, 1);
                  localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
                  setHistory(updatedHistory);
                  window.location.reload();
                }}
              >
                Excluir
              </button>
            </div>
          );
        })
      }
      </div>
    </div>
  );
};

export default UserDetails;
