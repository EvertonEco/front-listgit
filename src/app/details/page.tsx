'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './details.module.css';
import { MdOutlineArrowBack } from "react-icons/md";
import { GrLogout } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import Link from 'next/link';
import { MdOutlineEmail } from "react-icons/md";
import { FaTwitter, FaRegBuilding, FaRegNewspaper  } from "react-icons/fa";

interface UserDetails {
  name: string;
  login: string;
  avatar_url?: string;
  followers: number;
  following: number;
  public_repos: number;
  bio?: string;
  email: string;
  twitter_username: string;
  company?: string;
  blog?: string;
}

interface UserData {
  id: string;
  email: string;
  password: string;
  userName: string;
}

const Details: React.FC = () => {
  // const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [user, setNameUser] = useState<UserDetails | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const emailUser = localStorage.getItem('emailUser2');
      const accessToken = localStorage.getItem('access_token');
      const search = localStorage.getItem('search');

      if (emailUser && accessToken) {
        try {
          const githubResponse = await axios.get(
            `http://localhost:3001/github/users/${search}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setNameUser(githubResponse.data);
        } catch (error) {
          console.error('Erro na requisição:', error);
        }
      }
    };

    fetchData();
  }, [user]);

  console.log(user, 'user')

  const handleLogout = () => {
    localStorage.clear();
  };

  const handleGoBack = () => {
    window.history.back();
  };

  // const loadUser = async (userName: string) => {
  //   try {
  //     const accessToken = localStorage.getItem('access_token');

  //     const response = await axios.get(`http://localhost:3001/github/users/${userName}/repos`, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
    
  //   } catch (err) {
  //     console.error('Erro na requisição:', err);
  //   }
  // }

  console.log(user, 'user')

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={handleGoBack} aria-label='teste' data-tip="Voltar" data-for="backButtonTooltip">
        <MdOutlineArrowBack size={30} />
      </button>

      <Link onClick={() => handleLogout()} href={'/'}>
        <button className={styles.logoutButton} data-for="logoutButtonTooltip">
          <GrLogout size={25} />
        </button>
      </Link>
      
      <div className={styles.container_wrapper}>
        <div className={styles.detailsRectangle}>
          <div className={styles.avatarContainer}>
            {user && (
              <img
                src={user.avatar_url}
                alt={`Avatar de ${user.name}`}
              />
            )}
          </div>
          <div className={styles.userInfo}>
            <h2>{user?.name}</h2>
            <p>@{user?.login}</p>
          </div>

          <div className={styles.userStats}>
            <p><b>Seguidores:</b> {user?.followers}</p>
            <p><b>Seguindo:</b> {user?.following}</p>
            <p>
              <b>Repositórios:</b> 
              {user?.public_repos} 
              <Link href={'/info'}>
                <GrLogout size={20} />
              </Link>
            </p>
          </div>
          <Link href={'/'}>
            <FiEdit size={40} />
          </Link>
        </div>
        <div className={styles.bio}>
          <p>{user?.bio || 'Usuário sem biografia'}</p>
        </div>
        <div className={styles.socials}>
          <p className={styles.detailsSocials}>
            <MdOutlineEmail size={25}/> {user?.email || 'Usuário sem Email'}
          </p>
          <p className={styles.detailsSocials}>
            <FaTwitter size={25} />{user?.twitter_username || 'Usuário sem Twitter'}
          </p>
          <p className={styles.detailsSocials}>
            <FaRegBuilding size={25}/>{user?.company || 'Usuário sem C&A'}
          </p>
          <p className={styles.detailsSocials}>
            <FaRegNewspaper size={25}/>{user?.blog || 'Usuário sem blog'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
