import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
}

export default function SEO({
    title = "The Ethereal Resort | Luxury Sustainable Hotel",
    description = "Experience the harmony of nature and luxury at The Ethereal Resort. A sustainable sanctuary designed for silence, comfort, and organic connection."
}: SEOProps) {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
        </Helmet>
    );
}
