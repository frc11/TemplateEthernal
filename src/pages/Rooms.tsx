import { Suspense, lazy } from 'react';
import SectionLoader from '../components/SectionLoader';

const RoomShowcase = lazy(() => import('../components/RoomShowcase'));

export default function Rooms() {
    return (
        <div className="pt-32 bg-charcoal min-h-screen">
            <div className="px-12 mb-12">
                <h1 className="font-serif text-6xl text-cream mb-4">Our Sanctuaries</h1>
                <p className="text-sand/60 max-w-xl text-lg font-light">
                    Explore our collection of private villas and suites, each crafted to harmonize with the rhythm of the ocean and the silence of the desert.
                </p>
            </div>
            <Suspense fallback={<SectionLoader />}>
                <RoomShowcase />
            </Suspense>
        </div>
    );
}
