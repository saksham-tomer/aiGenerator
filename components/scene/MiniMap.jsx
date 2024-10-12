import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';

const MinimapContent = ({ setMapData }) => {
  const { scene } = useThree();

  useFrame(() => {
    const mapData = [];
    scene.traverse((object) => {
      if (object.isMesh) {
        mapData.push({
          type: object.userData.type || 'default',
          position: object.position.clone(),
        });
      }
    });
    setMapData(mapData);
  });

  return null;
};

const Minimap = ({ player }) => {
  const canvasRef = useRef();
  const [mapData, setMapData] = React.useState([]);

  const mapSize = 150;
  const mapScale = 10; // Adjust this to change the zoom level of the minimap

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = mapSize;
    canvas.height = mapSize;

    // Draw border
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, mapSize, mapSize);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, mapSize, mapSize);

    // Redraw border
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, mapSize, mapSize);

    // Draw map elements
    ctx.fillStyle = '#2c3e50'; // Background color
    ctx.fillRect(2, 2, mapSize - 4, mapSize - 4);

    // Draw game objects
    mapData.forEach((object) => {
      const x = object.position.x / mapScale + mapSize / 2;
      const y = object.position.z / mapScale + mapSize / 2;

      switch (object.type) {
        case 'nft':
          ctx.fillStyle = '#00FF00';
          ctx.fillRect(x - 2, y - 2, 4, 4);
          break;
        case 'enemy':
          ctx.fillStyle = '#FF0000';
          ctx.beginPath();
          ctx.moveTo(x, y - 3);
          ctx.lineTo(x + 3, y + 3);
          ctx.lineTo(x - 3, y + 3);
          ctx.closePath();
          ctx.fill();
          break;
        default:
          ctx.fillStyle = '#4a0e0e';
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
      }
    });

    // Draw player
    if (player) {
      const playerX = player.position.x / mapScale + mapSize / 2;
      const playerY = player.position.z / mapScale + mapSize / 2;
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(playerX, playerY, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [mapData, player]);

  return (
    <>
      <MinimapContent setMapData={setMapData} />
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          width: `${mapSize}px`,
          height: `${mapSize}px`,
          background: 'rgba(0,0,0,0.5)',
          border: '2px solid #FFD700',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      </div>
    </>
  );
};

export default Minimap;
