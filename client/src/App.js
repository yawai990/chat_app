import { useEffect} from 'react';
import io from 'socket.io-client';
import Chat from './components/Chat';

const App = () => {
    
    useEffect(()=>{
        const socket = io('http://localhost:5000/');
        socket.on('connection', () => {
                
            
            });
        return ()=>{
            socket.emit('disconect');
      
            socket.off()
          }
    },[])
  return (
   <Chat />
  )
}

export default App