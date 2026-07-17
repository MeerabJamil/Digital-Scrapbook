import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Plus, ArrowLeft } from "lucide-react";
import MemoryCard from "../components/scrapbook/MemoryCard";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import Loading from "../components/ui/Loading";
import { albumApi, memoryApi } from "../lib/api";
import { toMemoryView } from "../lib/memoryView";

export default function AlbumDetails() {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    Promise.all([albumApi.get(albumId), memoryApi.listForAlbum(albumId)])
      .then(([albumData, memoriesData]) => {
        setAlbum(albumData.album);
        setMemories(memoriesData.memories);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [albumId]);

  if (loading) return <Loading label="Opening this album..." />;

  if (error || !album) {
    return (
      <EmptyState emoji="🍂" title="Couldn't open this album" subtitle={error || "It may have been deleted."} />
    );
  }

  return (
    <div>
      <Link to="/albums" className="inline-flex items-center gap-1 font-tape text-cocoa/60 hover:text-terracotta mb-6">
        <ArrowLeft size={16} /> back to shelf
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-4">
          <span className="text-6xl">{album.cover}</span>
          <div>
            <h1 className="font-hand text-5xl text-cocoa-deep">{album.title}</h1>
            <p className="font-utility text-cocoa/60">{album.count} memories pressed into this one</p>
          </div>
        </div>
        <Button as={Link} to={`/memory/new?albumId=${album._id}`} variant="primary">
          <Plus size={18} /> Add memory
        </Button>
      </div>

      {memories.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {memories.map((memory) => (
            <MemoryCard key={memory._id} memory={toMemoryView(memory)} />
          ))}
        </div>
      ) : (
        <EmptyState
          emoji="🍂"
          title="This album is still empty"
          subtitle="No memories here yet — add your first one to bring this page to life."
          actionLabel="Add a memory"
        />
      )}
    </div>
  );
}
