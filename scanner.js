// DOM Elements
const scanBtn = document.getElementById('scanBtn');
const scanModal = document.getElementById('scanModal');
const resultsModal = document.getElementById('resultsModal');
const closeButtons = document.querySelectorAll('.close');
const scanForm = document.getElementById('scanForm');
const categorySelect = document.getElementById('category');
const subcategoryGroup = document.getElementById('subcategoryGroup');
const medicineInputGroup = document.getElementById('medicineInputGroup');
const imageUploadGroup = document.getElementById('imageUploadGroup');
const medicineNameInput = document.getElementById('medicineName');
const imageUpload = document.getElementById('imageUpload');
const harmlessList = document.getElementById('harmlessList');
const harmfulList = document.getElementById('harmfulList');
const toxicityMessage = document.getElementById('toxicityMessage');
const medicineResult = document.getElementById('medicineResult');
const ingredientResult = document.getElementById('ingredientResult');
const medicineAlternative = document.getElementById('medicineAlternative');
const submitBtn = document.getElementById('submitBtn');
const medicineSubcategory = document.getElementById('medicineSubcategory');
const medicineSubcategoryGroup = document.getElementById('medicineSubcategoryGroup');

// State management
let isProcessing = false;

// Database
// Database
const ingredientDatabase = {
    bodycare: {
        harmful: [
            "Sodium Benzoate", "Parabens", "Formaldehyde", "Sulfates", 
            "Phthalates", "Triclosan", "BHA", "Sodium Lauryl Sulfate (SLS)", 
            "Sodium Laureth Sulfate (SLES)", "Ammonium Lauryl Sulfate", 
            "Methylparaben", "Propylparaben", "Butylparaben", "Ethylparaben", 
            "Isobutylparaben", "DMDM Hydantoin", "Diazolidinyl Urea", 
            "Imidazolidinyl Urea", "Quaternium-15", 
            "2-Bromo-2-Nitropropane-1,3-Diol", "Formaldehyde", "Triclosan", 
            "Triclocarban", "Fragrance / Parfum (Synthetic)", 
            "Diethyl Phthalate (DEP)", "Dibutyl Phthalate (DBP)", 
            "Dimethyl Phthalate (DMP)", "Mineral Oil", "Petrolatum", 
            "Paraffin Wax", "Isopropyl Alcohol", 
            "Denatured Alcohol (Alcohol Denat.)", "SD Alcohol 40", 
            "PEG-100 Stearate", "PEG-40 Hydrogenated Castor Oil", 
            "PEG-20 Sorbitan Cocoate", "Propylene Glycol", "Butylene Glycol", 
            "Phenoxyethanol", "Cyclopentasiloxane", "Cyclohexasiloxane", 
            "Dimethicone", "Trimethicone", "Oxybenzone", "Octinoxate", 
            "Homosalate", "Avobenzone", "Retinyl Palmitate", 
            "BHA (Butylated Hydroxyanisole)", "BHT (Butylated Hydroxytoluene)", 
            "Toluene", "Talc", "Aluminum Chlorohydrate", 
            "Aluminum Zirconium Tetrachlorohydrex Gly", "FD&C Red 40", 
            "FD&C Yellow 5", "D&C Red 33", "Coal Tar Dyes", "Lauramide DEA", 
            "Cocamide DEA", "Monoethanolamine (MEA)", "Triethanolamine (TEA)", 
            "Artificial Musk", "Methylisothiazolinone (MIT)", 
            "Methylchloroisothiazolinone (CMIT)", "Tetrasodium EDTA", 
            "Disodium EDTA", "Lanolin (low grade)", "Chlorphenesin", 
            "Stearalkonium Chloride", "Sodium Borate (Borax)", 
            "Polysorbate 20", "1,4-Dioxane", "Nitrosamines", 
            "Ethoxylated Compounds", "Siloxanes", "Petroleum Distillates", 
            "Isobutene", "Iodopropynyl Butylcarbamate (IPBC)", 
            "Cetrimonium Chloride", "Chloroxylenol", "Sodium Tallowate", 
            "Potassium Tallowate", "Isopropyl Myristate", "Myristyl Myristate", 
            "Palmitic Acid (comedogenic)", "Lanolin Alcohol", 
            "Sodium C14-16 Olefin Sulfonate", "Ammonium Laureth Sulfate", 
            "Steareth-20", "Hydroquinone", "Resorcinol", "Hexyl Cinnamal", 
            "Linalool", "Limonene", "Citral", "Geraniol", "Eugenol", 
            "Cinnamyl Alcohol", "Cinnamal", "Benzyl Alcohol (synthetic)", 
            "Benzyl Benzoate", "Benzyl Salicylate", "Coumarin", 
            "Alpha-Isomethyl Ionone", "Isoeugenol", "Octocrylene", 
            "Methyl Methacrylate", "Ethyl Methacrylate", "Acrylates Copolymer", 
            "Polyacrylamide", "Polyquaternium-7", "Polyquaternium-10", 
            "Polyethylene (microbeads)", "Polymethyl Methacrylate (PMMA)", 
            "Butyl Methoxydibenzoylmethane", "Isobutylparaben", 
            "Distearyldimonium Chloride", "Sodium Polyacrylate", 
            "Silica (nano form)", "Talc (inhalable)", "DEA-Cetyl Phosphate", 
            "Sodium Coco-Sulfate", "Isododecane", "Isohexadecane", 
            "Isoeicosane", "Pentaerythrityl Tetraisostearate", 
            "Phenyl Trimethicone", "Vinyl Dimethicone/Methicone Crosspolymer", 
            "Styrene/Acrylates Copolymer", "Ammonium Polyacrylate", 
            "Polyvinyl Alcohol", "Cocamidopropyl Betaine", "PEG-8 Beeswax", 
            "PEG-6 Caprylic/Capric Glycerides", 
            "PEG-200 Hydrogenated Glyceryl Palmate", 
            "Triethanolamine Lauryl Sulfate", "Ammonium Chloride", 
            "Steareth-2", "Sodium Chloride (high %)", 
            "Magnesium Aluminum Silicate (low grade)", "Synthetic Beeswax", 
            "Petroleum Jelly (unrefined)", "Hydrogenated Polyisobutene", 
            "Ethylene Brassylate", "Galaxolide", "Tonqualide", "Cashmeran", 
            "Methoxy PEG/PPG-7/3 Aminopropyl Dimethicone", "Lauramide MEA", 
            "Isopropyl Lanolate", "Hexylene Glycol", "PPG-14 Butyl Ether", 
            "PEG-12 Dimethicone", "Polyquaternium-39", "Polyquaternium-22", 
            "Polysorbate 60", "Polysorbate 80", "Sodium Lauroyl Sarcosinate", 
            "Laureth-23", "Laureth-7", "Oleth-5", "Oleth-10", 
            "PPG-2 Methyl Ether", "PPG-15 Stearyl Ether", "Amodimethicone", 
            "Trideceth-12", "Behenoxy Dimethicone", 
            "Disodium Laureth Sulfosuccinate", 
            "Sodium Methyl Cocoyl Taurate", 
            "Sodium Lauroyl Methyl Isethionate", "Benzalkonium Chloride", 
            "Benzethonium Chloride", "Cetrimide", "Cetalkonium Chloride", 
            "Benzyl Cinnamate", "Benzoic Acid (high %)", 
            "Ethylhexyl Methoxycinnamate", "Diethanolamine (DEA)", 
            "Monoethanolamine (MEA)", "Cocamide MEA", 
            "PEG-120 Methyl Glucose Dioleate", 
            "PPG-3 Benzyl Ether Myristate", 
            "PPG-9 Diethylmonium Chloride", 
            "Sodium Isostearoyl Lactylate", 
            "Hydroxyisohexyl 3-Cyclohexene Carboxaldehyde", "Isoceteth-20", 
            "Sodium Lauriminodipropionate", 
            "Disodium Lauryl Sulfosuccinate", 
            "Sodium Cocoyl Isethionate (high %)", "Sodium Myreth Sulfate", 
            "Isosteareth-10", "Oleth-3 Phosphate", "Laureth-4", 
            "Steareth-21", "Sodium Styrene/Acrylates Copolymer", 
            "Methyl Dibromo Glutaronitrile", "Dimethiconol", "Laureth-9", 
            "Ethoxydiglycol", "C12-15 Alkyl Benzoate", 
            "Hydrogenated Styrene/Isoprene Copolymer", "Caprylyl Methicone", 
            "Methicone", "Silicone Quaternium-3", "Sodium Sulfite", 
            "Hydroxyethyl Acrylate/Sodium Acryloyldimethyl Taurate Copolymer", 
            "Poloxamer 407", "Poloxamer 188", "PPG-26-Buteth-26", 
            "PEG-40 Hydrogenated Castor Oil", "Benzophenone-3", 
            "Benzophenone-4", "Benzophenone-8", "Ethylparaben Sodium", 
            "Polyquaternium-28", "Potassium Sorbate (in excess)", 
            "Dimethyl Stearamine", "Sodium Silicate", "Calcium Silicate", 
            "Sodium Aluminum Phosphate"
        ],
        harmless: [
            "Aloe Vera", "Shea Butter", "Coconut Oil", "Jojoba Oil", 
            "Tocopherols", "Glycerin", "Chamomile Extract", "Glycerin", 
            "Aloe Vera", "Shea Butter", "Cocoa Butter", "Hyaluronic Acid", 
            "Panthenol", "Coconut Oil", "Jojoba Oil", "Argan Oil", 
            "Olive Oil", "Almond Oil", "Vitamin E", "Vitamin C", 
            "Niacinamide", "Green Tea Extract", "Licorice Root Extract", 
            "Chamomile Extract", "Cucumber Extract", "Calendula Extract", 
            "Allantoin", "Centella Asiatica Extract", "Squalane", 
            "Sodium PCA", "Decyl Glucoside", "Coco Glucoside", 
            "Xanthan Gum", "Caprylic/Capric Triglyceride", "Lactic Acid", 
            "Stearic Acid", "Cetyl Alcohol", "Cetearyl Alcohol", 
            "Sorbitan Olivate", "Polyglyceryl-3 Methylglucose Distearate", 
            "Disodium EDTA", "Tocopheryl Acetate", "Urea", "Oat Extract", 
            "Betaine", "Gluconolactone", "Bisabolol", "Propanediol", 
            "Sodium Lactate", "Glycerol Stearate", "Sunflower Seed Oil", 
            "Malic Acid", "Citric Acid", "Rose Water", "Lavender Water", 
            "Sucrose", "Kaolin Clay", "Sunflower Seed Extract", 
            "Avocado Oil", "Marula Oil", "Macadamia Seed Oil", 
            "Evening Primrose Oil", "Mango Seed Butter", "Kukui Nut Oil", 
            "Tamanu Oil", "Baobab Oil", "Passionfruit Seed Oil", 
            "Rice Bran Oil", "Moringa Oil", "Meadowfoam Seed Oil", 
            "Candelilla Wax", "Carnauba Wax", "Beeswax", "Castor Oil", 
            "Pomegranate Seed Oil", "Rosehip Oil", "Turmeric Root Extract", 
            "Licorice Leaf Extract", "Witch Hazel Extract", 
            "Willow Bark Extract", "Ginkgo Biloba Extract", 
            "Sea Buckthorn Oil", "Blueberry Extract", "Papaya Extract", 
            "Pineapple Extract", "Pumpkin Seed Oil", "Caffeine", 
            "Zinc PCA", "Salicyloyl Phytosphingosine", "Soybean Oil", 
            "Neem Oil", "Eucalyptus Oil", "Tea Tree Leaf Water", 
            "Blackberry Extract", "Raspberry Seed Oil", "Oat Lipid", 
            "Apple Extract", "Sugarcane Extract", "Cabbage Extract", 
            "Tomato Extract", "Pea Extract", "Aloe Ferox Extract", 
            "Blackcurrant Seed Oil", "Cactus Extract", "Red Algae Extract", 
            "Bamboo Extract", "Watermelon Seed Oil", "Broccoli Seed Oil", 
            "Sacha Inchi Oil", "Flaxseed Oil", "Tamari Extract", 
            "Yogurt Extract", "Milk Protein", "Honey Extract", 
            "Royal Jelly Extract", "Propolis Extract", 
            "Fermented Rice Water", "Rice Extract", "Soy Extract", 
            "Almond Protein", "Wheat Germ Oil", "Barley Extract", 
            "Beta-Glucan", "Lecithin", "Inulin", "Trehalose", 
            "Mannitol", "Sodium Hyaluronate Crosspolymer", 
            "Hydroxyethyl Urea", "Caprylyl Glycol", "Ethylhexylglycerin", 
            "Isosorbide Dicaprylate", "Glucomannan", "Irish Moss Extract", 
            "Lithothamnion Extract", "Seaweed Extract", 
            "Spirulina Extract", "Algae Extract", "Sea Kelp Extract", 
            "Tartaric Acid", "Gluconic Acid", 
            "Hydroxypropyl Starch Phosphate", "Diheptyl Succinate", 
            "Hydroxypropyl Cyclodextrin", "Hydroxyacetophenone", 
            "Pullulan", "Agar", "Bentonite Clay", "Rhassoul Clay", 
            "Charcoal Powder", "Silk Amino Acids", "Hydrolyzed Collagen", 
            "Hydrolyzed Elastin", "Sericin", "Luffa", "Pumice", 
            "Corn Starch", "Tapioca Starch", "Potato Starch", 
            "Arrowroot Powder", "Rice Powder", "Oat Flour", "Corn Flour", 
            "Banana Extract", "Strawberry Extract", "Kiwi Extract", 
            "Orange Peel Extract", "Lemon Peel Extract", 
            "Grapefruit Extract", "Cranberry Extract", "Peach Extract", 
            "Guava Extract", "Mulberry Extract", "Fig Extract", 
            "Apricot Kernel Oil", "Date Extract", "Lotus Flower Extract", 
            "Peony Extract", "Jasmine Extract", "Camellia Japonica Oil", 
            "Sunflower Petal Extract", "Passionflower Extract", 
            "Water Lily Extract", "Honeysuckle Extract", "Orchid Extract", 
            "Rosemary Extract", "Sage Extract", "Thyme Extract", 
            "Basil Extract", "Peppermint Water", "Spearmint Extract", 
            "Lemon Balm Extract", "Clary Sage Extract", "Yarrow Extract", 
            "Borage Seed Oil", "Evening Primrose Extract", 
            "Calendula Flower Oil", "Tsubaki Oil", "Meadowfoam Extract", 
            "Viola Tricolor Extract", "Angelica Root Extract", 
            "Burdock Root Extract", "Marshmallow Root Extract", 
            "Chamomile Flower Oil", "Mallow Extract", "Gotu Kola Water", 
            "Elderflower Extract", "Rice Milk", "Coconut Milk", 
            "Soy Milk", "Oat Milk", "Pumpkin Extract", 
            "Carrot Root Extract", "Cucumber Water", "Aloe Leaf Water", 
            "Bamboo Water", "Rose Hydrosol", "Lavender Hydrosol", 
            "Neroli Hydrosol", "Chamomile Hydrosol", "Witch Hazel Water", 
            "Apple Cider Vinegar", "Beta-Carotene", "Astaxanthin", 
            "Coenzyme Q10", "Resveratrol", "Ferulic Acid", "Pycnogenol", 
            "Ellagic Acid", "Lipoic Acid", "Glutathione", 
            "Superoxide Dismutase", "Tamarind Extract", "Amla Extract", 
            "Shikakai Extract", "Bhringraj Extract", "Brahmi Extract", 
            "Manjistha Extract", "Sandalwood Extract", "Saffron Extract", 
            "Vetiver Root Water", "Indian Lotus Extract", "Neem Leaf Water", 
            "Tulsi Extract", "Ashwagandha Extract", "Turmeric Hydrosol", 
            "Milk Thistle Extract", "Artichoke Leaf Extract", 
            "Apple Stem Cell Extract", "Edelweiss Extract", 
            "Sugar Maple Extract", "Sugar Beet Extract", 
            "Baikal Skullcap Extract", "Green Coffee Extract", 
            "Licorice Hydrosol", "Aloe Ferment Filtrate", "Kombucha Extract"
        ]
    },
    food: {
        harmful: ["Monosodium Glutamate", "High Fructose Corn Syrup", "Artificial Colors",
             "Sodium Nitrite", "Trans Fats", "Aspartame", "Tartrazine",
             "Monosodium Glutamate", "MSG", "High Fructose Corn Syrup", "Aspartame", "Acesulfame-K",
             "Saccharin", "Sucralose", "Sodium Benzoate", "Potassium Bromate", "BHA", "BHT", "Sodium Nitrite",
             "Sodium Nitrate", "Aluminium Compounds", "Caramel Colour Type IV", "Synthetic Food Colours",
             "Propyl Gallate", "Titanium Dioxide", "Polysorbates", "Propylene Glycol", "Sodium Metabisulfite",
             "Parabens", "Calcium Propionate", "Benzoic Acid", "Phosphoric Acid", "Sodium Hexametaphosphate",
             "Refined Palm Oil", "Partially Hydrogenated Oils", "Synthetic Vanillin", "TBHQ", "Artificial Butter Flavour",
             "Disodium Inosinate", "Disodium Guanylate", "Silicon Dioxide", "Synthetic Antioxidants", "Caffeine",
             "Dimethylpolysiloxane", "EDTA", "Ammonium Bicarbonate", "Artificial Fruit Flavours", "Neotame",
             "Cyclamate", "Butylated Starch", "Modified Starch", "Hydroxypropyl Methylcellulose",
             "Sodium Aluminium Sulphate", "Artificial Smoked Flavour", "Sodium Stearoyl Lactylate",
             "Calcium Stearoyl Lactylate", "Ethyl Maltol", "Ethylene Oxide", "Azodicarbonamide", "Artificial Meat Flavour",
             "Propylene Glycol Monoesters", "Corn Syrup Solids", "Refined Sugar", "Refined Flour", "Excess Salt",
             "Sodium Polyphosphate", "Dimethyl Dicarbonate", "Artificial Colours", "FD&C Dyes", "Artificial Flavours",
             "Synthetic Wax Coating", "PEG", "Benzoyl Peroxide", "Artificial Chocolate Flavour", "Artificial Ghee Flavour",
             "Artificial Strawberry Flavour", "Synthetic Mango Flavour", "Artificial Banana Flavour", "Artificial Rose Flavour"
        ],
        harmless: ["Stevia", "Sea Salt", "Honey", "Olive Oil", "Turmeric", "Cinnamon", "Vanilla Extract",
            "Ginger", "Garlic", "Cayenne Pepper", "Black Pepper", "Water", "Salt", "Sugar", "Citric Acid", 
            "Ascorbic Acid", "Tocopherol", "Natural Flavours", "Vinegar", "Guar Gum", "Xanthan Gum",
            "Pectin", "Lecithin", "Baking Soda", "Yeast", "Corn Starch", "Potato Starch", "Rice Flour",
            "Gelatin", "Vegetable Oil", "Milk Solids", "Skimmed Milk Powder", "Malt Extract", "Barley Malt",
            "Cocoa Powder", "Calcium Carbonate", "Magnesium Carbonate", "Sodium Citrate", "Potassium Sorbate",
            "Calcium Lactate", "Mono and Diglycerides", "Beta-Carotene", "Annatto", "Turmeric Extract",
            "Paprika Extract", "Riboflavin", "Gum Arabic", "Sorbitol", "Stevia Extract", "Carrageenan",
            "Soya Protein Isolate", "Whey Protein", "Enzymes", "Rice Bran Oil", "Olive Oil", "Canola Oil",
            "Dry Herbs", "Spices", "Glycerin", "Sodium Alginate", "Calcium Alginate", "Ethyl Vanillin", "Vanillin",
            "Lactic Acid", "Malic Acid", "Tartaric Acid", "Invert Sugar Syrup", "Maltodextrin", "Dextrose",
            "Calcium Phosphate", "Sodium Ascorbate", "Sodium Bicarbonate", "Tapioca Starch", "Arrowroot Powder",
            "Chicory Root Fiber", "Inulin", "Beta-Glucan", "Plant Cellulose", "Fruit Juice Concentrates",
            "Coconut Milk Powder", "Vegetable Gums", "Apple Cider Vinegar", "Cocoa Butter", "Buttermilk Powder",
            "Soya Lecithin", "Bamboo Fiber", "Almond Meal", "Wheat Germ", "Palm Stearin", "Palm Kernel Oil", "Coconut Sugar",
            "Maple Syrup", "Honey", "Sodium Lactate", "Calcium Citrate", "Isomalt", "Polydextrose", "Hydrolyzed Vegetable Protein",
            "Yeast Extract", "Wheat Fiber", "Bran", "Potassium Chloride", "Sodium Carboxymethyl Cellulose", "Soy Flour",
            "Pea Protein", "Chickpea Protein", "Rice Syrup", "Brown Rice Syrup", "Sea Salt", "Desiccated Coconut",
            "Sunflower Lecithin", "Pumpkin Seed Oil", "Hibiscus Extract", "Fruit Pulp", "Date Syrup", "Date Paste",
            "Arrowroot Flour", "Psyllium Husk", "Natural Smoke Flavour", "Rice Protein", "Vegetable Purees", "Lemon Zest",
            "Orange Peel Extract", "Flaxseed Powder", "Chia Seeds", "Coconut Flour", "Tamarind Extract", "Natural Colours",
            "Apple Cider Powder", "Vegetable Broth Powder", "Cucumber Extract", "Tomato Powder", "Coriander Powder",
            "Fennel Seed Extract", "Mint Leaf Powder", "Cardamom Extract", "Clove Oil", "Fenugreek Extract",
            "Curry Leaf Powder", "Spirulina Powder", "Beet Juice Extract", "Pumpkin Powder", "Banana Powder",
            "Ragi Flour", "Bajra Flour", "Sattu", "Amla Powder", "Cumin Powder", "Black Salt", "Tamarind Paste",
            "Garlic Powder", "Onion Powder", "Dry Mango Powder", "Mustard Powder", "Desi Ghee", "Butter", "Paneer Powder",
            "Milk Fat", "Milk Cream", "Jaggery", "Coconut Oil", "Wheat Flour", "Whole Wheat Flour", "Barley Malt Extract",
            "Edible Starch", "Lemon Juice Concentrate", "Refined Soybean Oil", "Sunflower Oil", "Turmeric Oil", "Nutmeg Powder",
            "Cinnamon Powder", "Ginger Powder", "Green Tea Extract", "Licorice Extract", "Ashwagandha Extract", "Tulsi Extract",
            "Giloy Extract", "Curry Masala", "Mint Oil", "Coconut Water Powder", "Basil Seed", "Saffron Extract",
            "Rose Petal Powder", "Lotus Seed Powder", "Jackfruit Powder", "Guava Pulp", "Natural Fruit Concentrates",
            "Steviol Glycosides", "Gum Arabic", "Locust Bean Gum", "Natural Rose Extract", "Cocoa Powder", "Vanilla Extract",
            "Peppermint Extract"
        ]
    },
    medicine: {
    alternatives: {
        "combiflam": "Dashmool Kwath",
        "crocin": "Guduchi Ghanvati",
        "diclofenac": "Vat Gajankush Ras",
        "digene": "Avipattikar Churna",
        "gelusil": "Kaam Dhuda Ras",
        "loperamide": "Kutajghan Vati",
        "meftal-spas": "Shool Gajendra Ras",
        "paracetamol": "Mahasudarshan Churna",
        "probiotic": "Takra (Chaas) with Jeera",
        "saridon": "Brahmi Vati",
        "strepsils": "Lavangadi Vati",
        "vicks": "Tulsi Ginger Syrup",
        "vicks-vaporub": "Amritdhara",
        "volini": "Dhanwantaram Oil"
    }
}
};

