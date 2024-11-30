import { useEffect, useState } from "react";
import "./Display.css";
import AddUpdateData from "./AddUpdateData";

function DisplayData() {
  let [ShowData, SetShowData] = useState([]);
  let [EditData, SetEditData] = useState("");
  let [id, setId] = useState();

  function Showdata() {
    fetch("http://localhost:3000/products")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        SetShowData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    Showdata();
  }, []);

  const handelDelete = (id) => {
    fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  const handelEdit = (id, price) => {
    setId(id);
    SetEditData(price);
  };
  const updatePriceData = (id) => {
    fetch(`http://localhost:3000/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: EditData }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <AddUpdateData />
      <div className="input-Container">
        <input
          type="text"
          id="editdata"
          placeholder="Update-Price"
          value={EditData}
          onChange={(e) => {
            SetEditData(e.target.value);
          }}
        />
        <button
          className="btn-Update"
          onClick={() => {
            updatePriceData(id);
          }}
        >
          Update
        </button>
      </div>
      <h1 className="Heading-data">Product Data</h1>
      <div className="Container">
        {ShowData.map((Details) => (
          <div className="Main-Container" key={Details.id}>
            <div className="image-box">
              <img
                style={{ width: "100%", height: "100%" }}
                src={Details.image}
                alt=""
              />
            </div>
            <div className="Container-title">
              <h3 className="Container-title1">
                {Details.title}
                <span>({Details.category})</span>
              </h3>
              <h2 className="Container-Price">{Details.price}$</h2>
              <p className="Container-Description">{Details.description}</p>
            </div>
            <div className="btn-group">
              <button
                className="btn-Edit"
                onClick={() => {
                  handelEdit(Details.id, Details.price);
                }}
              >
                Edit
              </button>
              <button
                className="btn-Delete"
                onClick={() => {
                  handelDelete(Details.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisplayData;
