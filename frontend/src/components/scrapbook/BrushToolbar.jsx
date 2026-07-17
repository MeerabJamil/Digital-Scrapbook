import { Paintbrush, PenLine, Highlighter, Eraser, Undo2, Redo2, Trash2 } from "lucide-react";

const TOOLS = [
  { id: "brush", label: "Brush", icon: Paintbrush },
  { id: "pencil", label: "Pencil", icon: PenLine },
  { id: "marker", label: "Marker", icon: Highlighter },
  { id: "eraser", label: "Eraser", icon: Eraser },
];

const SWATCHES = ["#C6704B", "#7A5A45", "#E8B84B", "#AFC29B", "#C7B3EE", "#DDA9AC", "#4A3B32", "#FFFFFF"];

export default function BrushToolbar({ draw }) {
  const { tool, setTool, color, setColor, size, setSize, opacity, setOpacity, undo, redo, clearCanvas, canUndo, canRedo } = draw;

  return (
    <div className="bg-cream-deep rounded-2xl p-4 shadow-[var(--shadow-paper)] space-y-4">
      <div>
        <p className="font-tape text-cocoa-deep text-sm mb-2">Tool</p>
        <div className="grid grid-cols-4 gap-1.5">
          {TOOLS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTool(id)}
              aria-label={label}
              className={`btn-squish flex flex-col items-center gap-1 py-2 rounded-xl text-xs font-tape transition-colors ${
                tool === id ? "bg-blush text-cocoa-deep" : "bg-sand text-cocoa/60 hover:bg-peach/40"
              }`}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="font-tape text-cocoa-deep text-sm mb-2">Color</p>
        <div className="flex flex-wrap gap-2">
          {SWATCHES.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              aria-label={`Color ${c}`}
              className={`w-6 h-6 rounded-full border-2 ${color === c ? "border-cocoa-deep scale-110" : "border-white/70"} transition-transform`}
              style={{ background: c }}
            />
          ))}
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-6 h-6 rounded-full overflow-hidden border-0 cursor-pointer"
            aria-label="Custom color"
          />
        </div>
      </div>

      <div>
        <label className="font-tape text-cocoa-deep text-sm mb-1 block">Brush size · {size}px</label>
        <input type="range" min="2" max="40" value={size} onChange={(e) => setSize(+e.target.value)} className="w-full accent-terracotta" />
      </div>

      <div>
        <label className="font-tape text-cocoa-deep text-sm mb-1 block">Opacity · {Math.round(opacity * 100)}%</label>
        <input type="range" min="0.1" max="1" step="0.05" value={opacity} onChange={(e) => setOpacity(+e.target.value)} className="w-full accent-terracotta" />
      </div>

      <div className="flex gap-2 pt-1">
        <button onClick={undo} disabled={!canUndo} className="btn-squish flex-1 flex items-center justify-center gap-1 bg-sand rounded-xl py-2 text-xs font-tape text-cocoa/70 disabled:opacity-30">
          <Undo2 size={14} /> Undo
        </button>
        <button onClick={redo} disabled={!canRedo} className="btn-squish flex-1 flex items-center justify-center gap-1 bg-sand rounded-xl py-2 text-xs font-tape text-cocoa/70 disabled:opacity-30">
          <Redo2 size={14} /> Redo
        </button>
        <button onClick={clearCanvas} className="btn-squish flex-1 flex items-center justify-center gap-1 bg-blush/60 rounded-xl py-2 text-xs font-tape text-cocoa-deep">
          <Trash2 size={14} /> Clear
        </button>
      </div>
    </div>
  );
}
