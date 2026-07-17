import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import Input from "../components/ui/Input";
import Loading from "../components/ui/Loading";
import EmptyState from "../components/ui/EmptyState";
import AlbumBook from "../components/scrapbook/AlbumBook";
import { albumApi } from "../lib/api";

const COLOR_OPTIONS = ["peach", "sage", "lavender", "blush", "gold"];
const COVER_OPTIONS = ["📔", "🌿", "🧳", "☕", "🍯", "🫖", "🌧️", "📷"];

export default function Albums() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState(COLOR_OPTIONS[0]);
  const [cover, setCover] = useState(COVER_OPTIONS[0]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    albumApi
      .list()
      .then((data) => setAlbums(data.albums))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const data = await albumApi.create({ title, color, cover });
      setAlbums((prev) => [data.album, ...prev]);
      setModalOpen(false);
      setTitle("");
      setColor(COLOR_OPTIONS[0]);
      setCover(COVER_OPTIONS[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <SectionHeading eyebrow="the whole shelf" title="Your albums" subtitle="Every collection you've ever started, all in one place." />
        <Button variant="primary" onClick={() => setModalOpen(true)}>
          <Plus size={18} /> New album
        </Button>
      </div>

      {loading ? (
        <Loading label="Fetching your shelf..." />
      ) : albums.length === 0 ? (
        <EmptyState emoji="📚" title="Your shelf is empty" subtitle="Start your first album to begin collecting memories." actionLabel="New album" />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {albums.map((album) => (
            <AlbumBook key={album._id} album={{ ...album, id: album._id }} />
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Start a new album 📚">
        <form className="space-y-4" onSubmit={handleCreate}>
          {error && (
            <p className="font-tape text-sm text-terracotta bg-blush/40 rounded-xl px-3 py-2">{error}</p>
          )}
          <Input
            id="album-title"
            label="Album name"
            placeholder="Cozy Autumn Evenings"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div>
            <p className="font-hand text-2xl text-cocoa-deep mb-1">Cover</p>
            <div className="flex gap-1.5 flex-wrap">
              {COVER_OPTIONS.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setCover(c)}
                  className={`text-2xl w-10 h-10 rounded-lg flex items-center justify-center transition-transform ${cover === c ? "bg-sand scale-110" : "hover:bg-sand/60"}`}
                  aria-label={`Use ${c} as cover`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-hand text-2xl text-cocoa-deep mb-1">Color</p>
            <div className="flex gap-2">
              {COLOR_OPTIONS.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setColor(c)}
                  aria-label={c}
                  className={`w-8 h-8 rounded-full border-2 ${color === c ? "border-cocoa-deep scale-110" : "border-white"} bg-${c} transition-transform`}
                />
              ))}
            </div>
          </div>
          <Button type="submit" variant="primary" className="w-full" disabled={submitting}>
            {submitting ? "Creating..." : "Create album"}
          </Button>
        </form>
      </Modal>
    </div>
  );
}
