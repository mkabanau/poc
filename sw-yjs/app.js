const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        '/sw-yjs/sw.js',
        {
          scope: '/sw-yjs/',
        }
      );
      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed');
      } else if (registration.active) {
        console.log('Service worker active');
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

const imgSection = document.querySelector('section');

const getImageBlob = async (url) => {
  const imageResponse = await fetch(url);
  if (!imageResponse.ok) {
    throw new Error(
      `Image didn't load successfully; error code: ${
        imageResponse.statusText || imageResponse.status
      }`
    );
  }
  return imageResponse.blob();
};

const createGalleryFigure = async (galleryImage) => {
  try {
    const imageBlob = await getImageBlob(galleryImage.url);
    const myImage = document.createElement('img');
    const myCaption = document.createElement('caption');
    const myFigure = document.createElement('figure');
    myCaption.textContent = `${galleryImage.name}: Taken by ${galleryImage.credit}`;
    myImage.src = window.URL.createObjectURL(imageBlob);
    myImage.setAttribute('alt', galleryImage.alt);
    myFigure.append(myImage, myCaption);
    imgSection.append(myFigure);
  } catch (error) {
    console.error(error);
  }
};

registerServiceWorker();

const tests = [
{
  "actions":"add",
  "value": 1,
  "wait": 5
},
{
  "actions":"query",
  "value":"test",
  "wait":5
}
]

const sendMessage = async (test)=>{
  const response = await fetch(`${test.actions}`);
  console.log(JSON.stringify(response))
  //const response = await fetch(`${test.actions}?value=${test.value}`);
  return response
}
// Gallery.images.map(createGalleryFigure);
const execute = async (test) =>{
  try {
    const newDiv = document.createElement(test.actions);
    const response = await sendMessage(test)
    // and give it some content
    const newContent = document.createTextNode(response);
    newDiv.appendChild(newContent);
    newDiv.appendChild(document.createElement("br"));
    imgSection.append(newDiv)
    imgSection.append()
  }catch(error){
    console.log(error)
  }
}

tests.map(execute);

