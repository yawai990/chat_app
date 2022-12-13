import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Chat = () => {
  const [ chatMessages , setChatMessages ] = useState([]);
  const [ messages , setMessages ] = useState([]);

 useEffect(()=>{
  if(messages.length > 0 && messages[0].length > 0){
    setMessages(preMess =>[...preMess, chatMessages])
  }else{
    setMessages([chatMessages])
  };

  setTimeout(() => {
    const chat_feed = document.getElementById('chat_feed');
    
    chat_feed.style.maxHeight = '280px';
    chat_feed.style.overflowY = 'scroll';
    chat_feed.scrollTop = chat_feed.scrollHeight
  }, 120);

  return () => null; 
  }, [chatMessages]);

  const handleSendMessage = e => {
    e.preventDefault();

    const socket = io();

    if(e.keyCode && e.keyCode !== 13) return
    
    const chat_msg = document.getElementById('chat_msg');
    const mess = chat_msg.value.trim();

    if(mess === '' || mess === null || mess === false || !mess){
      return;
    }
    //to do : backend connected here
    //to do : emit message
    socket.emit('admin_message',{ user : 'admin', message : mess})
      setChatMessages([ { user : '', message : mess}]);
    chat_msg.value ='';
  }

  return (
    <section className='w-screen h-screen flex justify-center items-center'>
      <div className='bg-white drop-shadow-lg rounded-lg overflow-hidden'>
        <div className='chat-feed'>
              <div className='h-10 bg-[#4B56D2] p-2 flex justify-start items-center text-white'>
                <h5 className=''>Thomas Jhon</h5>
              </div>
              <div id='chat_feed' className='p-2'>
                {
                  messages?.map((data,ind) => (
                    
                    data?.map(list => (

                      list.user === 'admin' ? <div className="flex justify-end my-2" key={ind}>
                        <p style={{ textAlign:'justify'}} className=' max-w-[220px] bg-[#472183] rounded-full p-2 px-4 text-white'>{list.message}</p>
                    </div>
                      :  <div className="flex justify-start" key={ind}>
               
                      <p className='bg-[#344D67] rounded-full p-2 px-4 text-white m-2'>{list.message}</p>
                    </div>
                    ))
                  ))
                }
                
              </div>
        </div>
        
      <form action="" className='w-80' onSubmit={handleSendMessage} >
        <div className='border flex'>

        <div className='flex-1'>
            <input type="text" 
            name='chat_message_input'
            id = 'chat_msg'
            onKeyUp={handleSendMessage}
            className='w-full h-full outline-none px-2 focus:border focus:border-blue-500' 
            placeholder='Send Message....' />
        </div>  
        <button className='px-2 py-1 bg-blue-700 text-white tracking-wide rounded hover:bg-blue-900'>Send</button>
        </div>
      </form>
      </div>
    </section>
  )
}

export default Chat