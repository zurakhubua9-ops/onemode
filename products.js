const PRODUCTS = [
    {
        id: "nrove-coat",
        name: "Structured Wool Coat",
        brand: "COS",
        brandKey: "cos",
        price: 220,
        image: "assets/campaign/nrove-coat.webp",
        images: ["assets/campaign/nrove-coat.webp","assets/campaign/nrove-coat-2.webp","assets/campaign/nrove-coat-3.webp","assets/campaign/nrove-coat-4.webp"],
        categories: ["new","women","unisex","outerwear"],
        collections: ["monochrome","urban-form"],
        description: "Editorial concept: a structured wool coat built around clean proportions, soft tailoring and a modern minimal silhouette."
    },
    {
        id: "korai-hoodie",
        name: "Oversized Graphic Hoodie",
        brand: "WEEKDAY",
        brandKey: "weekday",
        price: 120,
        image: "assets/campaign/korai-hoodie.webp",
        images: ["assets/campaign/korai-hoodie.webp","assets/campaign/korai-hoodie-2.webp","assets/campaign/korai-hoodie-3.webp","assets/campaign/korai-hoodie-4.webp"],
        categories: ["new","men","women","unisex","hoodies","tops"],
        collections: ["urban-form"],
        description: "Editorial concept: an oversized everyday hoodie combining relaxed volume, graphic attitude and easy streetwear styling."
    },
    {
        id: "varel-blazer",
        name: "Double-Breasted Blazer",
        brand: "AMI PARIS",
        brandKey: "ami",
        price: 320,
        image: "assets/campaign/varel-blazer.webp",
        images: ["assets/campaign/varel-blazer.webp","assets/campaign/varel-blazer-2.webp","assets/campaign/varel-blazer-3.webp","assets/campaign/varel-blazer-4.webp"],
        categories: ["new","women","outerwear"],
        collections: ["monochrome","urban-form"],
        description: "Editorial concept: relaxed Parisian tailoring with a double-breasted shape, confident shoulders and an easy day-to-night proportion."
    },
    {
        id: "noctra-hood-jacket",
        name: "Sculptural Hood Jacket",
        brand: "MM6 MAISON MARGIELA",
        brandKey: "mm6",
        price: 280,
        image: "assets/campaign/noctra-hood-jacket.webp",
        images: ["assets/campaign/noctra-hood-jacket.webp","assets/campaign/noctra-hood-jacket-2.webp","assets/campaign/noctra-hood-jacket-3.webp","assets/campaign/noctra-hood-jacket-4.webp"],
        categories: ["new","men","unisex","outerwear"],
        collections: ["monochrome","after-dark"],
        description: "Editorial concept: an experimental hooded layer shaped by volume, utility and a deliberately deconstructed profile."
    },
    {
        id: "motel91-archive-jacket",
        name: "Relaxed Utility Jacket",
        brand: "ARKET",
        brandKey: "arket",
        price: 168,
        image: "assets/campaign/utility-960.webp",
        images: ["assets/campaign/utility-960.webp"],
        categories: ["men","unisex","outerwear"],
        collections: ["after-dark"],
        description: "Editorial concept: a practical everyday jacket with a relaxed cut, subtle utility details and a clean Scandinavian mood."
    },
    {
        id: "origin-utility-shirt",
        name: "Everyday Utility Shirt",
        brand: "COS",
        brandKey: "cos",
        price: 92,
        image: "assets/campaign/shirt-960.webp",
        images: ["assets/campaign/shirt-960.webp"],
        categories: ["new","men","women","unisex","shirts","tops"],
        collections: ["urban-form"],
        description: "Editorial concept: an understated overshirt designed for layering, practical styling and a versatile everyday wardrobe."
    },
    {
        id: "forme-pleated-trouser",
        name: "Pleated Tailored Trouser",
        brand: "ACNE STUDIOS",
        brandKey: "acne",
        price: 240,
        image: "assets/campaign/trousers-960.webp",
        images: ["assets/campaign/trousers-960.webp"],
        categories: ["new","men","women","unisex","pants"],
        collections: ["monochrome","urban-form"],
        description: "Editorial concept: wide pleated trousers with controlled volume, fluid drape and a contemporary Scandinavian attitude."
    },
    {
        id: "kinetiq-tech-shell",
        name: "Motion Tech Shell",
        brand: "SALOMON",
        brandKey: "salomon",
        price: 230,
        image: "assets/campaign/shell-960.webp",
        images: ["assets/campaign/shell-960.webp"],
        categories: ["new","men","women","unisex","outerwear"],
        collections: ["after-dark","urban-form"],
        description: "Editorial concept: a lightweight technical shell focused on movement, layering and performance-led city styling."
    },
    {
        id: "motel91-mini-bag",
        name: "Compact Mini Bag",
        brand: "GANNI",
        brandKey: "ganni",
        price: 135,
        image: "assets/campaign/bag-960.webp",
        images: ["assets/campaign/bag-960.webp"],
        categories: ["women","unisex","accessories","bags"],
        collections: ["after-dark"],
        description: "Editorial concept: a compact statement bag balancing playful proportion with a practical everyday format."
    },
    {
        id: "varel-column-dress",
        name: "Soft Column Dress",
        brand: "GANNI",
        brandKey: "ganni",
        price: 340,
        image: "assets/campaign/dress-960.webp",
        images: ["assets/campaign/dress-960.webp"],
        categories: ["new","women","dresses"],
        collections: ["monochrome"],
        description: "Editorial concept: a fluid dress with a soft column silhouette designed around movement, simplicity and visual impact."
    },
    {
        id: "noctra-asymmetric-layer",
        name: "Asymmetric Layer",
        brand: "MM6 MAISON MARGIELA",
        brandKey: "mm6",
        price: 310,
        image: "assets/campaign/layer-960.webp",
        images: ["assets/campaign/layer-960.webp"],
        categories: ["women","unisex","outerwear"],
        collections: ["after-dark","monochrome"],
        description: "Editorial concept: an asymmetric outer layer built around shadow, volume and controlled distortion."
    },
    {
        id: "forme-structured-set",
        name: "Structured City Set",
        brand: "ACNE STUDIOS",
        brandKey: "acne",
        price: 295,
        image: "assets/campaign/set-960.webp",
        images: ["assets/campaign/set-960.webp"],
        categories: ["women","unisex","outerwear"],
        collections: ["monochrome","urban-form"],
        description: "Editorial concept: a structured city set with clean geometry, deliberate proportions and a polished urban finish."
    }
];
// Alternate studio, street and colour stories in the default editorial selection.
const EDITORIAL_ORDER = ['nrove-coat','origin-utility-shirt','varel-column-dress','korai-hoodie','kinetiq-tech-shell','varel-blazer','forme-pleated-trouser','noctra-hood-jacket','motel91-mini-bag','motel91-archive-jacket','noctra-asymmetric-layer','forme-structured-set'];
PRODUCTS.sort((a,b) => EDITORIAL_ORDER.indexOf(a.id) - EDITORIAL_ORDER.indexOf(b.id));

// Refresh presentation for returning visitors without changing quantities or sizes.
function currentProductPresentation(item) {
 const current = PRODUCTS.find(product => product.id === item.id);
 return current ? {...item, image: current.image, name: current.name, brand: current.brand} : item;
}
