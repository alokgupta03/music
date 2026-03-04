import { Link, useLocation } from 'react-router';
import { Music, Search } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, searchQuery, setSearchQuery }) {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <div className="navbar bg-base-100 shadow-sm border-b border-base-300 px-4 sm:px-8 py-3">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl gap-2">
                    <Music className="size-6 text-primary" />
                    <span className="font-bold hidden sm:inline">MusicLib</span>
                </Link>
            </div>

            {isHome && (
                <div className="flex-none gap-4">
                    <div className="form-control hidden md:block">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search Title, Artist, Album..."
                                className="input input-bordered w-48 lg:w-72 pl-10 bg-base-200"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50" />
                        </div>
                    </div>
                    <div className="tabs tabs-boxed bg-base-200 p-1">
                        {['All', 'Favorites', 'Recommended'].map(tab => (
                            <a
                                key={tab}
                                className={`tab tab-sm sm:tab-md font-semibold transition-all ${activeTab === tab ? 'tab-active' : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {isHome && (
                <div className="dropdown dropdown-end md:hidden ml-2">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <Search className="size-5" />
                    </div>
                    <div tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-64 p-2 shadow">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="input input-bordered w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            )}

            <div className="flex-none ml-2">
                <Link to="/create" className="btn btn-primary btn-sm h-10 px-4">Add Music</Link>
            </div>
        </div>
    );
}
