const CategoryList = ({
  setcategorie = null,
  categError = null,
  categorie = "",
}) => {
  return (
    <div>
      <select
        name="categorie"
        id="categorie"
        value={categorie}
        onChange={(e) => {
          if (setcategorie) setcategorie(e.target.value);
        }}
        className="w-full border h-16 lg:h-12 rounded-2xl hover:border-foreground focus:border-none transition-all px-3"
      >
        <option value="">Sélectionner une catégorie</option>
        <option value="Mobilier et Rangement">Mobilier et Rangement</option>
        <option value="Décoration Murale et So">Décoration Murale et So</option>
        <option value="Éclairage et Luminaires">Éclairage et Luminaires</option>
        <option value="Plantes et Végétation">Plantes et Végétation</option>
        <option value="Textiles et Accessoires">Textiles et Accessoires</option>
        <option value="Cuisine et Salle à Manger">
          Cuisine et Salle à Manger
        </option>
        <option value="Décoration Extérieure et Saisonnière">
          Décoration Extérieure et Saisonnière
        </option>
        <option value="Essentiels pour Espace de Travail">
          Essentiels pour Espace de Travail
        </option>
      </select>
      {categError && <p className="text-red-500 mt-2">{categError}</p>}
    </div>
  );
};

export default CategoryList;
