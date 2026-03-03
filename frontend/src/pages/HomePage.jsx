import { Link } from 'react-router';
import { Play, Plus, SlidersHorizontal } from 'lucide-react';
import MusicCard from '../component/MusicCard';

export default function HomePage({
    songs,
    deleteSong,
    toggleFavorite,
    genreFilter,
    setGenreFilter,
    languageFilter,
    setLanguageFilter,
    sortOrder,
    setSortOrder,
    uniqueGenres,
    uniqueLanguages,
    activeTab
}) {

    // Render empty state
    if (!songs || songs.length === 0) {
        return (
            <div className="hero min-h-[70vh] rounded-box bg-base-100 shadow-xl border border-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">No Music Found</h1>
                        <p className="py-6">
                            {activeTab !== 'All'
                                ? `You don't have any songs in your ${activeTab} list right now, or no songs match your filters.`
                                : 'Your library is empty, or no queries match your search!'}
                        </p>
                        {activeTab === 'All' ? (
                            <Link to="/create" className="btn btn-primary gap-2">
                                <Plus className="size-5" /> Add Music
                            </Link>
                        ) : (
                            <button onClick={() => { setGenreFilter(''); setLanguageFilter(''); }} className="btn btn-ghost">
                                Clear Filters
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-base-100 p-6 rounded-box shadow-sm border border-base-200">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight">Your Library</h1>
                    <p className="text-base-content/60 mt-2 text-lg font-medium">{activeTab} Music <span className="text-primary mx-2">•</span> {songs.length} Track{songs.length !== 1 ? 's' : ''}</p>
                </div>

                {/* Filters and Sorting Controls */}
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    <div className="bg-base-200 p-2 rounded-lg flex items-center gap-2 border border-base-300">
                        <SlidersHorizontal className="size-4 ml-2 text-base-content/50" />
                        <select
                            className="select select-sm select-ghost font-medium"
                            value={genreFilter}
                            onChange={e => setGenreFilter(e.target.value)}
                        >
                            <option value="">All Genres</option>
                            {uniqueGenres.map(g => <option key={g} value={g}>{g}</option>)}
                        </select>

                        <div className="w-px h-6 bg-base-300"></div>

                        <select
                            className="select select-sm select-ghost font-medium"
                            value={languageFilter}
                            onChange={e => setLanguageFilter(e.target.value)}
                        >
                            <option value="">All Languages</option>
                            {uniqueLanguages.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>

                        <div className="w-px h-6 bg-base-300"></div>

                        <select
                            className="select select-sm select-ghost font-medium text-primary"
                            value={sortOrder}
                            onChange={e => setSortOrder(e.target.value)}
                        >
                            <option value="Newest">Year: Newest</option>
                            <option value="Oldest">Year: Oldest</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {songs.map(song => (
                    <MusicCard key={song._id} song={song} onDelete={deleteSong} onToggleFavorite={toggleFavorite} />
                ))}
            </div>
        </div>
    );
}
