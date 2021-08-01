import React from 'react'

import CurrentUserContext from '../contexts/CurrentUserContext'

import Card from './Card'
//в Main они должны передаваться в виде пропсов cards, onCardLike и onCardDelete
function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onRemovePlace,
  onCardClick,
  onCardLike,
  //onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main className="page">
      <section className="profile">
        <button
          type="button"
          className="profile__avatar-edit"
          onClick={onEditAvatar}
          style={{ backgroundImage: `url(${currentUser.avatar})` }}></button>
        <div className="profile__info">
          <div className="profile__info-edit">
            <h1 className="profile__info-name">{currentUser.name}</h1>
            <button className="profile__button-edit" type="button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__characteristic">{currentUser.about}</p>
        </div>
        <button className="profile__button-add" type="button" onClick={onAddPlace}></button>
      </section>

      <section className="elements">
        <ul className="elements__places">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                cardId={card._id}
                name={card.name}
                link={card.link}
                likes={card.likes}
                ownerId={card.owner._id}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                //onCardDelete={onCardDelete}
                onRemovePlace={onRemovePlace}
              />
            )
          })}
        </ul>
      </section>
    </main>
  )
}

export default Main
