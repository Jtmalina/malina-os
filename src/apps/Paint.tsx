import React, { useRef, useState, useEffect, useCallback } from 'react';
import styles from './Paint.module.css';

const COLORS = [
  '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080', '#808040', '#004040', '#0080FF', '#004080', '#4000FF', '#804000',
  '#FFFFFF', '#C0C0C0', '#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF', '#FFFF80', '#00FF80', '#80FFFF', '#8080FF', '#FF0080', '#FF8040'
];

type Tool = 'brush' | 'fill' | 'eyedropper';

const Paint: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(2);
  const [tool, setTool] = useState<Tool>('brush');
  const lastPos = useRef({ x: 0, y: 0 });

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (parent) {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  useEffect(() => {
    initCanvas();
    window.addEventListener('resize', initCanvas);
    return () => window.removeEventListener('resize', initCanvas);
  }, [initCanvas]);

  const getCanvasCoords = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: Math.floor(e.clientX - rect.left),
      y: Math.floor(e.clientY - rect.top)
    };
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16),
      255
    ] : [0, 0, 0, 255];
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  };

  const floodFill = (startX: number, startY: number, fillColor: string) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { willReadFrequently: true });
    if (!ctx || !canvas) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const targetRgb = hexToRgb(fillColor);
    
    const startPos = (startY * canvas.width + startX) * 4;
    const startR = data[startPos];
    const startG = data[startPos + 1];
    const startB = data[startPos + 2];
    const startA = data[startPos + 3];

    if (startR === targetRgb[0] && startG === targetRgb[1] && startB === targetRgb[2]) return;

    const stack: [number, number][] = [[startX, startY]];
    
    while (stack.length > 0) {
      const [x, y] = stack.pop()!;
      const pos = (y * canvas.width + x) * 4;

      if (data[pos] === startR && data[pos + 1] === startG && data[pos + 2] === startB && data[pos + 3] === startA) {
        data[pos] = targetRgb[0];
        data[pos + 1] = targetRgb[1];
        data[pos + 2] = targetRgb[2];
        data[pos + 3] = targetRgb[3];

        if (x > 0) stack.push([x - 1, y]);
        if (x < canvas.width - 1) stack.push([x + 1, y]);
        if (y > 0) stack.push([x, y - 1]);
        if (y < canvas.height - 1) stack.push([x, y + 1]);
      }
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const { x, y } = getCanvasCoords(e);
    
    if (tool === 'fill') {
      floodFill(x, y, color);
      return;
    }

    if (tool === 'eyedropper') {
      const ctx = canvasRef.current?.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        setColor(rgbToHex(pixel[0], pixel[1], pixel[2]));
      }
      return;
    }

    setIsDrawing(true);
    lastPos.current = { x, y };
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || tool !== 'brush') return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const { x, y } = getCanvasCoords(e);

    if (ctx) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
      lastPos.current = { x, y };
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
            <div 
              className={`${styles.toolIcon} ${tool === 'brush' ? styles.inset : ''}`}
              onClick={() => setTool('brush')}
              title="Brush"
            >
              🖌️
            </div>
            <div 
              className={`${styles.toolIcon} ${tool === 'fill' ? styles.inset : ''}`}
              onClick={() => setTool('fill')}
              title="Fill"
            >
              🪣
            </div>
            <div 
              className={`${styles.toolIcon} ${tool === 'eyedropper' ? styles.inset : ''}`}
              onClick={() => setTool('eyedropper')}
              title="Pick Color"
            >
              🧪
            </div>
            <div className={styles.toolIcon} onClick={clearCanvas} title="Clear">🗑️</div>
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
            onMouseDown={handleMouseDown}
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