// Event Listeners
scanBtn.addEventListener('click', () => {
    scanModal.style.display = 'block';
    // Reset form when opening
    categorySelect.value = '';
    handleCategoryChange({ target: categorySelect });
});

closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        scanModal.style.display = 'none';
        resultsModal.style.display = 'none';
    });
});

window.addEventListener('click', (e) => {
    if (e.target === scanModal || e.target === resultsModal) {
        scanModal.style.display = 'none';
        resultsModal.style.display = 'none';
    }
});

categorySelect.addEventListener('change', handleCategoryChange);

scanForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const category = categorySelect.value;
    
    if (!category) {
        alert('Please select a category first');
        return;
    }

    if (category === 'medicine') {
        processMedicine();
    } else {
        const imageFile = imageUpload.files[0];
        if (!imageFile) {
            alert('Please upload an image of the ingredient list');
            return;
        }
        await processImage(imageFile, category);
    }
    
    scanModal.style.display = 'none';
    resultsModal.style.display = 'block';
});

// Core Functions
function handleCategoryChange(e) {
    const category = e.target.value;
    const isMedicine = category === 'medicine';
    
    // Reset all groups first
    subcategoryGroup.style.display = 'none';
    medicineSubcategoryGroup.style.display = 'none';
    medicineInputGroup.style.display = 'none';
    imageUploadGroup.style.display = 'none';
    
    if (isMedicine) {
        medicineSubcategoryGroup.style.display = 'block';
        submitBtn.textContent = 'Show Alternative';
    } else if (category) {
        subcategoryGroup.style.display = 'block';
        imageUploadGroup.style.display = 'block';
        submitBtn.textContent = 'Check the List';
        
        // Update subcategory options
        document.querySelectorAll('#subcategory option').forEach(option => {
            option.style.display = (option.className === category || option.value === '') ? 'block' : 'none';
        });
        document.getElementById('subcategory').value = '';
    } else {
        // No category selected (initial state)
        submitBtn.textContent = 'Check the List';
    }
}

