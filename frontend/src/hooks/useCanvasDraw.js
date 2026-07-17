import { useEffect, useRef, useState, useCallback } from "react";

export function useCanvasDraw({ width, height }) {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const [tool, setTool] = useState("brush"); // brush | pencil | marker | eraser
  const [color, setColor] = useState("#C6704B");
  const [size, setSize] = useState(6);
  const [opacity, setOpacity] = useState(1);
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);

  const getCtx = () => canvasRef.current?.getContext("2d");

  const pushHistory = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setHistory((h) => [...h.slice(-19), canvas.toDataURL()]);
    setFuture([]);
  }, []);

  const pointerPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const startDraw = (e) => {
    pushHistory();
    drawing.current = true;
    last.current = pointerPos(e);
  };

  const draw = (e) => {
    if (!drawing.current) return;
    const ctx = getCtx();
    const pos = pointerPos(e);
    ctx.globalCompositeOperation = tool === "eraser" ? "destination-out" : "source-over";
    ctx.globalAlpha = tool === "eraser" ? 1 : opacity;
    ctx.strokeStyle = color;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = tool === "pencil" ? Math.max(1.5, size * 0.4) : tool === "marker" ? size * 1.8 : size;
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    last.current = pos;
  };

  const stopDraw = () => {
    drawing.current = false;
  };

  const undo = () => {
    const canvas = canvasRef.current;
    if (!canvas || history.length === 0) return;
    const ctx = getCtx();
    const current = canvas.toDataURL();
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setFuture((f) => [...f, current]);
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
    img.src = prev;
  };

  const redo = () => {
    const canvas = canvasRef.current;
    if (!canvas || future.length === 0) return;
    const ctx = getCtx();
    const next = future[future.length - 1];
    setFuture((f) => f.slice(0, -1));
    setHistory((h) => [...h, canvas.toDataURL()]);
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
    img.src = next;
  };

  const clearCanvas = () => {
    pushHistory();
    const canvas = canvasRef.current;
    getCtx().clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = width;
    canvas.height = height;
  }, [width, height]);

  return {
    canvasRef,
    tool, setTool,
    color, setColor,
    size, setSize,
    opacity, setOpacity,
    startDraw, draw, stopDraw,
    undo, redo, clearCanvas,
    canUndo: history.length > 0,
    canRedo: future.length > 0,
  };
}
