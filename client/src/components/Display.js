import { useState } from "react";
import "./Display.css";

const Display = ({ contract, account, onImageClick }) => {
  const [data, setData] = useState([]);
  const [otherAddress, setOtherAddress] = useState("");

  const getData = async () => {
    let dataArray;

    try {
      dataArray = otherAddress ? await contract.display(otherAddress) : await contract.display(account);
      console.log("Fetched data array:", dataArray);
    } catch (e) {
      alert("You don't have access or an error occurred.");
      console.error("Error fetching data:", e);
      return;
    }

    if (dataArray.length === 0) {
      alert("No images to display.");
      setData([]);
      return;
    }

    const images = dataArray.map((item, i) => (
      <div className="image-card" key={i}>
        <a
          href={item}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => handleImageClick(e, i, dataArray)}
        >
          <img
            src={item}
            alt={`Uploaded content ${i}`}
            className="image-list-item"
          />
          <div className="overlay">
            <span className="overlay-text">Uploaded Content {i + 1}</span>
          </div>
        </a>
      </div>
    ));

    setData(images);
  };

  const handleImageClick = (e, index, dataArray) => {
    e.preventDefault();
    const selectedImage = dataArray[index];
    console.log("Clicked on Uploaded content", index + 1);
    console.log("Data for clicked content:", selectedImage);
    localStorage.setItem("selectedImage", selectedImage);
    onImageClick(); 
  };

  return (
    <div className="display-container">
      <input
        type="text"
        placeholder="Enter Address"
        className="address-input"
        value={otherAddress}
        onChange={(e) => setOtherAddress(e.target.value)}
      />
      <button className="fetch-btn" onClick={getData}>
        Get Data
      </button>
      <div className="image-grid">{data}</div>
    </div>
  );
};

export default Display;
