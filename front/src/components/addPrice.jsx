import React from "react";

const AddPrice = () => {
  const fetchData = async (data) => {
    try {
      const res = await fetch("reservations/add-price", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      await res.json().then((data) => {
        console.log(data);
      });
    } catch (e) {
      console.log(e);
    }
  };
  const handleAddPrice = (e) => {
    e.preventDefault();
    const data = {
      pricetitle: e.target.pricetitle.value,
      priceprice: e.target.priceprice.value,
    };
    fetchData(data);
    e.target.pricetitle.value = "";
    e.target.priceprice.value = "";
  };
  return (
    <div>
      <h1>Add Price</h1>
      <div>
        <form onSubmit={handleAddPrice}>
          <div>
            <label htmlFor="pricetitle">Title</label>
            <input type="text" id="n1" name="pricetitle" required />
          </div>
          <div>
            <label htmlFor="priceprice">Price</label>
            <input type="number" id="n2" name="priceprice" required />
          </div>

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default AddPrice;
