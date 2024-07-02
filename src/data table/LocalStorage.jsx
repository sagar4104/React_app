import React, { useEffect, useState } from "react";

function LocalStorage() {
  const [items, setItems] = useState(() => {
    const storedData = localStorage.getItem("AData");
    return storedData ? JSON.parse(storedData) : [];
  });

  const [obj, setObj] = useState({
    name: "",
    password: "",
  });

  const [edit, setEdit] = useState(null);

  const addData = (e) => {
    const { name, value } = e.target;
    setObj({ ...obj, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.name === "") {
      alert("Please enter a name");
    } else if (obj.name.length < 2) {
      alert("Please enter more than 2 characters");
    } else if (obj.password === "") {
      alert("Please enter a password");
    } else if (obj.password.length < 8) {
      alert("Please enter more than 8 characters");
    } else {
      if (edit !== null) {
        // Update existing item
        const updatedItems = [...items];
        updatedItems[edit] = obj;
        setItems(updatedItems);
      } else {
        // Add new item
        setItems([...items, obj]);
      }
      setObj({ name: "", password: "" }); // Reset form inputs
      setEdit(null);
    }
  };

  useEffect(() => {
    localStorage.setItem("AData", JSON.stringify(items));
  }, [items]);

  const handleDelete = (index) => {
    const updatedData = [...items];
    updatedData.splice(index, 1);
    setItems(updatedData);
  };

  const handleEdit = (index) => {
    setEdit(index);
    setObj(items[index]); 
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          value={obj.name}
          onChange={addData}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          value={obj.password}
          onChange={addData}
        />
        <br />
        <br />
        <button type="submit">{edit === null ? "Add Data" : "Update"}</button>
        <br />
        <br />
      </form>

      <table border={2} cellSpacing={6}>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Name</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.password}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default LocalStorage;