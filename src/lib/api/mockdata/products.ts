import type { Product } from "@/src/types/product.types";

export type MockProductEntity = Omit<Product, "category" | "sub_category"> & {
    category_id: string;
    sub_category_id: string;
};

export const products: MockProductEntity[] = [
    {
        id: "prod_1",
        slug: "sofa-karlstad",
        name: "KARLSTAD 3-seat Sofa",
        category_id: "cat_living",
        sub_category_id: "sub_sofas",
        brief_description: "A comfortable and stylish sofa for your living room.",
        description: "The KARLSTAD 3-seat Sofa is designed for modern living rooms, combining timeless Scandinavian aesthetics with everyday comfort. Featuring durable, high-resilience foam cushions that retain their shape and a robust solid birch frame, this sofa offers generous seating space for family and guests.\n\nCrafted with removable and machine-washable covers, it is easy to keep fresh and clean. The minimalist profile and neutral palette make it effortlessly versatile, complementing contemporary, mid-century, and traditional interiors alike.",
        price: 47920, // 20% off from $599.00
        base_price: 59900,
        discount_percentage: 20,
        rating: 4.3,
        review_count: 6,
        images: [
            { url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600", alt: "KARLSTAD Sofa front view" },
            { url: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=600", alt: "KARLSTAD Sofa side view" }
        ]
    },
    {
        id: "prod_2",
        slug: "coffee-table-lack",
        name: "LACK Coffee Table",
        category_id: "cat_living",
        sub_category_id: "sub_tables",
        brief_description: "Minimalist coffee table perfect for modern living rooms.",
        description: "The LACK Coffee Table brings minimalist elegance and everyday practicality to your living space. Its clean lines and lightweight yet sturdy construction make it easy to move and rearrange as your layout evolves.\n\nFeaturing a convenient lower shelf for magazines, remote controls, and decorative accents, it helps keep your tabletop tidy and clutter-free. Finished with a smooth, easy-to-clean surface that resists daily wear.",
        price: 2999,
        images: [
            { url: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&q=80&w=600", alt: "LACK Coffee Table" },
            { url: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=600", alt: "LACK Coffee Table close up" }
        ]
    },
    {
        id: "prod_3",
        slug: "bed-frame-malm",
        name: "MALM Bed Frame",
        category_id: "cat_bedroom",
        sub_category_id: "sub_beds",
        brief_description: "Sturdy bed frame with clean lines.",
        description: "The MALM Bed Frame is a masterclass in clean, architectural simplicity. Designed with a sleek high headboard, it provides comfortable back support whether you are sitting up to read or enjoying morning coffee in bed.\n\nCrafted with real wood veneer that ages gracefully, this bed frame offers solid stability and ample under-bed space compatible with storage boxes. Its understated profile blends seamlessly into modern bedroom decors.",
        price: 25415, // 15% off from $299.00
        base_price: 29900,
        discount_percentage: 15,
        images: [
            { url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600", alt: "MALM Bed Frame" }
        ]
    },
    {
        id: "prod_4",
        slug: "nightstand-hemnes",
        name: "HEMNES Nightstand",
        category_id: "cat_bedroom",
        sub_category_id: "sub_nightstands",
        brief_description: "Classic nightstand with smooth-running drawer.",
        description: "The HEMNES Nightstand combines classic Scandinavian craftsmanship with functional bedside storage. Made from sustainably sourced solid pine, each piece displays unique natural grain patterns and a warm, inviting feel.\n\nEquipped with a smooth-gliding drawer fitted with a pull-out stop, alongside an open lower shelf for books or baskets, it keeps all your nighttime essentials organized and within arm's reach.",
        price: 4999,
        images: [
            { url: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=600", alt: "HEMNES Nightstand" }
        ]
    },
    {
        id: "prod_5",
        slug: "kitchen-island-tornviken",
        name: "TÖRNVIKEN Kitchen Island",
        category_id: "cat_kitchen",
        sub_category_id: "sub_islands",
        brief_description: "Provides extra storage, utility and work space.",
        description: "The TÖRNVIKEN Kitchen Island is the ideal freestanding centerpiece for kitchens that demand extra countertop preparation area and practical storage. Designed to bring social energy and functionality to your cooking space.\n\nFeaturing a thick solid oak veneer worktop pre-treated with hard wax oil for durability, and open shelving on one side to hold cookware, pots, or recipe books while leaving room on the other side for bar stools.",
        price: 40410, // 10% off from $449.00
        base_price: 44900,
        discount_percentage: 10,
        images: [
            { url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600", alt: "TÖRNVIKEN Kitchen Island" }
        ]
    },
    {
        id: "prod_6",
        slug: "pendant-lamp-hektar",
        name: "HEKTAR Pendant Lamp",
        category_id: "cat_lighting",
        sub_category_id: "sub_lamps",
        brief_description: "Industrial style pendant lamp in dark grey.",
        description: "The HEKTAR Pendant Lamp draws inspiration from vintage industrial lighting found in old factories and rural workshops. With its oversized metal shade and exposed brass accents, it makes a bold architectural statement above dining tables or kitchen islands.\n\nThe wide shade directs focused, glare-free light downward, casting warm illumination across your surface while creating an intimate, cozy atmosphere.",
        price: 5999,
        images: [
            { url: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=600", alt: "HEKTAR Pendant Lamp" }
        ]
    },
    {
        id: "prod_7",
        slug: "table-lamp-arstid",
        name: "ÅRSTID Table Lamp",
        category_id: "cat_lighting",
        sub_category_id: "sub_lamps",
        brief_description: "Classic design with a fabric shade.",
        description: "The ÅRSTID Table Lamp is one of our most beloved classic lighting designs, offering timeless sophistication for sideboards, desks, or nightstands. The brushed nickel base pairs harmoniously with a pleated textile shade.\n\nThe fabric shade diffuses a soft, warm glow that creates a restful ambiance in any room. Features a traditional pull-chain switch for effortless and satisfying operation.",
        price: 3749, // 25% off from $49.99
        base_price: 4999,
        discount_percentage: 25,
        images: [
            { url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600", alt: "ÅRSTID Table Lamp" }
        ]
    },
    {
        id: "prod_8",
        slug: "vase-pomp",
        name: "POMP Vase",
        category_id: "cat_decor",
        sub_category_id: "sub_vases",
        brief_description: "Clear glass vase, perfect for long-stemmed flowers.",
        description: "The POMP Vase is mouth-blown by skilled artisans from high-clarity glass, giving each piece subtle character and unique beauty. Its elegant flared silhouette provides balanced support for both dramatic single stems and lush flower bouquets.\n\nWhether styled on a dining table, windowsill, or console, its crystal-clear glass catches natural light and adds an airy, sophisticated touch to any setting.",
        price: 1999,
        images: [
            { url: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&q=80&w=600", alt: "POMP Vase" }
        ]
    },
    {
        id: "prod_9",
        slug: "cushion-cover-gurli",
        name: "GURLI Cushion Cover",
        category_id: "cat_decor",
        sub_category_id: "sub_cushions",
        brief_description: "Soft cotton cushion cover in various colors.",
        description: "The GURLI Cushion Cover is an effortless and budget-friendly way to refresh the look and feel of your sofa, armchair, or bed. Woven from 100% breathable, sustainably sourced cotton, it delivers a soft, natural texture.\n\nDesigned with a concealed zipper for easy removal and cleaning. Available in a rich selection of earthy tones that mix and match beautifully across different seasons.",
        price: 599,
        images: [
            { url: "https://images.unsplash.com/photo-1584347895085-f5f24f57c504?auto=format&fit=crop&q=80&w=600", alt: "GURLI Cushion Cover" }
        ]
    }
];
