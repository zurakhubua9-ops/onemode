const PRODUCTS = [
    {
        id: "nrove-coat",
        name: "Structured Wool Coat",
        brand: "NØRVE",
        brandKey: "nrove",
        price: 220,
        image: "assets/nrove-coat.jpg",
        images: [
            "assets/nrove-coat.jpg",
            "assets/nrove-coat-2.png",
            "assets/nrove-coat-3.png",
            "assets/nrove-coat-4.png"
        ],
        categories: ["new", "women", "unisex", "outerwear"],
        collections: ["monochrome", "urban-form"],
        description:
            "A structured wool coat defined by clean lines, oversized proportions and a restrained Scandinavian silhouette."
    },
    {
        id: "korai-hoodie",
        name: "Oversized Graphic Hoodie",
        brand: "KØRAI",
        brandKey: "korai",
        price: 120,
        image: "assets/korai-hoodie.jpg",
        images: [
            "assets/korai-hoodie.jpg",
            "assets/korai-hoodie-2.png",
            "assets/korai-hoodie-3.png",
            "assets/korai-hoodie-4.png"
        ],
        categories: ["new", "men", "women", "unisex", "hoodies", "tops"],
        collections: ["urban-form"],
        description:
            "An oversized streetwear hoodie balancing relaxed proportions with a graphic contemporary identity."
    },
    {
        id: "varel-blazer",
        name: "Double-Breasted Blazer",
        brand: "VAREL",
        brandKey: "varel",
        price: 320,
        image: "assets/varel-blazer.jpg",
        images: [
            "assets/varel-blazer.jpg",
            "assets/varel-blazer-2.png",
            "assets/varel-blazer-3.png",
            "assets/varel-blazer-4.png"
        ],
        categories: ["new", "women", "outerwear"],
        collections: ["monochrome", "urban-form"],
        description:
            "A contemporary double-breasted blazer with sharp tailoring, strong shoulders and a refined Parisian silhouette."
    },
    {
        id: "noctra-hood-jacket",
        name: "Sculptural Hood Jacket",
        brand: "NOCTRA",
        brandKey: "noctra",
        price: 280,
        image: "assets/noctra-hood-jacket.jpg",
        images: [
            "assets/noctra-hood-jacket.jpg",
            "assets/noctra-hood-jacket-2.png",
            "assets/noctra-hood-jacket-3.png",
            "assets/noctra-hood-jacket-4.png"
        ],
        categories: ["new", "men", "unisex", "outerwear"],
        collections: ["monochrome", "after-dark"],
        description:
            "A sculptural hooded jacket inspired by Berlin avant-garde design, combining technical volume with a dark minimalist profile."
    },
    {
        id: "motel91-archive-jacket",
        name: "Archive Utility Jacket",
        brand: "MOTEL 91",
        brandKey: "motel91",
        price: 168,
        image: "assets/category-men.jpg",
        images: ["assets/category-men.jpg"],
        categories: ["men", "unisex", "outerwear"],
        collections: ["after-dark"],
        description:
            "A relaxed utility jacket with an archive-inspired cut, washed attitude and an easy 1990s London silhouette."
    },
    {
        id: "origin-utility-shirt",
        name: "Organic Utility Shirt",
        brand: "ORIGIN STANDARD",
        brandKey: "origin",
        price: 92,
        image: "assets/category-unisex.jpg",
        images: ["assets/category-unisex.jpg"],
        categories: ["new", "men", "women", "unisex", "shirts", "tops"],
        collections: ["urban-form"],
        description:
            "A clean everyday overshirt built around responsible materials, practical proportions and understated utility."
    },
    {
        id: "forme-pleated-trouser",
        name: "Pleated Tailored Trouser",
        brand: "FORME/01",
        brandKey: "forme01",
        price: 240,
        image: "assets/tailored.png",
        images: ["assets/tailored.png"],
        categories: ["new", "men", "women", "unisex", "pants"],
        collections: ["monochrome", "urban-form"],
        description:
            "Wide pleated trousers with architectural volume, precise drape and a restrained Tokyo tailoring language."
    },
    {
        id: "kinetiq-tech-shell",
        name: "Motion Tech Shell",
        brand: "KINETIQ",
        brandKey: "kinetiq",
        price: 230,
        image: "assets/techwear.png",
        images: ["assets/techwear.png"],
        categories: ["new", "men", "women", "unisex", "outerwear"],
        collections: ["after-dark", "urban-form"],
        description:
            "A lightweight technical shell shaped for movement, layering and fast transitions through the city."
    },
    {
        id: "motel91-mini-bag",
        name: "Archive Mini Bag",
        brand: "MOTEL 91",
        brandKey: "motel91",
        price: 135,
        image: "assets/category-accessories.jpg",
        images: ["assets/category-accessories.jpg"],
        categories: ["women", "unisex", "accessories", "bags"],
        collections: ["after-dark"],
        description:
            "A compact archive-inspired bag with a nostalgic proportion and a clean finish designed for everyday carry."
    },
    {
        id: "varel-column-dress",
        name: "Soft Column Dress",
        brand: "VAREL",
        brandKey: "varel",
        price: 340,
        image: "assets/category-women.avif",
        images: ["assets/category-women.avif"],
        categories: ["new", "women", "dresses"],
        collections: ["monochrome"],
        description:
            "A fluid column dress balancing softness and structure with a quiet contemporary Parisian mood."
    },
    {
        id: "noctra-asymmetric-layer",
        name: "Asymmetric Layer",
        brand: "NOCTRA",
        brandKey: "noctra",
        price: 310,
        image: "assets/avant-garde.png",
        images: ["assets/avant-garde.png"],
        categories: ["women", "unisex", "outerwear"],
        collections: ["after-dark", "monochrome"],
        description:
            "An asymmetric outer layer built around shadow, volume and controlled distortion for a distinctly avant-garde profile."
    },
    {
        id: "forme-structured-set",
        name: "Structured City Set",
        brand: "FORME/01",
        brandKey: "forme01",
        price: 295,
        image: "assets/spotlight-forme.png",
        images: ["assets/spotlight-forme.png"],
        categories: ["women", "unisex", "outerwear"],
        collections: ["monochrome", "urban-form"],
        description:
            "A structured city set with clean geometry, deliberate proportions and a polished urban tailoring finish."
    }
];
