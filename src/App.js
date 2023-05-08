import React from 'react'
import './App.css';
import { Page } from 'govuk-react';
import TopNav from '@govuk-react/top-nav';
import Menu from './Components/Menu';
import Book from './Components/Book';
import View from './Components/View';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {
    return (
        <Page

            header={< TopNav company={<TopNav.Anchor href="https://gov.uk/" target="new">
                <TopNav.IconTitle>NETCOMPANY
                </TopNav.IconTitle>
            </TopNav.Anchor>} />
            }>


            
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Menu />}> </Route>
                    <Route path="/Book" element={<Book />}> </Route>
                    <Route path="/View" element={<View />}> </Route>
                   
                </Routes>
            </BrowserRouter>
            





        </Page>
      
          
      
  );
};

export default App;
