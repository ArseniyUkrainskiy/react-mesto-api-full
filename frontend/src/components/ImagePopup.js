import React from 'react'

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_image ${card && 'popup_opened'}`}>
      <div className="popup__image-container">
        <button type="button" className="popup__close" onClick={onClose}></button>
        <img src={card?.link} alt={card?.name} className="popup__image" />
        <p className="popup__title-img">{card ? card.name : ''}</p>
      </div>
    </div>
  )
}

export default ImagePopup
