
import PopupContexts from "./Popup";

// eslint-disable-next-line react/prop-types
export const MainContext = ({ children }) => {
  return (

  <PopupContexts>
    {children}
  </PopupContexts>
  )
};
