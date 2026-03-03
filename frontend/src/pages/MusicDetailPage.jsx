import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { Loader2, ArrowLeft, Disc3, Clock, Calendar, Star, Heart, CheckCircle2, Music } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatDate } from '../lib/utils';

export default function MusicDetailPage({ songs }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [song, setSong] = useState(null);

    useEffect(() => {
        const foundSong = songs.find(s => s._id === id);
        if (foundSong) {
            setSong(foundSong);
        } else {
            toast.error('Song not found!');
            navigate('/');
        }
    }, [id, songs, navigate]);

    if (!song) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <Loader2 className="size-10 animate-spin text-primary" />
            </div>
        );
    }

    const formatDuration = (seconds) => {
        if (!seconds) return 'Unknown';
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate(-1)} className="btn btn-circle btn-ghost">
                    <ArrowLeft className="size-6" />
                </button>
                <div className="breadcrumbs text-sm">
                    <ul>
                        <li><Link to="/">Library</Link></li>
                        <li className="font-semibold text-primary">{song.title}</li>
                    </ul>
                </div>
            </div>

            <div className="card lg:card-side bg-base-100 shadow-2xl border border-base-200 overflow-hidden">
                <figure className="lg:w-2/5 relative bg-gradient-to-br from-primary/20 to-secondary/20 h-64 lg:h-auto overflow-hidden">
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
                        <div className="flex items-center justify-center w-full h-full bg-base-300">
                            <Disc3 className="size-32 text-base-content/10 drop-shadow-xl animate-[spin_20s_linear_infinite]" />
                        </div>
                    )}

                    <div className="absolute top-6 right-6 flex flex-col gap-3">
                        {song.isFavorite && (
                            <div className="badge badge-error badge-lg gap-2 shadow-lg p-3">
                                <Heart className="size-4 fill-current" /> Favorite
                            </div>
                        )}
                        {song.isRecommended && (
                            <div className="badge badge-secondary badge-lg gap-2 shadow-lg p-3">
                                <CheckCircle2 className="size-4" /> Recommended
                            </div>
                        )}
                    </div>
                </figure>

                <div className="card-body lg:w-3/5 p-8 sm:p-12">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div>
                            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2">{song.title}</h1>
                            <h2 className="text-2xl text-base-content/70 font-medium">{song.artist}</h2>
                        </div>

                        <div className="flex items-center gap-2 bg-base-200 px-4 py-2 rounded-full border border-base-300 shrink-0">
                            <Star className="size-5 text-warning fill-warning" />
                            <span className="text-xl font-bold">{song.rating || 0}<span className="text-sm text-base-content/50">/10</span></span>
                        </div>
                    </div>

                    <div className="divider my-4 lg:my-8 text-primary"><Music className="size-5" /></div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-4">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-base-200 rounded-box text-primary">
                                <Disc3 className="size-6" />
                            </div>
                            <div>
                                <p className="text-xs text-base-content/50 uppercase font-bold tracking-wider mb-1">Album</p>
                                <p className="text-lg font-medium">{song.album || 'Single/Unknown'}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-base-200 rounded-box text-secondary">
                                <Music className="size-6" />
                            </div>
                            <div>
                                <p className="text-xs text-base-content/50 uppercase font-bold tracking-wider mb-1">Genre & Language</p>
                                <p className="text-lg font-medium">
                                    {song.genre || 'Unknown Genre'} • {song.language || 'Unknown Lang'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-base-200 rounded-box text-accent">
                                <Clock className="size-6" />
                            </div>
                            <div>
                                <p className="text-xs text-base-content/50 uppercase font-bold tracking-wider mb-1">Duration</p>
                                <p className="text-lg font-medium">{formatDuration(song.duration)}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-base-200 rounded-box text-info">
                                <Calendar className="size-6" />
                            </div>
                            <div>
                                <p className="text-xs text-base-content/50 uppercase font-bold tracking-wider mb-1">Release Year</p>
                                <p className="text-lg font-medium">{song.releaseYear || 'Unknown'}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 w-full pl-2">
                            <p className="text-xs text-base-content/50 uppercase font-bold tracking-wider mb-1">Database Info</p>
                            <p className="text-sm font-medium">Added: {formatDate(song.createdAt)}</p>
                            <p className="text-sm font-medium">Last Updated: {formatDate(song.updatedAt)}</p>
                        </div>
                    </div>

                    <div className="card-actions justify-between items-end mt-12 pt-6 border-t border-base-200">
                        <Link to={`/edit/${song._id}`} className="btn btn-primary px-8">
                            Edit Details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
