import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import React from 'react';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState('');
  const [isEditProfilePopupOpen, handleEditProfileClick] = React.useState(false);
  const [isAddPlacePopupOpen, handleAddPlaceClick] = React.useState(false);
  const [isEditAvatarPopupOpen, handleEditAvatarClick] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});

  React.useEffect(() => {
    api.getUserInfo()
    .then(user => {
      setCurrentUser(user);
    })
    .catch(err => console.log(err))
    api.getInitialCards()
    .then (cardsList => setCards(cardsList))
    .catch (err => console.log(err))
  }, [])


  function closeAllPopups() {
      handleEditProfileClick(false);
      handleAddPlaceClick(false);
      handleEditAvatarClick(false);
      setSelectedCard({name: '', link: ''});
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then((newCard) => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })

  }
  function handleUpdateUser (data) {
    api.updateUserInfo(data)
    .then((user) => {
      setCurrentUser(user);
      closeAllPopups();
    })
    .catch(err => console.log(err))
  }

  function handleUpdateAvatar (data) {
    api.updateAvatar(data.avatar)
    .then((user) => {
      setCurrentUser(user);
      closeAllPopups();
    })
    .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit (card) {
    api.addCard(card)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch(err => console.log(err))
  }


  return (
  <CurrentUserContext.Provider value={currentUser}>
    <Header />
    <Main cards={cards}
      setCards={setCards}
      onCardClick={setSelectedCard}
      onEditProfile={handleEditProfileClick}
      onAddPlace={handleAddPlaceClick}
      onEditAvatar={handleEditAvatarClick}
      onCardLike={handleCardLike}
      onCardDelete={handleCardDelete}
    />
    <Footer />
    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      onClose={closeAllPopups}
      buttonText="Да"
      children=''
    />
    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
    <ImagePopup
      card={selectedCard}
      onClose={closeAllPopups}
    />
  </CurrentUserContext.Provider>
  );
}

export default App;
