import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/components/layout/App.jsx';
import {AuthProvider} from './pages/components/Avatardropdown/auth-context.jsx'
import { RecoilRoot } from 'recoil';




ReactDOM.createRoot(document.getElementById('root')).render(
    <RecoilRoot>

 <AuthProvider>

 <App/>

   
  
    
 
</AuthProvider>
    </RecoilRoot>

 
 
);
