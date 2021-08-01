import React from 'react'
import CurrentUserContext from '../contexts/CurrentUserContext'
//контекст в Card
function Card({ cardId, name, link, likes, ownerId, onCardClick, onCardLike, onCardDelete, onRemovePlace }) {
  const currentUser = React.useContext(CurrentUserContext)
  const isOwn = ownerId === currentUser._id
  //лайк пользователя на карточке
  //поставили ли мы уже «лайк» этой карточке
  const isLiked = likes.some((like) => like._id === currentUser._id)

  function handleClick() {
    onCardClick({ name, link })
  }
  function handleLikeClick() {
    onCardLike({ likes, cardId })
  }
  function handleDeleteClick() {
    onRemovePlace({ cardId })
    //onCardDelete({ cardId })
  }
  return (
    <li className="element">
      {isOwn && ( //должна ли в текущей карточке показываться иконка удаления
        <button type="button" onClick={handleDeleteClick} className="element__delete"></button>
      )}
      <img src={link} alt={name} className="element__image" onClick={handleClick} />
      <div className="element__group">
        <h2 className="element__title">{name}</h2>
        <div>
          <button
            type="button"
            onClick={handleLikeClick}
            className={isLiked ? 'element__like element__like_active' : 'element__like'}></button>
          <span className="element__like-count">{likes.length ? likes.length : ''}</span>
        </div>
      </div>
    </li>
  )
}

export default Card
