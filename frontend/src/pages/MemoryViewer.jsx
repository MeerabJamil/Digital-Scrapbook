import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import WashiTape from "../components/layout/WashiTape";
import StickerBadge from "../components/ui/StickerBadge";
import Loading from "../components/ui/Loading";
import EmptyState from "../components/ui/EmptyState";
import { memoryApi } from "../lib/api";
import { toMemoryView } from "../lib/memoryView";

export default function MemoryViewer() {
  const { memoryId } = useParams();
  const [memory, setMemory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setLoading(true);
    memoryApi
      .get(memoryId)
      .then((data) => setMemory(toMemoryView(data.memory)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [memoryId]);

  async function handleDelete() {
    if (!window.confirm("Delete this memory? This can't be undone.")) return;
    setDeleting(true);
    try {
      await memoryApi.remove(memoryId);
      window.history.back();
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  }

  if (loading) return <Loading label="Turning the page..." />;

  if (error || !memory) {
    return <EmptyState emoji="🍂" title="Couldn't find that memory" subtitle={error || "It may have been deleted."} />;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Link to={`/albums/${memory.album?._id || memory.album}`} className="inline-flex items-center gap-1 font-tape text-cocoa/60 hover:text-terracotta">
          <ArrowLeft size={16} /> back to album
        </Link>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="inline-flex items-center gap-1 font-tape text-cocoa/50 hover:text-terracotta text-sm"
        >
          <Trash2 size={14} /> {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>

      <div className="relative bg-cream-deep paper-grain rounded-3xl shadow-[var(--shadow-paper-lg)] p-8 md:p-12">
        <WashiTape tone={memory.mood.tone} rotate={-8} className="-top-4 left-10" width={90} />
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <StickerBadge tone={memory.mood.tone} rotate={-3}>{memory.mood.emoji} {memory.mood.label}</StickerBadge>
          <p className="font-tape text-cocoa/50">{memory.date}</p>
        </div>

        <div className="w-28 h-28 bg-white shadow-[var(--shadow-paper)] rounded-sm flex items-center justify-center text-6xl mb-6 -rotate-3">
          {memory.photo}
        </div>

        <h1 className="font-hand text-5xl text-cocoa-deep mb-4">{memory.title}</h1>
        <p className="font-utility text-lg text-cocoa/80 leading-relaxed whitespace-pre-wrap">{memory.excerpt}</p>
      </div>

      {/* AI reflection arrives in Week 5 (AI Memory Companion) — not generated yet */}
    </div>
  );
}
