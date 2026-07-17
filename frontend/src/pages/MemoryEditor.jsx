import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Image as ImageIcon, StickyNote, Save, GripVertical, RotateCw, Trash2 } from "lucide-react";
import BrushToolbar from "../components/scrapbook/BrushToolbar";
import StickerPicker from "../components/scrapbook/StickerPicker";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useCanvasDraw } from "../hooks/useCanvasDraw";
import { albumApi, memoryApi } from "../lib/api";
import { moods } from "../data/mockData";

const PAGE_W = 720;
const PAGE_H = 500;
const PHOTO_EMOJIS = ["🥞", "🌻", "☕", "🍞", "🍅", "🚋", "📷", "🍄"];

let idCounter = 1;

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function MemoryEditor() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pageRef = useRef(null);
  const draw = useCanvasDraw({ width: PAGE_W, height: PAGE_H });

  const [mode, setMode] = useState("arrange"); // "arrange" | "draw"
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [dragState, setDragState] = useState(null);
  const [saved, setSaved] = useState(false);

  // memory metadata — this is what actually gets saved to the backend;
  // the canvas above is a creative layer for now (see README note)
  const [albums, setAlbums] = useState([]);
  const [albumId, setAlbumId] = useState(searchParams.get("albumId") || "");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(todayISO());
  const [moodLabel, setMoodLabel] = useState(moods[0].label);
  const [coverEmoji, setCoverEmoji] = useState(PHOTO_EMOJIS[0]);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    albumApi
      .list()
      .then((data) => {
        setAlbums(data.albums);
        if (!albumId && data.albums.length > 0) setAlbumId(data.albums[0]._id);
      })
      .catch((err) => setError(err.message));
  }, []);

  const addElement = (partial) => {
    const el = {
      id: idCounter++,
      x: 260 + Math.random() * 60,
      y: 160 + Math.random() * 60,
      rotate: Math.round((Math.random() - 0.5) * 20),
      color: draw.color,
      highlighted: false,
      ...partial,
    };
    setElements((els) => [...els, el]);
    setSelectedId(el.id);
  };

  const addSticker = (emoji) => addElement({ type: "sticker", emoji });
  const addPhoto = () => addElement({ type: "photo", emoji: PHOTO_EMOJIS[Math.floor(Math.random() * PHOTO_EMOJIS.length)] });
  const addNote = () => addElement({ type: "note", text: "write something small..." });

  const removeSelected = () => {
    setElements((els) => els.filter((el) => el.id !== selectedId));
    setSelectedId(null);
  };

  const rotateSelected = () => {
    setElements((els) => els.map((el) => (el.id === selectedId ? { ...el, rotate: el.rotate + 20 } : el)));
  };

  const onPointerDownEl = (e, el) => {
    e.stopPropagation();
    setSelectedId(el.id);
    const rect = pageRef.current.getBoundingClientRect();
    setDragState({
      id: el.id,
      offsetX: e.clientX - rect.left - el.x,
      offsetY: e.clientY - rect.top - el.y,
    });
  };

  const onPagePointerMove = useCallback((e) => {
    if (mode === "draw") {
      draw.draw(e);
      return;
    }
    if (!dragState) return;
    const rect = pageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - dragState.offsetX;
    const y = e.clientY - rect.top - dragState.offsetY;
    setElements((els) => els.map((el) => (el.id === dragState.id ? { ...el, x, y } : el)));
  }, [dragState, mode, draw]);

  const onPagePointerUp = () => {
    setDragState(null);
    draw.stopDraw();
  };

  const onPagePointerDown = (e) => {
    if (mode === "draw") draw.startDraw(e);
    else setSelectedId(null);
  };

  async function handleSave() {
    setError("");
    if (!albumId) return setError("Pick an album for this memory first.");
    if (!title.trim()) return setError("Give this memory a title.");
    if (!note.trim()) return setError("Write a little about this memory.");

    setSaving(true);
    try {
      await memoryApi.create(albumId, {
        title,
        photo: coverEmoji,
        note,
        date,
        mood: moodLabel,
      });
      setSaved(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-hand text-5xl text-cocoa-deep">Decorate your page</h1>
          <p className="font-utility text-cocoa/60">Drag stickers into place, doodle freely, or jot a note.</p>
        </div>
        <div className="flex gap-2">
          <Button variant={mode === "arrange" ? "secondary" : "ghost"} onClick={() => setMode("arrange")}>
            Arrange
          </Button>
          <Button variant={mode === "draw" ? "secondary" : "ghost"} onClick={() => setMode("draw")}>
            Draw
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={saving}>
            <Save size={16} /> {saving ? "Saving..." : "Save memory"}
          </Button>
        </div>
      </div>

      {error && (
        <p className="font-tape text-sm text-terracotta bg-blush/40 rounded-xl px-3 py-2 mb-4 inline-block">{error}</p>
      )}

      {/* memory details — this is what's actually saved to your journal */}
      <div className="bg-cream-deep rounded-2xl p-4 shadow-[var(--shadow-paper)] mb-6 grid md:grid-cols-2 gap-4">
        <div>
          <p className="font-hand text-2xl text-cocoa-deep mb-1">Album</p>
          <select
            value={albumId}
            onChange={(e) => setAlbumId(e.target.value)}
            className="w-full rounded-2xl bg-cream border-2 border-cocoa/15 px-4 py-2.5 font-body text-ink outline-none focus:border-lavender-deep"
          >
            {albums.length === 0 && <option value="">No albums yet — create one first</option>}
            {albums.map((a) => (
              <option key={a._id} value={a._id}>{a.cover} {a.title}</option>
            ))}
          </select>
        </div>
        <Input id="memory-title" label="Title" placeholder="Rooftop café near Anarkali" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input id="memory-date" label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <div>
          <p className="font-hand text-2xl text-cocoa-deep mb-1">Mood</p>
          <div className="flex gap-1.5 flex-wrap">
            {moods.map((m) => (
              <button
                key={m.label}
                type="button"
                onClick={() => setMoodLabel(m.label)}
                className={`font-tape text-sm px-3 py-1.5 rounded-full transition-colors ${moodLabel === m.label ? "bg-blush text-cocoa-deep" : "bg-cream text-cocoa/60 hover:bg-sand"}`}
              >
                {m.emoji} {m.label}
              </button>
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
          <p className="font-hand text-2xl text-cocoa-deep mb-1">Cover</p>
          <div className="flex gap-1.5">
            {PHOTO_EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setCoverEmoji(emoji)}
                className={`text-2xl w-10 h-10 rounded-lg flex items-center justify-center transition-transform ${coverEmoji === emoji ? "bg-sand scale-110" : "hover:bg-sand/60"}`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="memory-note" className="block">
            <span className="font-hand text-2xl text-cocoa-deep mb-1 block">Write about it</span>
            <textarea
              id="memory-note"
              rows={3}
              maxLength={1000}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Found a tiny rooftop café near Anarkali. Sat there for two hours watching kites in the sky."
              className="w-full rounded-2xl bg-cream border-2 border-cocoa/15 px-4 py-2.5 font-body text-ink placeholder:text-cocoa/40 outline-none focus:border-lavender-deep resize-none"
            />
          </label>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_260px] gap-6 items-start">
        {/* the page — decorative canvas, for arranging the scrapbook look */}
        <div className="flex justify-center">
          <div
            ref={pageRef}
            onPointerMove={onPagePointerMove}
            onPointerUp={onPagePointerUp}
            onPointerLeave={onPagePointerUp}
            onPointerDown={onPagePointerDown}
            className="relative bg-cream-deep paper-grain rounded-2xl shadow-[var(--shadow-paper-lg)] overflow-hidden touch-none select-none"
            style={{ width: PAGE_W, maxWidth: "100%", height: PAGE_H, cursor: mode === "draw" ? "crosshair" : "default" }}
          >
            <canvas
              ref={draw.canvasRef}
              className="absolute inset-0"
              style={{ pointerEvents: mode === "draw" ? "auto" : "none" }}
            />

            {elements.map((el) => (
              <motion.div
                key={el.id}
                className="absolute"
                style={{ left: el.x, top: el.y, rotate: `${el.rotate}deg`, zIndex: selectedId === el.id ? 30 : 10 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
              >
                {el.type === "sticker" && (
                  <button
                    onPointerDown={(e) => onPointerDownEl(e, el)}
                    className={`text-5xl cursor-grab active:cursor-grabbing ${selectedId === el.id ? "drop-shadow-[0_0_6px_rgba(198,112,75,0.6)]" : ""}`}
                  >
                    {el.emoji}
                  </button>
                )}

                {el.type === "photo" && (
                  <div
                    onPointerDown={(e) => onPointerDownEl(e, el)}
                    className={`bg-white p-2 pb-4 shadow-[var(--shadow-paper)] rounded-sm cursor-grab active:cursor-grabbing ${selectedId === el.id ? "ring-2 ring-terracotta" : ""}`}
                  >
                    <div className="w-24 h-24 bg-sand rounded-sm flex items-center justify-center text-4xl">{el.emoji}</div>
                  </div>
                )}

                {el.type === "note" && (
                  <div
                    className={`relative rounded-lg px-3 py-2 max-w-[180px] shadow-[var(--shadow-paper)] ${el.highlighted ? "bg-gold/50" : "bg-sand"} ${selectedId === el.id ? "ring-2 ring-terracotta" : ""}`}
                  >
                    <span
                      onPointerDown={(e) => onPointerDownEl(e, el)}
                      className="absolute -top-2 -left-2 bg-cocoa/70 text-cream rounded-full p-0.5 cursor-grab active:cursor-grabbing"
                    >
                      <GripVertical size={12} />
                    </span>
                    <p
                      contentEditable
                      suppressContentEditableWarning
                      onFocus={() => setSelectedId(el.id)}
                      className="font-hand text-xl leading-tight outline-none"
                      style={{ color: el.color }}
                    >
                      {el.text}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* sidebar tools */}
        <div className="space-y-4">
          {mode === "draw" ? (
            <BrushToolbar draw={draw} />
          ) : (
            <div className="bg-cream-deep rounded-2xl p-4 shadow-[var(--shadow-paper)] space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <button onClick={addPhoto} className="btn-squish flex flex-col items-center gap-1 bg-sand rounded-xl py-3 text-xs font-tape text-cocoa/70">
                  <ImageIcon size={18} /> Add photo
                </button>
                <button onClick={addNote} className="btn-squish flex flex-col items-center gap-1 bg-sand rounded-xl py-3 text-xs font-tape text-cocoa/70">
                  <StickyNote size={18} /> Add note
                </button>
              </div>
              <div>
                <p className="font-tape text-cocoa-deep text-sm mb-2">Stickers</p>
                <StickerPicker onPick={addSticker} />
              </div>
              {selectedId && (
                <div className="flex gap-2 pt-1">
                  <button onClick={rotateSelected} className="btn-squish flex-1 flex items-center justify-center gap-1 bg-lavender/60 rounded-xl py-2 text-xs font-tape text-cocoa-deep">
                    <RotateCw size={14} /> Rotate
                  </button>
                  <button onClick={removeSelected} className="btn-squish flex-1 flex items-center justify-center gap-1 bg-blush/60 rounded-xl py-2 text-xs font-tape text-cocoa-deep">
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {saved && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-sage text-cocoa-deep font-tape px-6 py-3 rounded-full shadow-[var(--shadow-paper-lg)] flex items-center gap-2 z-50"
        >
          🎉 Memory saved to your scrapbook!
          <Link to={`/albums/${albumId}`} className="underline ml-2">go to album</Link>
        </motion.div>
      )}
    </div>
  );
}
