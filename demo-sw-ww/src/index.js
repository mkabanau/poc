const worker = new Worker(new URL('./worker.js', import.meta.url));
const broadcast = new BroadcastChannel('channel-123');
broadcast.postMessage({ type: 'MSG_ID', msg: "tab"});
broadcast.onmessage = (event) => {
  if (event.data && event.data.type === 'MSG_ID') {
      console.log(event.data.msg)
  }
};
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        '/sw.js',
        {
          scope: '/',
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

registerServiceWorker()

const element = document.createElement("div")
document.body.appendChild(element)
const input = document.createElement("input")
input.type = "text"
document.body.appendChild(input)
const btn = document.createElement("button")
btn.innerHTML = "send"
btn.onclick = ()=>{
  worker.postMessage({
    question:
      input.value,
  });
}
document.body.appendChild(btn)

worker.onmessage = ({ data: { answer } }) => {
  element.innerHTML = answer
};




let userAgent = navigator.userAgent;
let browserName;

if(userAgent.match(/chrome|chromium|crios/i)){
    browserName = "chrome";
  }else if(userAgent.match(/firefox|fxios/i)){
    browserName = "firefox";
  }  else if(userAgent.match(/safari/i)){
    browserName = "safari";
  }else if(userAgent.match(/opr\//i)){
    browserName = "opera";
  } else if(userAgent.match(/edg/i)){
    browserName = "edge";
  }else{
    browserName="No browser detection";
  }

console.log("\n test", browserName)
