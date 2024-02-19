"use client"
// components/SidePanel.js
import React from 'react';
import { ActionPoint } from './types';

interface SidePanelProps {
  actionPoints: ActionPoint[];
}


const SidePanel: React.FC<SidePanelProps> = ({ actionPoints }) => {
  // Implement action points, lineTo, splineTo, SplineHeading, LineHeading, and tangents here.

  return (
    <div style={{ width: '15%', height: '100%', backgroundColor: 'lightgray', padding: '20px' }}>
      {/* UI elements for action points and other settings can be added here. */}
    </div>
  );
};

export default SidePanel;