function processMedicine() {
    const medicineName = medicineSubcategory.value;
    
    if (!medicineName) {
        alert('Please select a medicine');
        return;
    }
    
    const alt = ingredientDatabase.medicine.alternatives[medicineName];
    ingredientResult.style.display = 'none';
    medicineResult.style.display = 'block';
    
    const displayName = document.getElementById('medicineSubcategory')
        .options[document.getElementById('medicineSubcategory').selectedIndex].text;
    
    medicineAlternative.textContent = alt 
        ? `Alternative for ${displayName}: ${alt}`
        : `Alternative not found for ${displayName}`;
}

async function processImage(imageFile, category) {
    if (isProcessing) return;
    isProcessing = true;
    
    showLoadingState();
    
    try {
        const { data: { text } } = await Tesseract.recognize(
            imageFile,
            'eng',
            {
                logger: m => console.log(m),
                tessedit_pageseg_mode: 6,
                tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-(),.% ',
                preserve_interword_spaces: 1
            }
        );
        
        if (!text.trim()) {
            showErrorState("No text detected. Please try a clearer image.");
            return;
        }
        
        const ingredients = extractIngredients(text);
        analyzeIngredients(ingredients, category);
    } catch (error) {
        console.error('OCR Error:', error);
        showErrorState("Error processing image. Please try again.");
    } finally {
        isProcessing = false;
    }
}

