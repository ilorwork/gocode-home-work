import React, { useState, useEffect, useContext } from "react";
import { useIsFirstRender } from "./custom hooks/useIsFirstRender";
import "./NewProduct.css";
import ShopContext from "../ShopContext";
import Input from "./Input";

const NewProduct = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState({ errorText: null, rootCause: null });
  const [submitClear, setSubmitClear] = useState(false);

  const isFirstRender = useIsFirstRender();

  const { getCategories, setProductsArr } = useContext(ShopContext);

  useEffect(() => {
    // console.log(title);
    if (isFirstRender || submitClear) return;
    if (!title) {
      setError({
        errorText: "Title is a mendatory field.",
        rootCause: "title",
      });
    } else if (title.length > 40) {
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
    } else if (description.length > 100) {
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

  //   useEffect(() => {
  //     console.log(error);
  //   }, [error]);

  const isNumber = (val) => {
    return /^\d+$/.test(val);
  };

  const options = getCategories().map((cat, index) => (
    <option key={index} value={cat}>
      {cat}
    </option>
  ));

  //   const checkTitle = (title) => {
  //     if (isFirstRender) return;
  //     if (!description) {
  //       return "description is a mendatory field";
  //     } else if (title.length > 100) {
  //       return "description is too long";
  //     }
  //   };

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
      console.log("Great job!");
      addNewProduct();

      setTitle("");
      setImage("");
      setPrice("");
      setDescription("");
      setCategory("");

      const timer = setTimeout(() => {
        setError({ errorText: null, rootCause: null });
        setSubmitClear(false);
      }, 1000);
    }
  };

  const addNewProduct = () => {
    // const ids = productsArr.map((p) => p.id);
    // const lastId = Math.max(...ids);
    const newProduct = {
      //   id: lastId + 1,
      id: Date.now(),
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
    setProductsArr((prev) => [newProduct, ...prev]);
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
          Create
        </button>
        <p style={{ color: "red" }}>{error.errorText}</p>
      </div>
    </div>
  );
};

export default NewProduct;
