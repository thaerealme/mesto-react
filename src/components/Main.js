import React from 'react';
import Card from './Card.js';
import {api} from '../utils/Api.js';

function Main (props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
    .then (res => {
      setUserName(res.name)
      setUserDescription(res.about)
      setUserAvatar(res.avatar)
    })
    .catch (err => console.log(err))
    api.getInitialCards()
    .then (cardsList => setCards(cardsList))
    .catch (err => console.log(err))
  }, [])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" onClick={props.onEditAvatar}>
          <img alt="Аватар" className="profile__image" src={userAvatar}/>
          <a className="profile__overlay"></a>
        </div>
        <div className="profile__info">
          <div className="profile__about">
          <h1 className="profile__name">{userName}</h1>
          <button type="button" className="profile__button profile__button_type_edit opacity"
            aria-label="Редактировать" onClick={props.onEditProfile}></button>
        </div>
            <p className="profile__description">{userDescription}</p>
        </div>
        <button type="button" className="profile__button profile__button_type_add opacity" aria-label="Добавить" onClick={props.onAddPlace}></button>
        </section>
        <section className="elements">
          {cards.map((card) => (
            <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
              />
          ))}
        </section>
    </main>
  )
}

export default Main;
