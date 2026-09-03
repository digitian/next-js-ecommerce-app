import type { Product } from "@/src/types/product.types";

export type MockProductEntity = Omit<Product, "category" | "sub_category"> & {
    category_id: string;
    sub_category_id: string;
};

export const products: MockProductEntity[] = [
    {
        id: "prod_1",
        slug: "sofa-camden",
        name: "Camden 3-seat Sofa",
        category_id: "cat_living",
        sub_category_id: "sub_sofas",
        brief_description: "A comfortable and stylish sofa for your living room.",
        description: "The Camden 3-seat Sofa is designed for modern living rooms, combining timeless Scandinavian aesthetics with everyday comfort. Featuring durable, high-resilience foam cushions that retain their shape and a robust solid birch frame, this sofa offers generous seating space for family and guests.\n\nCrafted with removable and machine-washable covers, it is easy to keep fresh and clean. The minimalist profile and neutral palette make it effortlessly versatile, complementing contemporary, mid-century, and traditional interiors alike.\n\nWhether you're looking to enhance your daily routine or add a statement piece to your home, this is the perfect choice. Our design philosophy focuses on minimalism, ensuring that every detail serves a purpose without unnecessary clutter.\n\n- Timeless minimal design\n- Durable, premium materials\n- Responsibly sourced and ethically manufactured\n- Designed to seamlessly integrate into any environment",
        price: 47920,
        base_price: 59900,
        discount_percentage: 20,
        rating: 4.3,
        review_count: 6,
        images: [
            { url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600", alt: "Camden Sofa front view" },
            { url: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=600", alt: "Camden Sofa side view" }
        ],
        availability: "in-stock",
        sku: "PROD_1-LIVING",
        tags: ["furniture", "home", "sofas", "living room", "karlstad"],
        specifications: [
            { label: "Dimensions", value: "Width: 205cm, Depth: 93cm, Height: 80cm" },
            { label: "Weight", value: "65 kg" },
            { label: "Materials", value: "Solid birch frame, High-resilience foam, Polyester cover" },
            { label: "Color", value: "Light Grey" },
            { label: "Assembly", value: "Assembly required" },
            { label: "Origin", value: "Designed in Sweden, Made in Poland" },
            { label: "SKU", value: "PROD_1-LIVING" },
        ],
        faqs: [
            { question: "Is this product suitable for outdoor use?", answer: "This specific model is designed primarily for indoor use. While it can withstand occasional outdoor exposure, prolonged exposure to moisture and direct sunlight is not recommended as it may damage the finish." },
            { question: "How do I claim the warranty?", answer: "All our products come with a 2-year manufacturer's warranty covering structural defects. Keep your digital receipt and contact our support team to initiate a claim." },
            { question: "Can I order custom colors or materials?", answer: "Currently, we only offer the options listed on the website. We introduce new collections seasonally, so be sure to subscribe to our newsletter for updates on new colorways and materials." },
            { question: "Do you offer bulk discounts for commercial projects?", answer: "Yes! We have a dedicated B2B team. Please reach out via our Contact page and provide details about your project to get a custom quote." }
        ],
        care_instructions: "Taking proper care of your product ensures it will last for years to come. Follow these simple guidelines to maintain its quality and finish.\n\n### General Cleaning\nWipe clean with a soft, slightly damp cloth. Always wipe in the direction of the grain (if applicable). Avoid using abrasive sponges or scouring pads, as these can scratch the surface.\n\n### Stain Removal\nFor tougher spills, use a mild soap diluted in warm water. Immediately dry the area with a clean microfiber cloth to prevent water marks. Do not let liquids sit on the surface for extended periods.\n\n### What to Avoid\n- Harsh chemical cleaners containing bleach, ammonia, or strong solvents.\n- Direct placement of hot items (always use a coaster or trivet).\n- Prolonged exposure to direct sunlight, which may cause fading or discoloration over time."
    },
    {
        id: "prod_2",
        slug: "coffee-table-isla",
        name: "Isla Coffee Table",
        category_id: "cat_living",
        sub_category_id: "sub_tables",
        brief_description: "Minimalist coffee table perfect for modern living rooms.",
        description: "The Isla Coffee Table brings minimalist elegance and everyday practicality to your living space. Its clean lines and lightweight yet sturdy construction make it easy to move and rearrange as your layout evolves.\n\nFeaturing a convenient lower shelf for magazines, remote controls, and decorative accents, it helps keep your tabletop tidy and clutter-free. Finished with a smooth, easy-to-clean surface that resists daily wear.\n\nWhether you're looking to enhance your daily routine or add a statement piece to your home, this is the perfect choice. Our design philosophy focuses on minimalism, ensuring that every detail serves a purpose without unnecessary clutter.\n\n- Timeless minimal design\n- Durable, premium materials\n- Responsibly sourced and ethically manufactured\n- Designed to seamlessly integrate into any environment",
        price: 2999,
        images: [
            { url: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&q=80&w=600", alt: "Isla Coffee Table" },
            { url: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=600", alt: "Isla Coffee Table close up" }
        ],
        availability: "in-stock",
        sku: "PROD_2-LIVING",
        tags: ["furniture", "home", "tables", "living room", "coffee table"],
        specifications: [
            { label: "Dimensions", value: "Width: 90cm, Depth: 55cm, Height: 45cm" },
            { label: "Weight", value: "8 kg" },
            { label: "Materials", value: "Particleboard, Fiberboard, Acrylic paint" },
            { label: "Color", value: "Black-brown" },
            { label: "Assembly", value: "Assembly required" },
            { label: "Origin", value: "Designed in Sweden, Made in Italy" },
            { label: "SKU", value: "PROD_2-LIVING" },
        ],
        faqs: [
            { question: "Is this product suitable for outdoor use?", answer: "This specific model is designed primarily for indoor use. While it can withstand occasional outdoor exposure, prolonged exposure to moisture and direct sunlight is not recommended as it may damage the finish." },
            { question: "How do I claim the warranty?", answer: "All our products come with a 2-year manufacturer's warranty covering structural defects. Keep your digital receipt and contact our support team to initiate a claim." }
        ],
        care_instructions: "Taking proper care of your product ensures it will last for years to come. Follow these simple guidelines to maintain its quality and finish.\n\n### General Cleaning\nWipe clean with a soft, slightly damp cloth. Always wipe in the direction of the grain (if applicable). Avoid using abrasive sponges or scouring pads, as these can scratch the surface.\n\n### Stain Removal\nFor tougher spills, use a mild soap diluted in warm water. Immediately dry the area with a clean microfiber cloth to prevent water marks. Do not let liquids sit on the surface for extended periods.\n\n### What to Avoid\n- Harsh chemical cleaners containing bleach, ammonia, or strong solvents.\n- Direct placement of hot items (always use a coaster or trivet).\n- Prolonged exposure to direct sunlight, which may cause fading or discoloration over time."
    },
    {
        id: "prod_3",
        slug: "bed-frame-bowery",
        name: "Bowery Bed Frame",
        category_id: "cat_bedroom",
        sub_category_id: "sub_beds",
        brief_description: "Sturdy bed frame with clean lines.",
        description: "The Bowery Bed Frame is a masterclass in clean, architectural simplicity. Designed with a sleek high headboard, it provides comfortable back support whether you are sitting up to read or enjoying morning coffee in bed.\n\nCrafted with real wood veneer that ages gracefully, this bed frame offers solid stability and ample under-bed space compatible with storage boxes. Its understated profile blends seamlessly into modern bedroom decors.\n\nWhether you're looking to enhance your daily routine or add a statement piece to your home, this is the perfect choice. Our design philosophy focuses on minimalism, ensuring that every detail serves a purpose without unnecessary clutter.\n\n- Timeless minimal design\n- Durable, premium materials\n- Responsibly sourced and ethically manufactured\n- Designed to seamlessly integrate into any environment",
        price: 25415,
        base_price: 29900,
        discount_percentage: 15,
        images: [
            { url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600", alt: "Bowery Bed Frame" }
        ],
        availability: "in-stock",
        sku: "PROD_3-BEDROOM",
        tags: ["furniture", "home", "beds", "bedroom", "bed frame"],
        specifications: [
            { label: "Dimensions", value: "Width: 166cm, Length: 209cm, Height: 100cm" },
            { label: "Weight", value: "45 kg" },
            { label: "Materials", value: "Particleboard, Ash veneer, Clear acrylic lacquer" },
            { label: "Color", value: "White stained oak veneer" },
            { label: "Assembly", value: "Assembly required" },
            { label: "Origin", value: "Designed in Sweden, Made in Poland" },
            { label: "SKU", value: "PROD_3-BEDROOM" },
        ],
        faqs: [
            { question: "Is this product suitable for outdoor use?", answer: "This specific model is designed primarily for indoor use. While it can withstand occasional outdoor exposure, prolonged exposure to moisture and direct sunlight is not recommended as it may damage the finish." },
            { question: "How do I claim the warranty?", answer: "All our products come with a 2-year manufacturer's warranty covering structural defects. Keep your digital receipt and contact our support team to initiate a claim." }
        ],
        care_instructions: "Taking proper care of your product ensures it will last for years to come. Follow these simple guidelines to maintain its quality and finish.\n\n### General Cleaning\nWipe clean with a soft, slightly damp cloth. Always wipe in the direction of the grain (if applicable). Avoid using abrasive sponges or scouring pads, as these can scratch the surface.\n\n### Stain Removal\nFor tougher spills, use a mild soap diluted in warm water. Immediately dry the area with a clean microfiber cloth to prevent water marks. Do not let liquids sit on the surface for extended periods.\n\n### What to Avoid\n- Harsh chemical cleaners containing bleach, ammonia, or strong solvents.\n- Direct placement of hot items (always use a coaster or trivet).\n- Prolonged exposure to direct sunlight, which may cause fading or discoloration over time."
    },
    {
        id: "prod_4",
        slug: "nightstand-windham",
        name: "Windham Nightstand",
        category_id: "cat_bedroom",
        sub_category_id: "sub_nightstands",
        brief_description: "Classic nightstand with smooth-running drawer.",
        description: "The Windham Nightstand combines classic Scandinavian craftsmanship with functional bedside storage. Made from sustainably sourced solid pine, each piece displays unique natural grain patterns and a warm, inviting feel.\n\nEquipped with a smooth-gliding drawer fitted with a pull-out stop, alongside an open lower shelf for books or baskets, it keeps all your nighttime essentials organized and within arm's reach.\n\nWhether you're looking to enhance your daily routine or add a statement piece to your home, this is the perfect choice. Our design philosophy focuses on minimalism, ensuring that every detail serves a purpose without unnecessary clutter.\n\n- Timeless minimal design\n- Durable, premium materials\n- Responsibly sourced and ethically manufactured\n- Designed to seamlessly integrate into any environment",
        price: 4999,
        images: [
            { url: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=600", alt: "Windham Nightstand" }
        ],
        availability: "in-stock",
        sku: "PROD_4-BEDROOM",
        tags: ["furniture", "home", "nightstands", "bedroom"],
        specifications: [
            { label: "Dimensions", value: "Width: 46cm, Depth: 35cm, Height: 70cm" },
            { label: "Weight", value: "10 kg" },
            { label: "Materials", value: "Solid pine, Stain, Clear acrylic lacquer" },
            { label: "Color", value: "Dark Grey" },
            { label: "Assembly", value: "Assembly required" },
            { label: "Origin", value: "Designed in Sweden, Made in Vietnam" },
            { label: "SKU", value: "PROD_4-BEDROOM" },
        ],
        faqs: [
            { question: "Is this product suitable for outdoor use?", answer: "This specific model is designed primarily for indoor use. While it can withstand occasional outdoor exposure, prolonged exposure to moisture and direct sunlight is not recommended as it may damage the finish." },
            { question: "How do I claim the warranty?", answer: "All our products come with a 2-year manufacturer's warranty covering structural defects. Keep your digital receipt and contact our support team to initiate a claim." }
        ],
        care_instructions: "Taking proper care of your product ensures it will last for years to come. Follow these simple guidelines to maintain its quality and finish.\n\n### General Cleaning\nWipe clean with a soft, slightly damp cloth. Always wipe in the direction of the grain (if applicable). Avoid using abrasive sponges or scouring pads, as these can scratch the surface.\n\n### Stain Removal\nFor tougher spills, use a mild soap diluted in warm water. Immediately dry the area with a clean microfiber cloth to prevent water marks. Do not let liquids sit on the surface for extended periods.\n\n### What to Avoid\n- Harsh chemical cleaners containing bleach, ammonia, or strong solvents.\n- Direct placement of hot items (always use a coaster or trivet).\n- Prolonged exposure to direct sunlight, which may cause fading or discoloration over time."
    },
    {
        id: "prod_5",
        slug: "kitchen-island-harlow",
        name: "Harlow Kitchen Island",
        category_id: "cat_kitchen",
        sub_category_id: "sub_islands",
        brief_description: "Provides extra storage, utility and work space.",
        description: "The Harlow Kitchen Island is the ideal freestanding centerpiece for kitchens that demand extra countertop preparation area and practical storage. Designed to bring social energy and functionality to your cooking space.\n\nFeaturing a thick solid oak veneer worktop pre-treated with hard wax oil for durability, and open shelving on one side to hold cookware, pots, or recipe books while leaving room on the other side for bar stools.\n\nWhether you're looking to enhance your daily routine or add a statement piece to your home, this is the perfect choice. Our design philosophy focuses on minimalism, ensuring that every detail serves a purpose without unnecessary clutter.\n\n- Timeless minimal design\n- Durable, premium materials\n- Responsibly sourced and ethically manufactured\n- Designed to seamlessly integrate into any environment",
        price: 40410,
        base_price: 44900,
        discount_percentage: 10,
        images: [
            { url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600", alt: "Harlow Kitchen Island" }
        ],
        availability: "in-stock",
        sku: "PROD_5-KITCHEN",
        tags: ["furniture", "home", "islands", "kitchen", "storage"],
        specifications: [
            { label: "Dimensions", value: "Width: 126cm, Depth: 77cm, Height: 90cm" },
            { label: "Weight", value: "52 kg" },
            { label: "Materials", value: "Oak veneer, Solid oak, Particleboard, Acrylic paint" },
            { label: "Color", value: "Off-white / Oak" },
            { label: "Assembly", value: "Assembly required" },
            { label: "Origin", value: "Designed in Sweden, Made in Poland" },
            { label: "SKU", value: "PROD_5-KITCHEN" },
        ],
        faqs: [
            { question: "Is this product suitable for outdoor use?", answer: "This specific model is designed primarily for indoor use. While it can withstand occasional outdoor exposure, prolonged exposure to moisture and direct sunlight is not recommended as it may damage the finish." },
            { question: "How do I claim the warranty?", answer: "All our products come with a 2-year manufacturer's warranty covering structural defects. Keep your digital receipt and contact our support team to initiate a claim." }
        ],
        care_instructions: "Taking proper care of your product ensures it will last for years to come. Follow these simple guidelines to maintain its quality and finish.\n\n### General Cleaning\nWipe clean with a soft, slightly damp cloth. Always wipe in the direction of the grain (if applicable). Avoid using abrasive sponges or scouring pads, as these can scratch the surface.\n\n### Stain Removal\nFor tougher spills, use a mild soap diluted in warm water. Immediately dry the area with a clean microfiber cloth to prevent water marks. Do not let liquids sit on the surface for extended periods.\n\n### What to Avoid\n- Harsh chemical cleaners containing bleach, ammonia, or strong solvents.\n- Direct placement of hot items (always use a coaster or trivet).\n- Prolonged exposure to direct sunlight, which may cause fading or discoloration over time."
    },
    {
        id: "prod_6",
        slug: "pendant-lamp-auburn",
        name: "Auburn Pendant Lamp",
        category_id: "cat_lighting",
        sub_category_id: "sub_lamps",
        brief_description: "Industrial style pendant lamp in dark grey.",
        description: "The Auburn Pendant Lamp draws inspiration from vintage industrial lighting found in old factories and rural workshops. With its oversized metal shade and exposed brass accents, it makes a bold architectural statement above dining tables or kitchen islands.\n\nThe wide shade directs focused, glare-free light downward, casting warm illumination across your surface while creating an intimate, cozy atmosphere.\n\nWhether you're looking to enhance your daily routine or add a statement piece to your home, this is the perfect choice. Our design philosophy focuses on minimalism, ensuring that every detail serves a purpose without unnecessary clutter.\n\n- Timeless minimal design\n- Durable, premium materials\n- Responsibly sourced and ethically manufactured\n- Designed to seamlessly integrate into any environment",
        price: 5999,
        images: [
            { url: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=600", alt: "Auburn Pendant Lamp" }
        ],
        availability: "in-stock",
        sku: "PROD_6-LIGHTING",
        tags: ["lighting", "home", "lamps", "pendant"],
        specifications: [
            { label: "Dimensions", value: "Diameter: 38cm" },
            { label: "Weight", value: "2.5 kg" },
            { label: "Materials", value: "Steel, Paint" },
            { label: "Color", value: "Dark Grey" },
            { label: "Assembly", value: "Installation required" },
            { label: "Origin", value: "Designed in Sweden, Made in China" },
            { label: "SKU", value: "PROD_6-LIGHTING" },
        ],
        faqs: [
            { question: "Is this product suitable for outdoor use?", answer: "This specific model is designed primarily for indoor use. While it can withstand occasional outdoor exposure, prolonged exposure to moisture and direct sunlight is not recommended as it may damage the finish." },
            { question: "How do I claim the warranty?", answer: "All our products come with a 2-year manufacturer's warranty covering structural defects. Keep your digital receipt and contact our support team to initiate a claim." }
        ],
        care_instructions: "Taking proper care of your product ensures it will last for years to come. Follow these simple guidelines to maintain its quality and finish.\n\n### General Cleaning\nWipe clean with a soft, slightly damp cloth. Always wipe in the direction of the grain (if applicable). Avoid using abrasive sponges or scouring pads, as these can scratch the surface.\n\n### Stain Removal\nFor tougher spills, use a mild soap diluted in warm water. Immediately dry the area with a clean microfiber cloth to prevent water marks. Do not let liquids sit on the surface for extended periods.\n\n### What to Avoid\n- Harsh chemical cleaners containing bleach, ammonia, or strong solvents.\n- Direct placement of hot items (always use a coaster or trivet).\n- Prolonged exposure to direct sunlight, which may cause fading or discoloration over time."
    },
    {
        id: "prod_7",
        slug: "table-lamp-marta",
        name: "Marta Table Lamp",
        category_id: "cat_lighting",
        sub_category_id: "sub_lamps",
        brief_description: "Classic design with a fabric shade.",
        description: "The Marta Table Lamp is one of our most beloved classic lighting designs, offering timeless sophistication for sideboards, desks, or nightstands. The brushed nickel base pairs harmoniously with a pleated textile shade.\n\nThe fabric shade diffuses a soft, warm glow that creates a restful ambiance in any room. Features a traditional pull-chain switch for effortless and satisfying operation.\n\nWhether you're looking to enhance your daily routine or add a statement piece to your home, this is the perfect choice. Our design philosophy focuses on minimalism, ensuring that every detail serves a purpose without unnecessary clutter.\n\n- Timeless minimal design\n- Durable, premium materials\n- Responsibly sourced and ethically manufactured\n- Designed to seamlessly integrate into any environment",
        price: 3749,
        base_price: 4999,
        discount_percentage: 25,
        images: [
            { url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600", alt: "Marta Table Lamp" }
        ],
        availability: "in-stock",
        sku: "PROD_7-LIGHTING",
        tags: ["lighting", "home", "lamps", "table lamp"],
        specifications: [
            { label: "Dimensions", value: "Height: 55cm, Base diameter: 15cm, Shade diameter: 22cm" },
            { label: "Weight", value: "1.8 kg" },
            { label: "Materials", value: "Steel, Nickel-plated, 100% polyester shade" },
            { label: "Color", value: "White / Nickel" },
            { label: "Assembly", value: "Minimal assembly required" },
            { label: "Origin", value: "Designed in Sweden, Made in China" },
            { label: "SKU", value: "PROD_7-LIGHTING" },
        ],
        faqs: [
            { question: "Is this product suitable for outdoor use?", answer: "This specific model is designed primarily for indoor use. While it can withstand occasional outdoor exposure, prolonged exposure to moisture and direct sunlight is not recommended as it may damage the finish." },
            { question: "How do I claim the warranty?", answer: "All our products come with a 2-year manufacturer's warranty covering structural defects. Keep your digital receipt and contact our support team to initiate a claim." }
        ],
        care_instructions: "Taking proper care of your product ensures it will last for years to come. Follow these simple guidelines to maintain its quality and finish.\n\n### General Cleaning\nWipe clean with a soft, slightly damp cloth. Always wipe in the direction of the grain (if applicable). Avoid using abrasive sponges or scouring pads, as these can scratch the surface.\n\n### Stain Removal\nFor tougher spills, use a mild soap diluted in warm water. Immediately dry the area with a clean microfiber cloth to prevent water marks. Do not let liquids sit on the surface for extended periods.\n\n### What to Avoid\n- Harsh chemical cleaners containing bleach, ammonia, or strong solvents.\n- Direct placement of hot items (always use a coaster or trivet).\n- Prolonged exposure to direct sunlight, which may cause fading or discoloration over time."
    },
    {
        id: "prod_8",
        slug: "vase-reed",
        name: "Reed Vase",
        category_id: "cat_decor",
        sub_category_id: "sub_vases",
        brief_description: "Clear glass vase, perfect for long-stemmed flowers.",
        description: "The Reed Vase is mouth-blown by skilled artisans from high-clarity glass, giving each piece subtle character and unique beauty. Its elegant flared silhouette provides balanced support for both dramatic single stems and lush flower bouquets.\n\nWhether styled on a dining table, windowsill, or console, its crystal-clear glass catches natural light and adds an airy, sophisticated touch to any setting.\n\nWhether you're looking to enhance your daily routine or add a statement piece to your home, this is the perfect choice. Our design philosophy focuses on minimalism, ensuring that every detail serves a purpose without unnecessary clutter.\n\n- Timeless minimal design\n- Durable, premium materials\n- Responsibly sourced and ethically manufactured\n- Designed to seamlessly integrate into any environment",
        price: 1999,
        images: [
            { url: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&q=80&w=600", alt: "Reed Vase" }
        ],
        availability: "in-stock",
        sku: "PROD_8-DECOR",
        tags: ["decor", "home", "vases", "glass"],
        specifications: [
            { label: "Dimensions", value: "Height: 28cm, Diameter: 15cm" },
            { label: "Weight", value: "1.2 kg" },
            { label: "Materials", value: "Glass" },
            { label: "Color", value: "Clear" },
            { label: "Assembly", value: "No assembly required" },
            { label: "Origin", value: "Designed in Sweden, Made in Poland" },
            { label: "SKU", value: "PROD_8-DECOR" },
        ],
        faqs: [
            { question: "Is this product suitable for outdoor use?", answer: "This specific model is designed primarily for indoor use. While it can withstand occasional outdoor exposure, prolonged exposure to moisture and direct sunlight is not recommended as it may damage the finish." },
            { question: "How do I claim the warranty?", answer: "All our products come with a 2-year manufacturer's warranty covering structural defects. Keep your digital receipt and contact our support team to initiate a claim." }
        ],
        care_instructions: "Taking proper care of your product ensures it will last for years to come. Follow these simple guidelines to maintain its quality and finish.\n\n### General Cleaning\nWipe clean with a soft, slightly damp cloth. Always wipe in the direction of the grain (if applicable). Avoid using abrasive sponges or scouring pads, as these can scratch the surface.\n\n### Stain Removal\nFor tougher spills, use a mild soap diluted in warm water. Immediately dry the area with a clean microfiber cloth to prevent water marks. Do not let liquids sit on the surface for extended periods.\n\n### What to Avoid\n- Harsh chemical cleaners containing bleach, ammonia, or strong solvents.\n- Direct placement of hot items (always use a coaster or trivet).\n- Prolonged exposure to direct sunlight, which may cause fading or discoloration over time."
    },
    {
        id: "prod_9",
        slug: "cushion-cover-linen",
        name: "Linen Cushion Cover",
        category_id: "cat_decor",
        sub_category_id: "sub_cushions",
        brief_description: "Soft cotton cushion cover in various colors.",
        description: "The Linen Cushion Cover is an effortless and budget-friendly way to refresh the look and feel of your sofa, armchair, or bed. Woven from 100% breathable, sustainably sourced cotton, it delivers a soft, natural texture.\n\nDesigned with a concealed zipper for easy removal and cleaning. Available in a rich selection of earthy tones that mix and match beautifully across different seasons.\n\nWhether you're looking to enhance your daily routine or add a statement piece to your home, this is the perfect choice. Our design philosophy focuses on minimalism, ensuring that every detail serves a purpose without unnecessary clutter.\n\n- Timeless minimal design\n- Durable, premium materials\n- Responsibly sourced and ethically manufactured\n- Designed to seamlessly integrate into any environment",
        price: 599,
        images: [
            { url: "https://images.unsplash.com/photo-1584347895085-f5f24f57c504?auto=format&fit=crop&q=80&w=600", alt: "Linen Cushion Cover" }
        ],
        availability: "in-stock",
        sku: "PROD_9-DECOR",
        tags: ["decor", "home", "cushions", "cotton"],
        specifications: [
            { label: "Dimensions", value: "Length: 50cm, Width: 50cm" },
            { label: "Weight", value: "0.2 kg" },
            { label: "Materials", value: "100% Cotton" },
            { label: "Color", value: "Various" },
            { label: "Assembly", value: "No assembly required" },
            { label: "Origin", value: "Designed in Sweden, Made in India" },
            { label: "SKU", value: "PROD_9-DECOR" },
        ],
        faqs: [
            { question: "Is this product suitable for outdoor use?", answer: "This specific model is designed primarily for indoor use. While it can withstand occasional outdoor exposure, prolonged exposure to moisture and direct sunlight is not recommended as it may damage the finish." },
            { question: "How do I claim the warranty?", answer: "All our products come with a 2-year manufacturer's warranty covering structural defects. Keep your digital receipt and contact our support team to initiate a claim." }
        ],
        care_instructions: "Taking proper care of your product ensures it will last for years to come. Follow these simple guidelines to maintain its quality and finish.\n\n### General Cleaning\nWipe clean with a soft, slightly damp cloth. Always wipe in the direction of the grain (if applicable). Avoid using abrasive sponges or scouring pads, as these can scratch the surface.\n\n### Stain Removal\nFor tougher spills, use a mild soap diluted in warm water. Immediately dry the area with a clean microfiber cloth to prevent water marks. Do not let liquids sit on the surface for extended periods.\n\n### What to Avoid\n- Harsh chemical cleaners containing bleach, ammonia, or strong solvents.\n- Direct placement of hot items (always use a coaster or trivet).\n- Prolonged exposure to direct sunlight, which may cause fading or discoloration over time."
    }
];
