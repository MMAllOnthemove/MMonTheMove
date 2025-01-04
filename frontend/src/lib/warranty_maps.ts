// Warranty mappings
const WARRANTY_MAP: any = {
    IN: {
        "75130": { system: "IW", outCode: "75131" }, // Maps to Out of Warranty: 75131
        "69476": { system: "IW", outCode: "69477" }, // Maps to Out of Warranty: 69477
    },
    OUT: {
        "75131": { system: "OOW", inCode: "75130" }, // Maps to In Warranty: 75130
        "69477": { system: "OOW", inCode: "69476" }, // Maps to In Warranty: 69476
    },
};

export default WARRANTY_MAP;
