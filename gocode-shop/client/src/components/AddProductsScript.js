import config from "../config.json";

const AddProductsScript = () => {
  const arr = [
    "https://ae01.alicdn.com/kf/H763bf83a6e374be387a1ea6acb90e3b0B/8-5-Inch-Electronic-Drawing-Board-LCD-Screen-Writing-Tablet-Digital-Graphic-Drawing-Tablets-Electronic-Handwriting.jpg_220x220xz.jpg_.webp",
    "https://ae01.alicdn.com/kf/Saa84ebe31f994048806941dccae7f3b5H/10PCS-lot-SS49E-OH49E-A3144E-SS40AF-SS41F-SS495A-US1881-UGN3503-OH137-ATS276-Hall-element-Hall-sensor.png_220x220xz.png_.webp",
    "https://ae01.alicdn.com/kf/H66b62dd698db4d23b857b013dce48d03i/5PCS-H15R1202-H15R1203-H20R1202-H20R1203-H20R1353-H25R1202-H25R1203-H30R1203-H30R1353-H30R1602-FGA15N120-FGA25N120-Power-Tube.png_220x220xz.png_.webp",
    "https://ae01.alicdn.com/kf/Sb6bfac9d2c7645b49a0b63ebaf99470cK/For-Lightning-to-3-5mm-Jack-Audio-Cable-Car-AUX-For-iPhone-7-8-X-XR.jpg_220x220xz.jpg_.webp",
    "https://ae01.alicdn.com/kf/S4ac835571dd74536b4266f13aee075344/Men-Sport-Watch-Multifunction-Military-Sports-Watch-Waterproof-Luminous-LED-Digital-Kids-Watch-Big-Dial-Student.jpg_220x220xz.jpg_.webp",
  ];
  const category = "electronics";

  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const addProduct = async (product) => {
    await fetch(`${config.BaseUrl}/api/products/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
  };

  arr.map((img) => {
    const splited = img.split("/");
    const text = splited[splited.length - 1].split(".");
    console.log("getRandomArbitrary", getRandomArbitrary(10, 500));
    const clrText = text[0].replaceAll("-", " ");

    const newProduct = {
      title: clrText,
      price: getRandomArbitrary(10, 500),
      description: clrText,
      category: category,
      image: img,
      rating: {
        rate: getRandomArbitrary(0, 5),
        count: getRandomArbitrary(10, 5000),
      },
    };

    addProduct(newProduct);
  });
};

export default AddProductsScript;
