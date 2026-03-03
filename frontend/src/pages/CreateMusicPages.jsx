import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Save, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CreateMusicPages({ addSong }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        artist: '',
        album: '',
        genre: '',
        language: '',
        duration: '',
        releaseYear: '',
        rating: 0,
        isFavorite: false,
        coverImage: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.artist) {
            toast.error('Title and Artist are required');
            return;
        }

        addSong(formData);
        toast.success('Music added successfully!');
        navigate('/');
    };

    return (
        <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate(-1)} className="btn btn-circle btn-ghost">
                    <ArrowLeft className="size-6" />
                </button>
                <h1 className="text-3xl font-bold">Add New Music</h1>
            </div>

            <div className="card bg-base-100 shadow-2xl border border-base-200">
                <form onSubmit={handleSubmit} className="card-body p-6 sm:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="form-control w-full">
                            <label className="label"><span className="label-text font-semibold">Title *</span></label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Bohemian Rhapsody" className="input input-bordered w-full focus:input-primary transition-colors" required />
                        </div>

                        <div className="form-control w-full">
                            <label className="label"><span className="label-text font-semibold">Artist *</span></label>
                            <input type="text" name="artist" value={formData.artist} onChange={handleChange} placeholder="e.g. Queen" className="input input-bordered w-full focus:input-primary transition-colors" required />
                        </div>

                        <div className="form-control w-full">
                            <label className="label"><span className="label-text font-semibold">Album</span></label>
                            <input type="text" name="album" value={formData.album} onChange={handleChange} placeholder="e.g. A Night at the Opera" className="input input-bordered w-full focus:input-primary transition-colors" />
                        </div>

                        <div className="form-control w-full">
                            <label className="label"><span className="label-text font-semibold">Genre</span></label>
                            <input type="text" name="genre" value={formData.genre} onChange={handleChange} placeholder="e.g. Rock" className="input input-bordered w-full focus:input-primary transition-colors" />
                        </div>

                        <div className="form-control w-full">
                            <label className="label"><span className="label-text font-semibold">Language</span></label>
                            <input type="text" name="language" value={formData.language} onChange={handleChange} placeholder="e.g. English" className="input input-bordered w-full focus:input-primary transition-colors" />
                        </div>

                        <div className="form-control w-full">
                            <label className="label"><span className="label-text font-semibold">Duration (seconds)</span></label>
                            <input type="number" name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g. 355" className="input input-bordered w-full focus:input-primary transition-colors" />
                        </div>

                        <div className="form-control w-full">
                            <label className="label"><span className="label-text font-semibold">Cover Image URL</span></label>
                            <input type="text" name="coverImage" value={formData.coverImage} onChange={handleChange} placeholder="e.g. https://example.com/image.jpg" className="input input-bordered w-full focus:input-primary transition-colors" />
                        </div>

                        <div className="form-control w-full">
                            <label className="label"><span className="label-text font-semibold">Release Year</span></label>
                            <input type="number" name="releaseYear" value={formData.releaseYear} onChange={handleChange} placeholder="e.g. 1975" className="input input-bordered w-full focus:input-primary transition-colors" />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Rating (0-10)</span>
                            </label>
                            <input
                                type="number"
                                name="rating"
                                min="0"
                                max="10"
                                value={formData.rating}
                                onChange={handleChange}
                                className="input input-bordered focus:input-primary transition-colors"
                                placeholder="e.g. 8"
                            />
                        </div>
                    </div>

                    <div className="divider my-6">Preferences</div>

                    <div className="flex flex-col sm:flex-row gap-6">
                        <label className="cursor-pointer label justify-start gap-4 p-4 bg-base-200 rounded-box flex-1 border border-base-300 hover:border-primary transition-colors w-full">
                            <input type="checkbox" name="isFavorite" checked={formData.isFavorite} onChange={handleChange} className="checkbox checkbox-primary checkbox-lg" />
                            <div>
                                <span className="label-text font-bold block text-lg">Mark as Favorite</span>
                                <span className="text-sm text-base-content/60">Add a heart icon to this song.</span>
                            </div>
                        </label>
                    </div>

                    <div className="card-actions justify-end mt-10">
                        <button type="button" onClick={() => navigate(-1)} className="btn btn-ghost">Cancel</button>
                        <button type="submit" className="btn btn-primary gap-2 px-8">
                            <Save className="size-5" />
                            Save Music
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
