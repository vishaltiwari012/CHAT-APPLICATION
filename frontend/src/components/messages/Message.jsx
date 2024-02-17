import React from 'react'

const Message = () => {
  return (
    <div className='chat chat-end'> 
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src="https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-512.png" alt="user avatar" />
        </div>
      </div>

      <div className={'chat-bubble text-white bg-blue-500'}>Hi! what's up</div>
      <div className={'chat-footer opacity-50 text-xs gap-1 items-center'}>12:42</div>
    </div>
  )
}

export default Message;
