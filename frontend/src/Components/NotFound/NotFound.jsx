import React from 'react';
import './NotFound.css';
import notFoundVideo from '../Assets/notfound-video.mp4';

const NotFound = () => {
    return (
        <div className='Katakata'>
             <video 
                src={notFoundVideo} 
                autoPlay 
                loop 
                muted 
                className="notfound-video"
            />
            <h4>Page Not Found</h4>
            <p>The page you are looking for does not exist.</p>
        </div>
    );
};

export default NotFound;
