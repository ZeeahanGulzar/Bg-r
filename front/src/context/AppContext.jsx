import { useState, createContext } from "react";
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [credit, setCredit] = useState(false);
  const[image,setImage] = useState(false);
  const[resultImage,setrResultImage] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { getToken } = useAuth();
  const {isSignedIn} = useUser();
  const {openSignIn} = useClerk();
  const navigate = useNavigate();

  const loadCreditsData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(
        backendUrl + "/api/user/credits",
        { headers: { token } }
      );
      if (data.success) {
        setCredit(data.credits);
        console.log(data.credits);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeBg = async (image) => {

    try {

      if (!isSignedIn) {
        return openSignIn();
      }

      setImage(image);
      setrResultImage(false);
      navigate("/result");

      const token = await getToken()

      const formData = new FormData()
      image && formData.append("image", image)

      const {data} = await axios.post(backendUrl+"/api/image/remove-bg", formData,{headers:{token}})

      if (data.success) {

        setrResultImage(data.resultImage)
        data.credit && setCredit(data.credit)

      } else {
        toast.error(data.message)
        data.credit && setCredit(data.credit)

        if (data.credit === 0) {
          navigate("/buy")
        }
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    
  }

  return (
    <AppContext.Provider
      value={{
        credit,
        setCredit,
        loadCreditsData,
        backendUrl,
        image,
        setImage,
        removeBg,
        resultImage,
        setrResultImage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};