function showLoadingState() {
    harmlessList.innerHTML = '<div class="loading-spinner"></div>';
    harmfulList.innerHTML = '';
    toxicityMessage.textContent = 'Analyzing ingredients...';
    ingredientResult.style.display = 'block';
    medicineResult.style.display = 'none';
}

function showErrorState(message = "Error processing image. Please try a clearer photo.") {
    harmlessList.innerHTML = `<li style="color:red">${message}</li>`;
    harmfulList.innerHTML = '';
    toxicityMessage.textContent = '';
}

function extractIngredients(text) {
    return [...new Set(
        text.replace(/\b(ingredients?|contains?|and|or)\b/gi, ' ')
           .replace(/[0-9%()\[\]{}*•·]/g, ' ')
           .replace(/\s+/g, ' ')
           .trim()
           .split(/[,;]|\s\band\b\s|\s\bor\b\s|\n/)
           .map(item => item.trim().replace(/^[-., ]+|[-., ]+$/g, ''))
           .filter(item => item.length > 2)
    )];
}

function analyzeIngredients(ingredients, category) {
    const { harmful, harmless } = ingredientDatabase[category];
    const harmfulLower = harmful.map(i => i.toLowerCase());
    const harmlessLower = harmless.map(i => i.toLowerCase());
    
    const foundHarmful = [];
    const foundHarmless = [];

    ingredients.forEach(ingredient => {
        const ingLower = ingredient.toLowerCase();
        const isHarmful = harmfulLower.some(h => 
            ingLower === h || ingLower.includes(h)
        );
        const isHarmless = harmlessLower.some(h => 
            ingLower === h || ingLower.includes(h)
        );

        if (isHarmful && !isHarmless) foundHarmful.push(ingredient);
        else if (isHarmless && !isHarmful) foundHarmless.push(ingredient);
        else if (!isHarmful && !isHarmless) foundHarmful.push(`[Check] ${ingredient}`);
    });

    displayResults(foundHarmful, foundHarmless);
}

