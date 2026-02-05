export interface Testimonial {
    id: number;
    quote: string;
    author: string;
}

export const testimonials: Testimonial[] = [
    {
        id: 1,
        quote: "A place where time dissolves into the horizon. I found myself in the silence.",
        author: "Elena V., Architect"
    },
    {
        id: 2,
        quote: "The Ethereal isn't just a hotel; it is a return to a rhythm we have long forgotten.",
        author: "James C., Writer"
    },
    {
        id: 3,
        quote: "Every detail whispers of nature. A sanctuary for the weary soul.",
        author: "Sarah L., Artist"
    }
];
