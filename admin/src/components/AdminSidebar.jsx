import { useState } from "react";
import { useEffect } from "react";
import s from "./AdminSidebar.module.css";

export const AdminSidebar = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await fetch("/admin");
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <aside className={s.general}>
      <div>List of models:</div>
      {data.map((item) => (
        <span key={"someshit" + item.title}>{item.title}</span>
      ))}
    </aside>
  );
};
