import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Plus, Sparkles } from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import AlbumBook from "../components/scrapbook/AlbumBook";
import MoodOrb from "../components/scrapbook/MoodOrb";
import WashiTape from "../components/layout/WashiTape";
import Loading from "../components/ui/Loading";
import EmptyState from "../components/ui/EmptyState";
import { useAuth } from "../context/AuthContext";
import { albumApi } from "../lib/api";

export default function Dashboard() {
  const { user } = useAuth();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    albumApi
      .list()
      .then((data) => setAlbums(data.albums))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const totalMemories = useMemo(() => albums.reduce((sum, a) => sum + (a.count || 0), 0), [albums]);
  const totalAlbums = albums.length;

  return (
    <div className="space-y-14">
      {/* greeting */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <p className="font-tape text-terracotta mb-1">good to see you, {user?.name} 👋</p>
          <h1 className="font-hand text-5xl text-cocoa-deep mb-2">What are we keeping today?</h1>
          <p className="font-utility text-cocoa/70">Every small moment counts — add it before it fades. ✨</p>
        </div>
        <Button as={Link} to="/memory/new" variant="primary" className="shrink-0">
          <Plus size={18} /> New memory
        </Button>
      </section>

      {/* AI companion — arrives Week 5, kept as a preview for now */}
      <section className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 relative bg-cream-deep rounded-3xl p-6 shadow-[var(--shadow-paper)] paper-grain flex flex-col items-center justify-center text-center gap-2 min-h-[180px]">
          <WashiTape tone="gold" rotate={-8} className="-top-3 left-8" />
          <span className="font-tape text-xs text-cocoa/40 uppercase tracking-wide inline-flex items-center gap-1"><Sparkles size={12}/> arriving in Week 5</span>
          <p className="font-hand text-2xl text-cocoa-deep">"On this day" reminders are coming soon</p>
          <p className="font-utility text-sm text-cocoa/60 max-w-sm">Once the AI Memory Companion is wired up, this space will surface memories from years past on today's date.</p>
        </div>

        <div className="relative bg-lavender/30 rounded-3xl p-6 shadow-[var(--shadow-paper)] flex flex-col items-center text-center">
          <MoodOrb emoji="🦉" label="Sage, your journal companion" />
          <p className="font-utility text-sm text-cocoa/70 mt-3 mb-4">Reflections on your memories will appear here once AI integration lands.</p>
          <Button as={Link} to="/ai-reflection" variant="secondary" className="text-sm">Preview AI Journal</Button>
        </div>
      </section>

      {/* albums shelf */}
      <section>
        <div className="flex items-end justify-between mb-6">
          <SectionHeading eyebrow="your shelf" title="Recent albums" />
          <Link to="/albums" className="font-tape text-terracotta hover:underline">see all →</Link>
        </div>
        {loading ? (
          <Loading label="Fetching your shelf..." />
        ) : error ? (
          <p className="font-tape text-terracotta">{error}</p>
        ) : albums.length === 0 ? (
          <EmptyState emoji="📚" title="No albums yet" subtitle="Start your first album to begin collecting memories." actionLabel="New album" />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {albums.slice(0, 6).map((album) => (
              <AlbumBook key={album._id} album={{ ...album, id: album._id }} />
            ))}
          </div>
        )}
      </section>

      {/* quick stats */}
      {!loading && (
        <section className="grid sm:grid-cols-2 gap-5">
          {[
            { label: "Memories kept", value: totalMemories, emoji: "📸" },
            { label: "Albums started", value: totalAlbums, emoji: "📚" },
          ].map((s) => (
            <div key={s.label} className="bg-peach/30 rounded-2xl p-5 flex items-center gap-4 shadow-[var(--shadow-paper)]">
              <span className="text-3xl">{s.emoji}</span>
              <div>
                <p className="font-hand text-3xl text-cocoa-deep leading-none">{s.value}</p>
                <p className="font-utility text-xs text-cocoa/60">{s.label}</p>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
