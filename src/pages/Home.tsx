import { Suspense, lazy } from 'react';
import Hero from '../components/Hero';
import SectionLoader from '../components/SectionLoader';

const Philosophy = lazy(() => import('../components/Philosophy'));
const RoomShowcase = lazy(() => import('../components/RoomShowcase'));
const Services = lazy(() => import('../components/Services'));
const PoolOasis = lazy(() => import('../components/PoolOasis'));
const Dining = lazy(() => import('../components/Dining'));
const SpaSection = lazy(() => import('../components/SpaSection'));
const CustomMap = lazy(() => import('../components/CustomMap'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const Concierge = lazy(() => import('../components/Concierge'));

export default function Home() {
    return (
        <>
            <Hero />

            <Suspense fallback={<SectionLoader />}>
                <Philosophy />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
                <RoomShowcase />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
                <Services />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
                <PoolOasis />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
                <Dining />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
                <SpaSection />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
                <CustomMap />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
                <Testimonials />
            </Suspense>

            <Suspense fallback={null}>
                <Concierge />
            </Suspense>
        </>
    );
}
