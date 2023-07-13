import { useEffect, useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "./Add";
import Edit from "./Edit";
import "./style.css";

const Categories = ({ categories, setCategories, setFiltered, products }) => {
  const [isAddModalOpen, setisAddModalOpen] = useState(false);
  const [isEditModalOpen, setisEditModalOpen] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("Tümü");

  useEffect(() => {
    if (categoryTitle === "Tümü") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((item) => item.category === categoryTitle));
    }
  }, [products, setFiltered, categoryTitle]);

  return (
    <ul className="flex gap-4 text-lg md:flex-col">
      {categories
        .map((item) => (
          <li
            className={`category-item ${
              item.title === categoryTitle && "!bg-pink-700"
            }`}
            key={item._id}
            onClick={() => setCategoryTitle(item.title)}
          >
            <span>{item.title}</span>
          </li>
        ))
        .reverse()}

      <li
        className="category-item !bg-purple-800 hover:opacity-90"
        onClick={() => setisAddModalOpen(true)}
      >
        <PlusOutlined className="md:text-2xl" />
      </li>
      <li
        className="category-item !bg-orange-800 hover:opacity-90 md:mb-28"
        onClick={() => setisEditModalOpen(true)}
      >
        <EditOutlined className="md:text-2xl" />
      </li>
      <Add
        isAddModalOpen={isAddModalOpen}
        setisAddModalOpen={setisAddModalOpen}
        categories={categories}
        setCategories={setCategories}
      />
      <Edit
        isEditModalOpen={isEditModalOpen}
        setisEditModalOpen={setisEditModalOpen}
        categories={categories}
        setCategories={setCategories}
      />
    </ul>
  );
};

export default Categories;
