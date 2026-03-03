import { Link } from 'react-router';
import { Play, Edit, Trash2, Heart, Disc3 } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatDate } from '../lib/utils';

export default function MusicCard({ song, onDelete, onToggleFavorite }) {
    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete "${song.title}"?`)) {
            onDelete(song._id);
            toast.success(`${song.title} deleted successfully!`);
        }
    };

    const handleFavorite = (e) => {
        e.preventDefault();
        onToggleFavorite(song._id);
        if (!song.isFavorite) {
            toast.success('Added to Favorites!');
        } else {
            toast('Removed from Favorites', { icon: '💔' });
        }
    };

    return (
        <div className="card bg-base-100 shadow-xl hover:-translate-y-2 transition-transform duration-300 group ring-1 ring-base-content/10 flex flex-col h-full">
            <figure className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden shrink-0">
                {song.coverImage ? (
                    <img
                        src={song.coverImage}
                        alt={song.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80';
                        }}
                    />
                ) : (
                    <Disc3 className="size-20 text-base-content/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-500" />
                )}

                <div className="absolute inset-0 bg-base-300/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link to={`/music/${song._id}`} className="btn btn-circle btn-primary btn-lg shadow-lg">
                        <Play className="size-6 ml-1" />
                    </Link>
                </div>

                {/* Favorite Quick Action Toggle */}
                <button
                    onClick={handleFavorite}
                    className="absolute top-4 right-4 btn btn-circle btn-sm btn-ghost hover:bg-base-200/50 transition-colors z-10 bg-base-100/30 backdrop-blur-md"
                >
                    <Heart className={`size-5 transition-transform active:scale-75 ${song.isFavorite ? 'fill-error text-error' : 'text-base-content'}`} />
                </button>
            </figure>

            <div className="card-body p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start gap-4">
                    <div className="min-w-0">
                        <h2 className="card-title text-xl font-bold truncate" title={song.title}>
                            {song.title}
                        </h2>
                        <p className="text-base-content/60 font-medium truncate" title={song.artist}>
                            {song.artist}
                        </p>
                    </div>
                    <div className="badge badge-outline shrink-0">{song.genre || 'Unknown'}</div>
                </div>

                <div className="text-sm text-base-content/70 mt-4 space-y-1 flex-grow">
                    <p className="truncate" title={song.album}><span className="font-semibold">Album:</span> {song.album || 'Single'}</p>
                    <p><span className="font-semibold">Year:</span> {song.releaseYear || 'N/A'}</p>
                    <div className="flex items-center gap-1 mt-2">
                        <span className="font-semibold text-warning text-lg">★</span>
                        <span className="font-bold">{song.rating || 0}<span className="text-xs font-normal text-base-content/50">/10</span></span>
                    </div>
                    <div className="mt-2 text-xs text-base-content/50 border-t border-base-200 pt-2">
                        <p>Added: {formatDate(song.createdAt)}</p>
                        <p>Updated: {formatDate(song.updatedAt)}</p>
                    </div>
                </div>

                <div className="card-actions justify-end pt-4 border-t border-base-200 mt-auto">
                    <div className="join w-full">
                        <Link to={`/edit/${song._id}`} className="btn btn-sm join-item flex-1 bg-base-200 hover:bg-base-300 border-none">
                            <Edit className="size-4" /> Edit
                        </Link>
                        <button onClick={handleDelete} className="btn btn-sm join-item flex-1 bg-base-200 hover:bg-error hover:text-error-content border-none group/btn">
                            <Trash2 className="size-4 group-hover/btn:animate-bounce" /> Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
