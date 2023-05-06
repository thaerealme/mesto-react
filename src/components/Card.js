function Card (props) {
  function handleClick() {
    props.onCardClick(props.card);
  }
  return (
    <article className="elements__item" onClick={handleClick}>
      <button type="button" className="elements__button-delete opacity"></button>
      <img className="elements__image" src={props.card.link} alt={props.card.name}/>
      <div className="elements__footer">
        <h2 className="elements__title">{props.card.name}</h2>
        <div className="elements__like">
          <button type="button" className="elements__button-heart"></button>
          <p className="elements__like-count">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;
