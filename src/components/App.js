import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import React from 'react';

function App() {
  const [isEditProfilePopupOpen, handleEditProfileClick] = React.useState(false);
  const [isAddPlacePopupOpen, handleAddPlaceClick] = React.useState(false);
  const [isEditAvatarPopupOpen, handleEditAvatarClick] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  function closeAllPopups() {
      handleEditProfileClick(false);
      handleAddPlaceClick(false);
      handleEditAvatarClick(false);
      setSelectedCard({name: '', link: ''});
  }
  return (
  <>
    <Header />
    <Main onCardClick={setSelectedCard} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} />
    <Footer />
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      onClose={closeAllPopups}
      buttonText= 'Сохранить'
      isOpen={isEditProfilePopupOpen}
      children={<>
        <input type="text" name="name" id="name" placeholder="Имя" className="popup__input" minLength="2" maxLength="40"
          required />
        <span className="popup__input-error name-error"></span>
        <input type="text" name="description" placeholder="Род деятельности" id="description" className="popup__input"
          minLength="2" maxLength="200" required />
        <span className="popup__input-error description-error"></span>
      </> }
    />
    <PopupWithForm
      name="add"
      title="Новое место"
      onClose={closeAllPopups}
      buttonText="Создать"
      isOpen={isAddPlacePopupOpen}
      children={<>
        <input type="text" name="name" id="title" placeholder="Название" className="popup__input" minLength="2"
          maxLength="30" required />
        <span className="popup__input-error title-error"></span>
        <input type="url" name="link" id="link" placeholder="Ссылка на картинку" className="popup__input" required />
        <span className="popup__input-error link-error"></span>
      </>}
    />
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      onClose={closeAllPopups}
      buttonText="Да"
      children=''
    />
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      onClose={closeAllPopups}
      buttonText="Сохранить"
      isOpen={isEditAvatarPopupOpen}
      children={<>
        <input type="url" name="avatar" id="avatar" placeholder="Ссылка на картинку" className="popup__input" required />
        <span className="popup__input-error avatar-error"></span>
      </>}
    />
    <ImagePopup
      card={selectedCard}
      onClose={closeAllPopups}
    />
  </>
  );
}

export default App;
