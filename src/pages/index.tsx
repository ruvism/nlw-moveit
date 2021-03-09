import Head from 'next/head';
import React from 'react';
import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar' ;
import { Profile } from '../components/Profile' ;
import { CountdownProvider } from '../contexts/CountdownContext';
import { GetServerSideProps } from 'next';

import styles from '../styles/pages/Home.module.css' ;
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  
}

export default function Home(props) {
  return(

    <ChallengesProvider 
      level={props.level} 
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >  
      <div className={ styles.container }>
        <Head>
          <title>Início| Move.it</title>
        </Head>
        <ExperienceBar />
        <CountdownProvider>
          <section>
            <div >
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              < ChallengeBox />
            </div>
          </section>
        </CountdownProvider>

      </div>
    </ChallengesProvider>
  )
};
export const getServerSideProps: GetServerSideProps = async (cxt ) => {
  
  const { level, currentExperience, challengesCompleted} = cxt.req.cookies;

  return {
    props: {
      level: Number(level), 
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    }
  }
}