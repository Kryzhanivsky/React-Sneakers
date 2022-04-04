import Header from './Components/Header/Header';
import SideBar from './Components/SideBar/SideBar';
import { useEffect, useState } from 'react';
import Card from './Components/Card/Card';
import axios from 'axios';

import './App.css';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [likedItems, setLikedItems] = useState([]);

  console.log(`Изменился ${likedItems.length}`);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        'https://6249739420197bb4627307c2.mockapi.io/Items'
      );
      setItems(data);
      console.log('Запрос');
    })();
  }, []);

  const handleOpenSidebar = () => {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    setIsCartOpen(true);
  };

  const handleCloseSidebar = () => {
    document.getElementsByTagName('body')[0].style.overflow = 'scroll';
    setIsCartOpen(false);
  };

  const handleAddLikedItem = (item) => {
    setLikedItems(likedItems.concat(item));
  };

  const handleDeleteLikedItem = (item) => {
    const arr = likedItems;
    const index = likedItems.indexOf(item);
    arr.splice(index, 1);

    setLikedItems(arr);
    console.log(likedItems);
  };

  return (
    <div className="wrapper">
      {isCartOpen && (
        <SideBar
          likedItems={likedItems}
          onCloseCart={handleCloseSidebar}
          onDeleteLike={handleDeleteLikedItem}
        />
      )}
      <Header onOpenCart={() => handleOpenSidebar()} />
      <section className="body">
        <div className="body__slider" />

        <div className="body__content">
          <div className="body__heading">
            <h1>Все кроссовки</h1>
            <div className="body__input">
              <label htmlFor="input">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.25 15.25L11.8855 11.8795L15.25 15.25ZM13.75 7.375C13.75 9.06576 13.0784 10.6873 11.8828 11.8828C10.6873 13.0784 9.06576 13.75 7.375 13.75C5.68424 13.75 4.06274 13.0784 2.86719 11.8828C1.67165 10.6873 1 9.06576 1 7.375C1 5.68424 1.67165 4.06274 2.86719 2.86719C4.06274 1.67165 5.68424 1 7.375 1C9.06576 1 10.6873 1.67165 11.8828 2.86719C13.0784 4.06274 13.75 5.68424 13.75 7.375V7.375Z"
                    stroke="#E4E4E4"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </label>
              <input id="input" type="text" placeholder="Поиск..." />
            </div>
          </div>

          <div className="body__cards">
            {items.map((item, index) => (
              <Card key={index} onAddLike={handleAddLikedItem} item={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
