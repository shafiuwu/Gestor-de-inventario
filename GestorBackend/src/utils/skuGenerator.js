const generateSKU = (categoria, nombre, modelo) => {
    
    const cat = categoria.substring(0, 3).toUpperCase();
    const nom = nombre.substring(0, 3).toUpperCase();
    const mod = modelo.substring(0, 3).toUpperCase();
    
    const random = Math.floor(100 + Math.random() * 900);

    return `${cat}-${nom}-${mod}-${random}`;
};

module.exports = generateSKU;