// src/utils/imageUtils.js

// Use import.meta.glob to dynamically import images
const images = import.meta.glob('../assets/products/*.{jpg,jpeg,png,gif}', { eager: true });

const imageArray = Object.keys(images).map(key => images[key].default);

export const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * imageArray.length);
  return imageArray[randomIndex];
};
