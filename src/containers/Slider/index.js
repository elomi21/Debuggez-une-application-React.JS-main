import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    );
  };

  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div key={event.title} className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((_, radioIdx) => (
            <input
              key={radioIdx.id}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;

/* Modif du nom sur le fichier de l'image supp de l'espace avant le 1 idem sur le events.json
/* Problème d'affichage des mois résolus grace à modif du fichier index.js de Date dans helpers */
/* Problème réglé pour la slide en trop: Il nous faut 3 slides et non 4.Il y a une erreur dans le code de la fonction nextCard, il faut enlever 1 à byDateDesc.length.
/* modif du code pour retirer <div className="SlideCard__paginationContainer"> de la boucle qui génére les slides car on avait à chaque boucle une slide + un container pagination avec 3 radios */
/* supression des balises de frangments car un fragment doit contenir au moins 2 enfants */
/* Erreur sur la fonction qui permet l'affichage des radio, manque "?" avant la méthode .map pour savoir si byDateDesc est bien définit + erreur sur la key et checked car reprend des valeurs accéssibles uniquement dans la fonction précédente */