function displayResults(harmful, harmless) {
    if (!harmful.length && !harmless.length) {
        showErrorState("No recognizable ingredients found.");
        return;
    }
    
    harmlessList.innerHTML = harmless.length 
        ? harmless.map(i => `<li>${i}</li>`).join('') 
        : '<li>No harmless ingredients detected</li>';
    
    harmfulList.innerHTML = harmful.length 
        ? harmful.map(i => `<li>${i}</li>`).join('') 
        : '<li>No harmful ingredients detected</li>';

    const total = harmful.length + harmless.length;
    const toxicityPercent = total ? Math.round((harmful.length / total) * 100) : 0;
    
    if (toxicityPercent === 0) {
        toxicityMessage.innerHTML = "This product contains no harmful ingredients. <span style='color:#2e7d32'>It's safe!</span>";
    } else {
        toxicityMessage.innerHTML = `This product contains <span style='color:${
            toxicityPercent < 30 ? '#e65100' : toxicityPercent < 70 ? '#d84315' : '#c62828'
        }'>${toxicityPercent}% harmful ingredients</span>`;
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
// Add this at the bottom of your existing scanner.js file

// Harmful Ingredients Info Box functionality
const harmfulInfoTrigger = document.getElementById('harmfulInfoTrigger');
const harmfulInfoBox = document.getElementById('harmfulInfoBox');
const closeInfoBox = document.querySelector('.close-info-box');

// Show info box on click (works for both desktop and mobile)
harmfulInfoTrigger.addEventListener('click', function() {
    harmfulInfoBox.style.display = 'block';
});

// Close info box when X is clicked
closeInfoBox.addEventListener('click', function() {
    harmfulInfoBox.style.display = 'none';
});

// Close info box when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target === harmfulInfoBox) {
        harmfulInfoBox.style.display = 'none';
    }
});