import { Link } from 'react-router';
import { Disc3 } from 'lucide-react';

export default function MusicNotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <Disc3 className="size-24 text-base-content/20" />
            <h2 className="text-3xl font-bold">404 - Page Not Found</h2>
            <p className="text-base-content/60">We couldn't find the page you were looking for.</p>
            <Link to="/" className="btn btn-primary mt-4">Go Home</Link>
        </div>
    );
}
