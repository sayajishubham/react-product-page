import { useState } from "react";
import "./style.css";

function AddUpdateData() {
  const initialData = {
    image: "",
    title: "",
    price: "",
    category: "",
    description: "",
  };
  let [Data, setData] = useState(initialData);

  function handalsubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  return (
    <div>
      <form onSubmit={handalsubmit} className="Input-Container">
        <input
          type="text"
          placeholder="Enter a Image URL"
          name="image"
          id="Image-Url"
          value={Data.image}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter a Title"
          name="title"
          id="Image-Url"
          value={Data.title}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter a Price"
          name="price"
          id="Image-Url"
          value={Data.price}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter a category"
          name="category"
          id="Image-Url"
          value={Data.category}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter a description"
          name="description"
          id="Image-Url"
          value={Data.description}
          onChange={handleChange}
        />
        <button type="submit " className="btn-submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddUpdateData;
