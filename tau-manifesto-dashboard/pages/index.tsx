"use client"

// pages/index.js
import type { NextPage } from 'next';
import React, { useState } from 'react';
import Head from 'next/head';
import styles from './styles/Home.module.css';
import Graph from './components/Graph';
import SidePanel from './components/SidePanel';
import { ActionPoint } from './components/types';
import { ClientComponentWithChildren } from './components/client-component';
import ThreeDGraph from "./components/ThreeDGraph";

const nodes = [
  { id: '1', x: 0, y: 0, z: 0 },
  { id: '2', x: 100, y: 100, z: 100 },
  { id: '3', x: 200, y: 200, z: 200 },
  { id: '4', x: 300, y: 300, z: 300 },
];

const Home: NextPage = () => {
  return (
    <div>
      <ThreeDGraph width={400} height={400} nodes={nodes} onNodeClick={(node: any) => console.log(node)} />
    </div>
  );
};

export default Home;