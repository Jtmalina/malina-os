import React, { useRef, useState, useEffect } from 'react';
import styles from './Paint.module.css';

const COLORS = [
  '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080', '#808040', '#004040', '#0080FF', '#004080', '#4000FF', '#804000',
  '#FFFFFF', '#C0C0C0', '#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF', '#FFFF80', '#00FF80', '#80FFFF', '#8080FF', '#FF0080', '#FF8040'
];

const Paint: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(2);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size to match parent
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        
        // Fill with white on initial load
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const startDrawing = (e: React.MouseEvent) => {
    setIsDrawing(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      lastPos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const rect = canvas?.getBoundingClientRect();

    if (ctx && rect) {
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(currentX, currentY);
      ctx.stroke();

      lastPos.current = { x: currentX, y: currentY };
    }
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && canvas) {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className={styles.paintContainer}>
      <div className={styles.menuBar}>
        <span className={styles.menuItem}>File</span>
        <span className={styles.menuItem}>Edit</span>
        <span className={styles.menuItem}>View</span>
        <span className={styles.menuItem}>Image</span>
        <span className={styles.menuItem}>Options</span>
        <span className={styles.menuItem}>Help</span>
      </div>

      <div className={styles.mainLayout}>
        <div className={styles.toolbar}>
          <div className={styles.tools}>
            <div className={`${styles.toolIcon} inset`}>🖌️</div>
            <div className={styles.toolIcon} onClick={clearCanvas}>🗑️</div>
            <div className={styles.toolSeparator}></div>
            <div className={styles.sizeSlider}>
              <input 
                type="range" 
                min="1" 
                max="20" 
                value={brushSize} 
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
                title="Brush Size"
              />
            </div>
          </div>
        </div>
        
        <div className={styles.canvasArea}>
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className={styles.canvas}
          />
        </div>
      </div>

      <div className={styles.colorPalette}>
        <div className={styles.currentColorContainer}>
          <div className={`${styles.colorBox} inset`} style={{ backgroundColor: color }} />
        </div>
        <div className={styles.colorsGrid}>
          {COLORS.map((c, i) => (
            <div 
              key={i} 
              className={`${styles.colorBox} ${color === c ? styles.selectedColor : ''}`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Paint;
