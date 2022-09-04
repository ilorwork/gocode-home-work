import React, { useState, useEffect, useContext } from "react";
import { useIsFirstRender } from "./custom hooks/useIsFirstRender";
import "./NewProduct.css";
import ShopContext from "../ShopContext";
import Input from "./Input";
import { useParams } from "react-router-dom";

const NewProduct = ({ products }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState({ errorText: null, rootCause: null });
  const [submitClear, setSubmitClear] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { id } = useParams();
  const isFirstRender = useIsFirstRender();

  const { getCategories, setProductsArr } = useContext(ShopContext);
  let productToEdit;
  useEffect(() => {
    if (!products) return;

    productToEdit = products.filter((p) => p._id === id);

    if (productToEdit.length) {
      setTitle(productToEdit[0].title);
      setImage(productToEdit[0].image);
      setPrice(productToEdit[0].price);
      setDescription(productToEdit[0].description);
      setCategory(productToEdit[0].category);

      setIsEdit(true);
    }
  }, []);

  useEffect(() => {
    if (isFirstRender || submitClear) return;
    if (!title) {
      setError({
        errorText: "Title is a mendatory field.",
        rootCause: "title",
      });
    } else if (title.length > 80) {
      setError({
        errorText: "Title is too long.",
        rootCause: "title",
      });
    } else {
      if (error.rootCause === "title") {
        setError({ errorText: null, rootCause: null });
      }
    }
  }, [title]);

  useEffect(() => {
    if (isFirstRender || submitClear) return;
    if (!image) {
      setError({
        errorText: "Image is a mendatory field.",
        rootCause: "image",
      });
    } else {
      if (error.rootCause === "image") {
        setError({ errorText: null, rootCause: null });
      }
    }
  }, [image]);

  useEffect(() => {
    if (isFirstRender || submitClear) return;
    if (!price) {
      setError({
        errorText: "Price is a mendatory field.",
        rootCause: "price",
      });
    } else if (!isNumber(price)) {
      setError({
        errorText: "Price must contains numbers only.",
        rootCause: "price",
      });
    } else if (isNumber(price)) {
      if (price > 999999) {
        setError({
          errorText: "Price is too high.",
          rootCause: "price",
        });
      } else if (price <= 0) {
        setError({
          errorText: "Price must be bigger than 0.",
          rootCause: "price",
        });
      } else {
        if (error.rootCause === "price") {
          setError({ errorText: null, rootCause: null });
        }
      }
    }
  }, [price]);

  useEffect(() => {
    if (isFirstRender || submitClear) return;

    if (!description) {
      setError({
        errorText: "Description is a mendatory field.",
        rootCause: "description",
      });
    } else if (description.length > 300) {
      setError({
        errorText: "Description is too long.",
        rootCause: "description",
      });
    } else {
      if (error.rootCause === "description") {
        setError({ errorText: null, rootCause: null });
      }
    }
  }, [description]);

  useEffect(() => {
    if (isFirstRender || submitClear) return;
    if (!category) {
      setError({
        errorText: "Category is a mendatory field.",
        rootCause: "category",
      });
    } else {
      if (error.rootCause === "category") {
        setError({ errorText: null, rootCause: null });
      }
    }
  }, [category]);

  const isNumber = (val) => {
    return !isNaN(val);
  };

  const options = getCategories().map((cat, index) => (
    <option key={index} value={cat}>
      {cat}
    </option>
  ));

  const checkForm = () => {
    if (!!error.errorText && error.rootCause !== "submit") {
      return;
    } else if (!title || !image || !price || !description || !category) {
      setError({
        errorText: "One or more mendatory fields are empty.",
        rootCause: "submit",
      });
    } else {
      setSubmitClear(true);

      if (isEdit) {
        editProduct();
      } else {
        addNewProduct();
      }

      setTitle("");
      setImage("");
      setPrice("");
      setDescription("");
      setCategory("");

      //TODO: clr this timeout
      const timer = setTimeout(() => {
        setError({ errorText: null, rootCause: null });
        setSubmitClear(false);
      }, 1000);
    }
  };

  const addNewProduct = async () => {
    const newProduct = {
      title: title,
      price: price,
      description: description,
      category: category,
      image: image,
      rating: {
        rate: 0,
        count: 0,
      },
    };

    const res = await fetch("http://127.0.0.1:8000/api/products/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const responsedProduct = await res.json();

    setProductsArr((prev) => [responsedProduct, ...prev]);
  };

  const editProduct = async () => {
    const indexOfEdited = products.findIndex((p) => p._id === id);

    products[indexOfEdited].title = title;
    products[indexOfEdited].image = image;
    products[indexOfEdited].price = price;
    products[indexOfEdited].description = description;
    products[indexOfEdited].category = category;

    const editedProduct = {
      title: title,
      price: price,
      description: description,
      category: category,
      image: image,
    };

    await fetch(`http://127.0.0.1:8000/api/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedProduct),
    });
  };

  return (
    <div className="page-container">
      <div className="form-container">
        {/* <h1 className="form-header">New Product</h1> */}
        <label className="mendatory">Title</label>
        <input
          value={title}
          placeholder="Enter product title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        {/* <Input
          lableText={"Title"}
          lableClass={"mendatory"}
          placeholder={"Enter product title"}
          onBlurAction={checkTitle}
          //   error={}
        /> */}

        <label className="mendatory">Image</label>
        <input
          value={image}
          placeholder="Enter product image url"
          onChange={(e) => {
            setImage(e.target.value);
          }}
        />
        <label className="mendatory">Price</label>
        <input
          value={price}
          maxLength={6}
          placeholder="Enter product price"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <label className="mendatory">Description</label>
        <input
          value={description}
          placeholder="Enter product description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <label htmlFor="category-select">Choose Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">--Please choose category--</option>
          {options}
        </select>

        <button className="submit-form" type="submit" onClick={checkForm}>
          {isEdit ? "Update" : "Create"}
        </button>
        <p className="error-text">{error.errorText}</p>
      </div>
    </div>
  );
};

export default NewProduct;
