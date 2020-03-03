import React from 'react';
import Core from "./module/core/core";
import OrderSubscriber from "./manager/subscriber";

function App() {
    return (
          <div>
              <Core/>
              <OrderSubscriber/>
          </div>
    );
}

export default App;
